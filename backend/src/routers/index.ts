import express from 'express';
import resourceRouter from './resource.router';
import authRouter from './auth.router';
import userRouter from './user.router'
import sessionRouter from './session.router'
import exerciseRouter from './exercise.router';
import muscleGroupRouter from './muscleGroup.router';
import setRouter from './set.router';


const router = express.Router();
router.use('/resources', resourceRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter)
router.use('/sessions', sessionRouter)
router.use('/sets', setRouter);
router.use('/exercises', exerciseRouter);
router.use('/muscleGroups', muscleGroupRouter);



export default router;
