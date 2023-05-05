import express from 'express';

import { createExerciseLog } from '../controllers/exersice-log/create-exercise-log.js';
import { getExerciseLog } from '../controllers/exersice-log/get-exercise-log.js';
import {
	completeExerciseLog,
	updateExerciseLogTime
} from '../controllers/exersice-log/update-exercise-log.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/:id', protect, getExerciseLog);
router.post('/:id', protect, createExerciseLog);

router.put('/time/:id', protect, updateExerciseLogTime);

router.patch('/complete/:id', protect, completeExerciseLog);

export default router;
