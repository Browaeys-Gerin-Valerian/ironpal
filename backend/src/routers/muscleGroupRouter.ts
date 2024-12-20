import express from 'express';
import authMiddleware from '../middleware/security';
import { muscleGroupController } from '../controllers/muscleGroupeController';
import { catchErrors } from '../middleware/handlers/errorHandlers';
const router = express.Router();

/**
 * get all muscles groups
 * @route GET /muscleGroup
 * @group MuscleGroup - Operations about muscle group
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.get('/', authMiddleware, catchErrors(muscleGroupController.getAll))



export default router;
