import { hash, verify } from 'argon2';
import expressAsyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';
import { getUserDto } from '../utils/user.utils.js';

import { generateToken } from './generate-token.js';

export const registerUser = expressAsyncHandler(async (req, res) => {
	const { email, password, name } = req.body;
	const isHaveUser = await prisma.user.findUnique({ where: { email } });
	if (isHaveUser) {
		res.status(400);
		throw Error('User already exists!');
	}
	const user = await prisma.user.create({
		data: { email, password: await hash(password), name }
	});
	const userDto = getUserDto(user);
	const token = generateToken(user.id);

	res.json({ user: userDto, token });
});

export const loginUser = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		res.status(400);
		throw Error('User not found!');
	}
	const isPassEquals = await verify(user.password, password);
	if (!isPassEquals) {
		res.status(400);
		throw Error('Invalid password!');
	}
	const userDto = getUserDto(user);
	const token = generateToken(user.id);

	res.json({ user: userDto, token });
});
