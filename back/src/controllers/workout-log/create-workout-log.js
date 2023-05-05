import expressAsyncHandler from 'express-async-handler';

import { prisma } from '../../db/prisma.js';

export const createWorkoutLog = expressAsyncHandler(async (req, res) => {
	const workoutId = Number(req.params.id);
	const workout = await prisma.workout.findUnique({
		where: { id: workoutId },
		include: { exercises: true }
	});

	if (!workout) {
		res.status(404);
		throw new Error('Workout not found!');
	}

	let timesDefault = [];

	for (let i = 0; i < exercise.times; i++) {
		timesDefault.push({
			weight: 0,
			repeat: 0
		});
	}

	const workoutLog = await prisma.workoutLog.create({
		data: {
			user: { connect: { id: req.user.id } },
			workout: { connect: { id: workoutId } },
			exerciseLogs: {
				create: workout.exercises.map(exercise => ({
					user: { connect: { id: req.user.id } },
					exercise: { connect: { id: exercise.id } },
					times: {
						createMany: {
							data: timesDefault
						}
					}
				}))
			}
		},
		include: {
			exerciseLogs: {
				include: {
					times: true
				}
			}
		}
	});

	res.json(workoutLog);
});
