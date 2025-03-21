import { Router } from 'express';
import { thoughtsRoutes } from './ThoughtRoutes.js';
import { userRoutes } from './UserRoutes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);

export default router;