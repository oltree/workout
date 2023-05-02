import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import authRoutes from './app/auth/auth.routes.js';
import { errorHandler, notFound } from './app/middleware/error.middleware.js';
import { prisma } from './app/prisma.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const start = async () => {
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	app.use(express.json());
	app.use('/api/auth', authRoutes);

	app.use(notFound);
	app.use(errorHandler);

	app.listen(PORT, console.log(`Server running on port ${PORT}`));
};

start()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.log(e);
		await prisma.$disconnect();
		process.exit(1);
	});
