import expressAsyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';

export const getExercises = expressAsyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	});
	res.json(exercises);
});

export const createExercise = expressAsyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body;
	const exercise = await prisma.exercise.create({
		data: { name, times, iconPath }
	});
	res.json(exercise);
});

export const updateExercise = expressAsyncHandler(async (req, res) => {
	try {
		const { name, times, iconPath } = req.body;
		const id = Number(req.params.id);
		const exercise = await prisma.exercise.update({
			where: { id },
			data: { name, times, iconPath }
		});
		res.json(exercise);
	} catch (e) {
		res.status(404);
		throw Error('Exercise not found!');
	}
});

export const deleteExercise = expressAsyncHandler(async (req, res) => {
	try {
		const id = Number(req.params.id);
		await prisma.exercise.delete({ where: { id } });
		res.json({ message: 'Exercise deleted!' });
	} catch (e) {
		res.status(404);
		throw Error('Exercise not found!');
	}
});
