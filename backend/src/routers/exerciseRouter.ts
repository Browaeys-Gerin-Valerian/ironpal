import express from 'express';
import exerciceController from '../controllers/exerciseController';

const router = express.Router();

router.get('/', exerciceController.getAllExercices);

export default router;
