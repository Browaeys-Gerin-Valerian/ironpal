import express from 'express';
import authMiddleware from '../middleware/security';
import muscleGroupController from '../controllers/muscleGroupeController';
const router = express.Router();

/**
 * Models type of Muscle Group
 * @typedef MuscleGroup
 * @property {number} id - 1
 * @property {string} name - Jambes
 */

/**
 * get all muscles groups
 * @route GET /muscleGroup
 * @group MuscleGroup - Operations about muscle group
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.get('/', authMiddleware, muscleGroupController.getAll )

router.get('/:id',)



export default router;
