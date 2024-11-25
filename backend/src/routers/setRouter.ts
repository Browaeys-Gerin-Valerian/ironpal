import express from 'express';
import authMiddleware from '../middleware/security';
import setController from '../controllers/setController';

const router = express.Router();

router.get('/');

router.get('/:id');

router.post('/:id');

router.patch('/:id', authMiddleware, setController.udpate);

router.delete('/:id');

export default router;
