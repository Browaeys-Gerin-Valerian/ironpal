import express from 'express';
import authMiddleware from '../middleware/security';
import setController from '../controllers/setController';

const router = express.Router();

/**
 * Models type of Set
 * @typedef Set
 * @property {number} number_of_repetitions - 6
 * @property {number} difficulty - 3
 * @property {number} rest_between_sets - 1
 * @property {number} session_exercise_id - 2
 */

/**
 * update set
 * @route PATCH /set/{id}
 * @group Set - Operations about user
 * @param {integer} id.path.required - set_id
 * @param {Set.model} data.body - number_of_repetitions, difficulty, rest_between_sets, session_exercise_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.patch('/:id', authMiddleware, setController.udpate);

export default router;
