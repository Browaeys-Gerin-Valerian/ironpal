import express from 'express';
import { catchErrors } from '../middleware/handlers/errorHandlers';
import { statController } from '../controllers/statController';



const router = express.Router();

/**
 * Models type of Resouce
 * @typedef Resource
 * @property {number} users - Users count (example: 120)
 * @property {number} exercises - Exercises count (example: 42)
 * @property {number} muscleGroups - MuscleGroups count (example: 37)
 * @property {number} sessions - Sessions count (example: 538)
 * @property {number} sessionExercises - SessionExercises count (example: 1587)
 */

/**
 * Get all stat for app
 * @route GET /resources/stats
 * @group Resource - Operations about Resource
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.get('/stats', catchErrors(statController.getAll));


export default router;
