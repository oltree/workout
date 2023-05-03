import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import { getUser } from './user.controller.js'

const router = express.Router()

router.get('/profile', protect, getUser)

export default router
