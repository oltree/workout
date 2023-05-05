import expressAsyncHandler from 'express-async-handler';

import { prisma } from '../../db/prisma.js';
import { calcMinutes } from '../../utils/calc-minutes.js';

export const getWorkoutLog = expressAsyncHandler(async (req, res) => {
	const workoutLogId = Number(req.params.id);
	console.log(workoutLogId);
	const workoutLog = await prisma.workoutLog.findUnique({
		where: { id: workoutLogId },
		include: {
			workout: {
				include: {
					exercises: true
				}
			},
			exerciseLogs: {
				orderBy: {
					id: 'asc'
				},
				include: {
					exercise: true
				}
			}
		}
	});

	if (!workoutLog) {
		res.status(404);
		throw new Error('Workout log not found!');
	}

	const minutes = calcMinutes(workoutLog.workout.exercises.length);

	res.json({ ...workoutLog, minutes });
});
