import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { prisma } from '../db/prisma.js';
import { UserFields } from '../utils/userDataWithoutPassword.js';

const getTokenFromHeader = authHeader => {
	if (authHeader && authHeader.startsWith('Bearer')) {
		return authHeader.split(' ')[1];
	}
	return null;
};

export const protect = expressAsyncHandler(async (req, res, next) => {
	const token = getTokenFromHeader(req.headers.authorization);
	if (!token) {
		res.status(401);
		throw new Error('User not authorized!');
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_TOKEN);
		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
			select: UserFields
		});

		if (!user) {
			res.status(401);
			throw new Error('User not authorized!');
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(401);
		throw new Error('Invalid token!');
	}
});
