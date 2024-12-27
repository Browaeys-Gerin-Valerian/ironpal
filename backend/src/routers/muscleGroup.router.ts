import express from 'express';
import { muscleGroupController } from '../controllers/muscleGroupeController';
import { catchErrors } from '../middleware/handlers/errorHandlers';
const router = express.Router();

/**
 * Models type of MuscleGroup
 * @typedef MuscleGroup
 * @property {number} id - Muscle Group ID (example: 1)
 * @property {string} name - Muscle Group name (example: Chest)
 */

/**
 * Get all muscle groups
 * @route GET /muscleGroup
 * @group MuscleGroup - Operations about muscle groups
 * @returns {Array.<MuscleGroup>} 200 - An array of muscle groups
 * @returns {Error} 400 - Bad request
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 404 - Not found
 * @returns {Error} 500 - Internal server error
 * 
 * @example response - 200 - Successful response
 * [
 *   {
 *     "id": 1,
 *     "name": "Chest"
 *   },
 *   {
 *     "id": 2,
 *     "name": "Back"
 *   }
 * ]
 */

router.get('/', catchErrors(muscleGroupController.getAll))



export default router;
