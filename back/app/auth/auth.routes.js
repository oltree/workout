import express from 'express';

import { loginUser, registerUser } from './auth.controller.js';

const router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

export default router;
