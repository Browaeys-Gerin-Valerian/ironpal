import express from 'express';
import sessionController from '../controllers/sessionController';

const router = express.Router();

router.get('/', )

router.get('/user/:userId', sessionController.getUserSessions )

router.post('/user/:userId', sessionController.createSession )

router.get('/:id', sessionController.getOne)

router.put('/:id',)

router.delete('/:id',)


export default router;
