import express from 'express';

import {
	createExercise,
	deleteExercise,
	getExercises,
	updateExercise
} from '../controllers/exercise/exercise.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', protect, getExercises);
router.post('/', protect, createExercise);
router.put('/:id', protect, updateExercise);
router.delete('/:id', protect, deleteExercise);

export default router;
