import expressAsyncHandler from 'express-async-handler';

import { prisma } from '../../db/prisma.js';

export const updateExerciseLogTime = expressAsyncHandler(async (req, res) => {
	const exerciseLogTimeId = Number(req.params.id);
	const { weight, repeat, isCompleted } = req.body;

	try {
		const exerciseLogTime = await prisma.exerciseTime.update({
			where: { id: exerciseLogTimeId },
			data: {
				weight,
				repeat,
				isCompleted
			}
		});

		res.json(exerciseLogTime);
	} catch (error) {
		res.status(404);
		throw new Error('Exercise log time not found!');
	}
});

export const completeExerciseLog = expressAsyncHandler(async (req, res) => {
	const exerciseLogId = Number(req.params.id);
	const { isCompleted } = req.body;

	try {
		const exerciseLog = await prisma.exerciseLog.update({
			where: { id: exerciseLogId },
			data: { isCompleted },
			include: { exercise: true, workoutLog: true }
		});

		res.json(exerciseLog);
	} catch (e) {
		res.status(404);
		throw new Error('Exercise log not found!');
	}
});
