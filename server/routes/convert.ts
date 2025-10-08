import { Router } from 'express';
import { upload } from '../middleware/upload';
import { convertFile } from '../controllers/convertController';

const router = Router();

// POST /api/convert - Faylni konvertatsiya qilish
router.post('/', upload.single('file'), convertFile);

export default router;

