import express from 'express';
import { exerciseController } from '../controllers/exerciseController';
import { catchErrors } from '../middleware/handlers/errorHandlers';

const router = express.Router();

/**
 * Models type of Exercise
 * @typedef Exercise
 * @property {number} id - Exercise ID (example: 1)
 * @property {string} name - Exercise name (example: Bench Press)
 * @property {string} description - Exercise description (example: A chest workout targeting pectoral muscles)
 */

/**
 * Get all exercises
 * @route GET /exercise
 * @group Exercise - Operations about exercises
 * @returns {Array.<Exercise>} 200 - An array of exercises
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Exercises not found
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 * 
 * @example response - 200 - Successful response
 * [
 *   {
 *     "id": 1,
 *     "name": "Bench Press",
 *     "description": "A chest workout targeting pectoral muscles"
 *   },
 *   {
 *     "id": 2,
 *     "name": "Squat",
 *     "description": "A leg workout focusing on quadriceps and glutes"
 *   },
 * ]
 */
router.get('/', catchErrors(exerciseController.getAll));

export default router;

