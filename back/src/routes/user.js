import express from 'express';

import { getUser } from '../controllers/user/user.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/profile', protect, getUser);

export default router;
