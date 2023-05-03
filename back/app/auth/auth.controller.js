import { hash, verify } from 'argon2'
import expressAsyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

import { generateToken } from './generate-token.js'

export const registerUser = expressAsyncHandler(async (req, res) => {
	const { email, password, name } = req.body
	const userFound = await prisma.user.findUnique({ where: { email } })

	if (userFound) {
		res.status(400)
		throw Error('User already exists!')
	}

	const user = await prisma.user.create({
		data: { email, password: await hash(password), name },
		select: UserFields
	})
	const token = generateToken(user.id)

	res.json({ user, token })
})

export const loginUser = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body
	const user = await prisma.user.findUnique({ where: { email } })

	if (!user) {
		res.status(401)
		throw Error('User not found!')
	}

	const isPassEquals = await verify(user.password, password)

	if (!isPassEquals) {
		res.status(401)
		throw Error('Invalid password!')
	}

	const token = generateToken(user.id)

	res.json({ user, token })
})
