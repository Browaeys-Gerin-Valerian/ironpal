import express from 'express';
import exerciceController from '../controllers/exerciseController';

const router = express.Router();

/**
 * Get all exercises
 * @route GET /exercise
 * @group Exercise - Operations about exercise
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */

router.get('/', exerciceController.getAllExercices);

export default router;
