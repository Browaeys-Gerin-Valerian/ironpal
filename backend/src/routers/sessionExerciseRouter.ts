import express from 'express';
import exerciseController from '../controllers/exerciseController';
import sessionExerciseController from '../controllers/sessionExerciseController';

const router = express.Router();


router.post('/', sessionExerciseController.create)

router.put('/:id', sessionExerciseController.update)

router.delete('/:id', sessionExerciseController.delete)

router.get('/count', exerciseController.getTotalExercises);



export default router;
