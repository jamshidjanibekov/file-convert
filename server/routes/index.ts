import { Router } from 'express';
import convertRoutes from './convert';

const router = Router();

// Use routes
router.use('/convert', convertRoutes);

export default router;

