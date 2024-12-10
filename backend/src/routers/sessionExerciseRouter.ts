import express from 'express';
import sessionExerciseController from '../controllers/sessionExerciseController';

const router = express.Router();

/**
 * Models type of Session exercise for creation
 * @typedef CreateSessionExercise
 * @property {number} load - 2
 * @property {number} rest_between_exercises - 1
 * @property {boolean} validated - false
 * @property {string} comment - Tout donner sur la dernière série!!!!
 * @property {number} session_id - 5
 * @property {number} exercise_id - 3
 * @property {Array.<Set>} sets - List of sets for the exercise
 */

/**
 * Models type of Session exercise for update
 * @typedef UpdateSessionExercise
 * @property {number} load - 2
 * @property {number} rest_between_exercises - 1
 * @property {boolean} validated - false
 * @property {string} comment - Tout donner sur la dernière série!!!!
 * @property {number} session_id - 5
 * @property {number} exercise_id - 3
 */

/**
 * create session exercise with set(s)
 * @route POST /sessionExercise
 * @group SessionExercise - Operations about session exercise
 * @param {CreateSessionExercise.model} data.body.required - load, rest_between_exercises, session_id, exercise_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */


router.post('/', sessionExerciseController.create)

/**
 * update session exercise with set(s)
 * @route PUT /sessionExercise/{id}
 * @group SessionExercise - Operations about session exercise
 * @param {integer} id.path.required - session_exercise_id
 * @param {UpdateSessionExercise.model} data.body.required - session_id, exercise_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */

router.put('/:id', sessionExerciseController.update)

/**
 * delete session exercise
 * @route DELETE /sessionExercise/{id}
 * @group SessionExercise - Operations about session exercise
 * @param {integer} id.path.required - session_exercise_id
 * @returns {object} 200 - A confirmation object
 * @returns {Error} 400 - Bad request "Invalid ID"
 * @returns {Error} 404 - Not found "Session exercise not found"
 * @returns {Error} 500 - An error has occurred and we\'re working to fix the problem!
 */

router.delete('/:id', sessionExerciseController.delete)


export default router;
