import express from 'express';
import resourceRouter from './resourceRouter';
import authRouter from './authRouter';
import userRouter from './userRouter'
import sessionRouter from './sessionRouter'
import exerciseRouter from './exerciseRouter';
import muscleGroupRouter from './muscleGroupRouter';
import setRouter from './setRouter';


const router = express.Router();
router.use('/resources', resourceRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter)
router.use('/sessions', sessionRouter)
router.use('/sets', setRouter);
router.use('/exercises', exerciseRouter);
router.use('/muscleGroups', muscleGroupRouter);



export default router;
