import express from 'express'
import authMiddleware from '../middleware/security';
import profilController from '../controllers/profilController';
const router = express.Router();

router.get('/:id', authMiddleware, profilController.getOne)

router.put('/:id', authMiddleware, profilController.update)

export default router;