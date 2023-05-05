import expressAsyncHandler from 'express-async-handler';

import { prisma } from '../../db/prisma.js';
import { calcMinutes } from '../../utils/calc-minutes.js';

export const getWorkouts = expressAsyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			exercises: true
		}
	});
	res.json(workouts);
});

export const getWorkout = expressAsyncHandler(async (req, res) => {
	const id = Number(req.params.id);
	const workout = await prisma.workout.findUnique({
		where: { id },
		include: {
			exercises: true
		}
	});

	if (!workout) {
		res.status(404);
		throw Error('Workout not found!');
	}

	const minutes = calcMinutes(workout.exercises.length);

	res.json({ ...workout, minutes });
});

export const createWorkout = expressAsyncHandler(async (req, res) => {
	const { name, exercises } = req.body;
	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exercises.map(id => {
					id: +id;
				})
			}
		}
	});
	res.json(workout);
});

export const updateWorkout = expressAsyncHandler(async (req, res) => {
	try {
		const { name, exercises } = req.body;
		const id = Number(req.params.id);
		const workout = await prisma.workout.update({
			where: { id },
			data: {
				name,
				exercises: {
					set: exercises.map(id => {
						id: +id;
					})
				}
			}
		});
		res.json(workout);
	} catch (e) {
		res.status(404);
		throw Error('Workout not found!');
	}
});

export const deleteWorkout = expressAsyncHandler(async (req, res) => {
	try {
		const id = Number(req.params.id);
		await prisma.workout.delete({ where: { id } });
		res.json({ message: 'Workout deleted!' });
	} catch (e) {
		res.status(404);
		throw Error('Workout not found!');
	}
});
