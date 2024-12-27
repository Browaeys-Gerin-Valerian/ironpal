import express from 'express';
import { sessionExerciseController } from '../controllers/sessionExerciseController';
import { catchErrors } from '../middleware/handlers/errorHandlers';
import validate from '../middleware/validation/validation';
import { sessionExerciseSchema } from '../middleware/validation/schema/sessionExercise';

const router = express.Router();
/**
 * Create a session exercise with sets
 * @route POST session/{sessionId}/sessionExercises
 * @group SessionExercise - Operations about session exercise
 * @param {integer} sessionId.path.required - ID of the session
 * @param {CreateSessionExercise.model} data.body.required - Session exercise and associated sets
 * @returns {object} 200 - Created session exercise
 * @returns {integer} 200.id - Session exercise ID
 * @returns {number} 200.load - Load for the session exercise
 * @returns {number} 200.rest_between_exercises - Rest time between exercises
 * @returns {boolean} 200.validated - Whether the session exercise is validated
 * @returns {string} 200.comment - Comments for the session exercise
 * @returns {integer} 200.session_id - Associated session ID
 * @returns {integer} 200.exercise_id - Associated exercise ID
 * @returns {array<object>} 200.sets - List of sets for the session exercise
 * @returns {integer} 200.sets[].id - Set ID
 * @returns {number} 200.sets[].number_of_repetitions - Number of repetitions
 * @returns {number} 200.sets[].difficulty - Difficulty level
 * @returns {number} 200.sets[].rest_between_sets - Rest time between sets
 * @returns {Error} 400 - Bad request (e.g., invalid input data)
 * @returns {Error} 500 - Internal server error
 */
router.post('/:sessionId/sessionExercises', validate(sessionExerciseSchema.postParams, "params"), validate(sessionExerciseSchema.postBody, "body"), catchErrors(sessionExerciseController.create));

/**
 * Update a session exercise with sets
 * @route PUT session/{sessionId}/sessionExercises/{sessionExerciseId}
 * @group SessionExercise - Operations about session exercise
 * @param {integer} sessionId.path.required - ID of the session
 * @param {integer} sessionExerciseId.path.required - ID of the session exercise
 * @param {UpdateSessionExercise.model} data.body.required - Updated session exercise and sets
 * @returns {object} 200 - Updated session exercise
 * @returns {integer} 200.id - Session exercise ID
 * @returns {number} 200.load - Load for the session exercise
 * @returns {number} 200.rest_between_exercises - Rest time between exercises
 * @returns {boolean} 200.validated - Whether the session exercise is validated
 * @returns {string} 200.comment - Comments for the session exercise
 * @returns {integer} 200.session_id - Associated session ID
 * @returns {integer} 200.exercise_id - Associated exercise ID
 * @returns {array<object>} 200.sets - List of updated sets
 * @returns {integer} 200.sets[].id - Set ID
 * @returns {number} 200.sets[].number_of_repetitions - Number of repetitions
 * @returns {number} 200.sets[].difficulty - Difficulty level
 * @returns {number} 200.sets[].rest_between_sets - Rest time between sets
 * @returns {Error} 400 - Bad request (e.g., invalid input data)
 * @returns {Error} 404 - Session exercise not found
 * @returns {Error} 500 - Internal server error
 */
router.put('/:sessionId/sessionExercises/:sessionExerciseId', validate(sessionExerciseSchema.putParams, "params"), validate(sessionExerciseSchema.putBody, "body"), catchErrors(sessionExerciseController.update));

/**
 * Delete a session exercise
 * @route DELETE session/{sessionId}/sessionExercises/{sessionExerciseId}
 * @group SessionExercise - Operations about session exercise
 * @param {integer} sessionId.path.required - ID of the session
 * @param {integer} sessionExerciseId.path.required - ID of the session exercise
 * @returns {object} 200 - A confirmation object
 * @returns {string} 200.message - Success message
 * @returns {Error} 400 - Bad request (e.g., invalid ID)
 * @returns {Error} 404 - Session exercise not found
 * @returns {Error} 500 - Internal server error
 */
router.delete('/:sessionId/sessionExercises/:sessionExerciseId', validate(sessionExerciseSchema.deleteParams, "params"), catchErrors(sessionExerciseController.delete));




export default router;