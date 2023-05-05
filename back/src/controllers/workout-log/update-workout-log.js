import expressAsyncHandler from 'express-async-handler';

import { prisma } from '../../db/prisma.js';

export const updateWorkoutLog = expressAsyncHandler(async (req, res) => {
	const workoutLogId = Number(req.params.id);

	try {
		const workoutLog = await prisma.workoutLog.findUnique({
			where: { id: workoutLogId },
			data: {
				isComleted: true
			}
		});

		res.json(workoutLog);
	} catch (error) {
		res.status(404);
		throw new Error('Workout log not found!');
	}
});
