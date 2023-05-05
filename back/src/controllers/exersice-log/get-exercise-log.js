import expressAsyncHandler from 'express-async-handler';

import { prisma } from '../../db/prisma.js';

import { addPrevValues } from './add-prev-values.js';

export const getExerciseLog = expressAsyncHandler(async (req, res) => {
	const exerciseLogId = Number(req.params.id);
	const exerciseLog = await prisma.exerciseLog.findUnique({
		where: { id: exerciseLogId },
		include: {
			exercise: true,
			times: {
				orderBy: {
					id: 'asc'
				}
			}
		}
	});

	if (!exerciseLog) {
		res.status(404);
		throw new Error('Exercise log not found!');
	}

	const prevExerciseLog = await prisma.exerciseLog.findFirst({
		where: {
			exerciseId: exerciseLog.exerciseId,
			userId: req.user.id,
			isCompleted: true
		},
		orderBy: { createdAt: 'desc' },
		include: { times: true }
	});

	const newTimes = addPrevValues(exerciseLog, prevExerciseLog);

	res.json({ ...exerciseLog, times: newTimes });
});
