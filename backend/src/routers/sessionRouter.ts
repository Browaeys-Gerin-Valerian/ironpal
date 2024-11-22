import express from 'express';
import sessionController from '../controllers/sessionController';
import authMiddleware from '../middleware/security';
import validate from '../middleware/validation/validation';
import schemas  from '../middleware/validation/schema/session'
const router = express.Router();

const postSchema = schemas.post;
const getSchema = schemas.get;

router.get('/', )

router.get('/count', sessionController.getTotalSessions); // Total sessions

router.get('/user/count', authMiddleware, sessionController.getUserSessionCount); // User sessions count

router.get('/user/validated/count', authMiddleware, sessionController.getUserValidatedSessionCount); // User validated sessions count

router.get('/user/today', authMiddleware, sessionController.getUserTodaySession);

router.get('/user', authMiddleware, sessionController.getUserSessions )

router.post('/user/', authMiddleware, validate(postSchema, 'body'), sessionController.createSession )

router.get('/:id', validate(getSchema, 'params'), sessionController.getOne)

router.put('/:id/user', authMiddleware, sessionController.updateSession)

router.delete('/:id',) 


export default router;
