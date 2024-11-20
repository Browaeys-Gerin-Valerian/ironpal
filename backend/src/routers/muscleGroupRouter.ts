import express from 'express';
import authMiddleware from '../middleware/security';
import mucleGroupModel from '../models/muscleGroupModel';
import muscleGroupController from '../controllers/muscleGroupeController';

const router = express.Router();


router.get('/', authMiddleware, muscleGroupController.getAll )

router.get('/:id',)



export default router;
