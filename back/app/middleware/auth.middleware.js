import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

export const protect = expressAsyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader.startsWith('Bearer')) {
		res.status(401)
		throw Error('User not authorized!')
	}

	const token = authHeader.split(' ')[1]
	const decoded = jwt.verify(token, process.env.JWT_TOKEN)
	const user = await prisma.user.findUnique({
		where: { id: decoded.userId },
		select: UserFields
	})

	if (!user) {
		res.status(401)
		throw Error('User not authorized!')
	}

	req.user = user
	next()
})
