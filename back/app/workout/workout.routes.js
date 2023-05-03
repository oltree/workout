import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller.js';

const router = express.Router();

router.get('/', protect, getWorkouts);
router.post('/', protect, createWorkout);
router.get('/:id', protect, getWorkout);
router.put('/:id', protect, updateWorkout);
router.delete('/:id', protect, deleteWorkout);

export default router;
