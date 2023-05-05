import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import {
	authRoutes,
	exerciseLogRoutes,
	exerciseRoutes,
	userRoutes,
	workoutLogRoutes,
	workoutRoutes
} from './routes/index.js';

import { prisma } from './db/prisma.js';
import { errorHandler, notFound } from './middlewares/error.js';

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

const exercisesImages = express.static(
	path.join(__dirname, '/public/images/exercises')
);
app.use('/public/images/exercises', exercisesImages);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/exercises/log', exerciseLogRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/workouts/log', workoutLogRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
	try {
		app.listen(PORT, console.log(`Server running on port ${PORT}`));
	} catch (e) {
		console.error(e);
	}
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
