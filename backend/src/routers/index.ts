import express from 'express';
import appRouter from './appRouter';
import authRouter from './authRouter';
import userRouter from './userRouter'
import exerciseRouter from './exerciseRouter';
import muscleGroupRouter from './muscleGroupRouter';
import sessionRouter from './sessionRouter';
import sessionExerciseRouter from './sessionExerciseRouter';
import setRouter from './setRouter';



const router = express.Router();

router.use('/app', appRouter);

router.use('/auth', authRouter);

router.use('/user', userRouter)

router.use('/exercise', exerciseRouter);

router.use('/muscleGroup', muscleGroupRouter);

router.use('/session', sessionRouter);

router.use('/sessionExercise', sessionExerciseRouter);

router.use('/set', setRouter);



export default router;
