import express from 'express';
import authMiddleware from '../middleware/security';
import { setController } from '../controllers/setController';
import { catchErrors } from '../middleware/handlers/errorHandlers';
import validate from '../middleware/validation/validation';
import { setSchema } from "../middleware/validation/schema/set"

const router = express.Router();


router.patch('/:setId', authMiddleware, validate(setSchema.patchParams, "params"), validate(setSchema.patchBody, "body"), catchErrors(setController.udpate));


export default router;
