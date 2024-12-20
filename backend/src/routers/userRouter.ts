import express from 'express';
import authMiddleware from '../middleware/security';
import { catchErrors } from '../middleware/handlers/errorHandlers';
import { userController } from '../controllers/userContoller';

const router = express.Router();

router.get('/:id', authMiddleware, catchErrors(userController.getOne))
router.patch('/:id', authMiddleware, catchErrors(userController.update));


export default router;
