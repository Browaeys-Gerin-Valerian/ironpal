import express from 'express';
import sessionController from '../controllers/sessionController';
import authMiddleware from '../middleware/security';

const router = express.Router();

router.get('/', )

router.get('/user', authMiddleware, sessionController.getUserSessions )

router.post('/user/', authMiddleware, sessionController.createSession )

router.get('/:id', sessionController.getOne)

router.put('/:id/user', authMiddleware, sessionController.updateSession)

router.delete('/:id',)


export default router;
