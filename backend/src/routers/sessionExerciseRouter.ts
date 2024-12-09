import express from 'express';
import sessionExerciseController from '../controllers/sessionExerciseController';

const router = express.Router();

router.post('/', sessionExerciseController.create)

router.put('/:id', sessionExerciseController.update)

router.delete('/:id', sessionExerciseController.delete)


export default router;
