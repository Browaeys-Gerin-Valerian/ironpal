import express from 'express';
import authRouter from './authRouter';
import exerciseRouter from './exerciseRouter';
import muscleGroup from './muscleGroupRouter';
import session from './sessionRouter';
import sessionExercise from './sessionExerciseRouter';
import set from './setRouter';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/exercice', exerciseRouter);

router.use('/mucleGroup', muscleGroup);

router.use('/session', session);

router.use('/sessionExercise', sessionExercise);

router.use('/set', set);


export default router;