import express from 'express';

import {
	createWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout
} from '../controllers/workout/workout.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', protect, getWorkouts);
router.post('/', protect, createWorkout);
router.get('/:id', protect, getWorkout);
router.put('/:id', protect, updateWorkout);
router.delete('/:id', protect, deleteWorkout);

export default router;
