import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createExercise,
	deleteExercise,
	getExercises,
	updateExercise
} from './exercise.controller.js';

const router = express.Router();

router.get('/', protect, getExercises);
router.post('/', protect, createExercise);
router.put('/:id', protect, updateExercise);
router.delete('/:id', protect, deleteExercise);

export default router;
