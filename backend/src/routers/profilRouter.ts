import express from 'express'
import authMiddleware from '../middleware/security';
import profilController from '../controllers/profilController';
import validate from '../middleware/validation/validation';
import schemas  from '../middleware/validation/schema/user'
const router = express.Router();

const pathSchema = schemas.path;

router.get('/:id', authMiddleware, profilController.getOne)

router.put('/:id', authMiddleware, validate(pathSchema, 'body'), profilController.update)

export default router;