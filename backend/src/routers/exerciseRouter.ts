import express from 'express';
import exerciceController from '../controllers/exerciseController';

const router = express.Router();


router.get('/', exerciceController.getAllExercices);

router.get('/:id',)

router.get('/muscleGroup/:id')

export default router;
