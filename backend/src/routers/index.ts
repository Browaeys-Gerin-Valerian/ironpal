import express from 'express';
import authRouter from './authRouter';
import exerciseRouter from './exerciseRouter';
import muscleGroupRouter from './muscleGroupRouter';
import sessionRouter from './sessionRouter';
import sessionExerciseRouter from './sessionExerciseRouter';
import profilRouter from './profilRouter';
import setRouter from './setRouter';
import statRouter from './statisticRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/profil', profilRouter);

router.use('/exercise', exerciseRouter);

router.use('/muscleGroup', muscleGroupRouter);

router.use('/session', sessionRouter);

router.use('/sessionExercise', sessionExerciseRouter);

router.use('/set', setRouter);

router.use('/statistics', statRouter);

router.use('/user', userRouter);

export default router;
