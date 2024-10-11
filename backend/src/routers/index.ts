import express from 'express';
import userRouter from './userRouter';
import exerciseRouter from './exerciseRouter';
import muscleGroup from './muscleGroupRouter';
import session from './sessionRouter';
import sessionExercise from './sessionExerciseRouter';
import set from './setRouter';

const router = express.Router();

router.use('/user', userRouter);

router.use('/exercice', exerciseRouter);

router.use('/mucleGroup', muscleGroup);

router.use('/session', session);

router.use('/sessionExercise', sessionExercise);

router.use('/set', set);


export default router;