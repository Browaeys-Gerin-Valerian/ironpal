import express from 'express';
import sessionController from '../controllers/sessionController';
import authMiddleware from '../middleware/security';

const router = express.Router();

router.get('/', )

router.get('/count', sessionController.getTotalSessions); // Total sessions

router.get('/user/count', authMiddleware, sessionController.getUserSessionCount); // User sessions count

router.get('/user/validated/count', authMiddleware, sessionController.getUserValidatedSessionCount); // User validated sessions count

router.get('/user/today', authMiddleware, sessionController.getUserTodaySession);

router.get('/user', authMiddleware, sessionController.getUserSessions )

router.post('/user/', authMiddleware, sessionController.createSession )

router.get('/:id', sessionController.getOne)

router.put('/:id',)

router.delete('/:id',) 


export default router;
