import expressAsyncHandler from 'express-async-handler';

import { prisma } from '../../db/prisma.js';
import { UserFields } from '../../utils/userDataWithoutPassword.js';

export const getUser = expressAsyncHandler(async (req, res) => {
	const userId = req.user.id;
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: UserFields
	});

	const totalMinutesOfExercises = await prisma.exerciseLog.count({
		where: {
			userId: userId,
			isCompleted: true
		}
	});

	const totalCompletedWorkouts = await prisma.workoutLog.count({
		where: {
			userId: user.id,
			isCompleted: true
		}
	});

	res.json({
		...user,
		statistics: {
			minutes: totalMinutesOfExercises || 0,
			workouts: totalCompletedWorkouts || 0
		}
	});
});
