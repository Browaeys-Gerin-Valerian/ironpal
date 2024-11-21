import express from 'express';
import exerciseController from '../controllers/exerciseController';

const router = express.Router();


router.get('/', )

router.delete('/', )

router.get('/:id',)

router.post('/:id',)

router.put('/:id',)

router.delete('/:id',)

router.get('/count', exerciseController.getTotalExercises);



export default router;
