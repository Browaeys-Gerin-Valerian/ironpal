import express from 'express';
import authRouter from './authRouter';
import exerciseRouter from './exerciseRouter';
import muscleGroup from './muscleGroupRouter';
import session from './sessionRouter';
import sessionExerciseRouter from './sessionExerciseRouter';
import profilRouter from './profilRouter';
import setRouter from './setRouter';
import statistics from './statisticRouter';
import user from './userRouter';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/profil', profilRouter);

router.use('/exercise', exerciseRouter);

router.use('/muscleGroup', muscleGroup);

router.use('/session', session);

router.use('/sessionExercise', sessionExerciseRouter);

router.use('/set', setRouter);

router.use('/statistics', statistics);

router.use('/user', user);

export default router;
