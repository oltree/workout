import express from 'express';

import { createWorkoutLog } from '../controllers/workout-log/create-workout-log.js';
import { getWorkoutLog } from '../controllers/workout-log/get-workout-log.js';
import { updateWorkoutLog } from '../controllers/workout-log/update-workout-log.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/:id', protect, getWorkoutLog);
router.post('/:id', protect, createWorkoutLog);

router.patch('/complete/:id', protect, updateWorkoutLog);

export default router;
