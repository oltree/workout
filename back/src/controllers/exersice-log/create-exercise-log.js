import expressAsyncHandler from 'express-async-handler';

import { prisma } from '../../db/prisma.js';

export const createExerciseLog = expressAsyncHandler(async (req, res) => {
	const exerciseLogId = Number(req.params.id);
	const exercise = await prisma.exercise.findUnique({
		where: { id: exerciseLogId }
	});

	if (!exercise) {
		res.status(404);
		throw new Error('Exercise not found!');
	}

	let timesDefault = [];

	for (let i = 0; i < exercise.times; i++) {
		timesDefault.push({
			weight: 0,
			repeat: 0
		});
	}

	const exerciseLog = await prisma.exerciseLog.create({
		data: {
			user: {
				connect: {
					id: req.user.id
				}
			},
			exercise: {
				connect: {
					id: exerciseLogId
				}
			},
			times: {
				createMany: {
					data: timesDefault
				}
			},
			include: {
				times: true
			}
		}
	});

	res.json(exerciseLog);
});
