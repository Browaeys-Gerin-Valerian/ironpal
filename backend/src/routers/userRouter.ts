import express from 'express';
import authMiddleware from '../middleware/security';
import { catchErrors } from '../middleware/handlers/errorHandlers';
import { userController } from '../controllers/userContoller';
import validate from '../middleware/validation/validation';
import schemas from '../middleware/validation/schema/user';
import { sessionController } from '../controllers/sessionController';

const postSchema = schemas.post;

const router = express.Router();
/**
 * Get user by ID
 * @route GET /users/{userId}
 * @group User - Operations related to users
 * @param {integer} userId.path.required - ID of the user
 * @returns {object} 200 - User details
 * @returns {integer} 200.id - User ID
 * @returns {string} 200.firstname - User's first name
 * @returns {string} 200.lastname - User's last name
 * @returns {string} 200.email - User's email address
 * @returns {string} 200.birthdate - User's birthdate (ISO 8601 format)
 * @returns {string} 200.created_at - User's creation timestamp (ISO 8601 format)
 * @returns {string} 200.updated_at - User's last update timestamp (ISO 8601 format)
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal server error
 */
router.get('/:userId', catchErrors(userController.getOne));

/**
 * Create a new user
 * @route POST /users
 * @group User - Operations related to users
 * @param {User.model} body.body.required - User details (firstname, lastname, email, password, birthdate)
 * @returns {object} 201 - Successfully created user
 * @returns {integer} 201.id - User ID
 * @returns {string} 201.firstname - User's first name
 * @returns {string} 201.lastname - User's last name
 * @returns {string} 201.email - User's email address
 * @returns {string} 201.birthdate - User's birthdate (ISO 8601 format)
 * @returns {string} 201.created_at - User's creation timestamp (ISO 8601 format)
 * @returns {string} 201.updated_at - User's last update timestamp (ISO 8601 format)
 * @returns {Error} 400 - Validation error
 * @returns {Error} 409 - Email already registered
 * @returns {Error} 500 - Internal server error
 */
router.post('/', validate(postSchema, 'body'), catchErrors(userController.create));

/**
 * Update user by ID
 * @route PATCH /users/{userId}
 * @group User - Operations related to users
 * @param {integer} userId.path.required - ID of the user
 * @param {User.model} body.body.required - Updated user details (firstname, lastname, email, password, birthdate)
 * @returns {object} 200 - Successfully updated user
 * @returns {integer} 200.id - User ID
 * @returns {string} 200.firstname - User's first name
 * @returns {string} 200.lastname - User's last name
 * @returns {string} 200.email - User's email address
 * @returns {string} 200.birthdate - User's birthdate (ISO 8601 format)
 * @returns {string} 200.created_at - User's creation timestamp (ISO 8601 format)
 * @returns {string} 200.updated_at - User's last update timestamp (ISO 8601 format)
 * @returns {Error} 400 - Validation error
 * @returns {Error} 404 - User not found
 * @returns {Error} 409 - Email already registered
 * @returns {Error} 500 - Internal server error
 */
router.patch('/:userId', authMiddleware, catchErrors(userController.update));

/**
 * Get all sessions for a user
 * @route GET /users/{userId}/sessions
 * @group Session - Operations related to sessions
 * @param {integer} userId.path.required - ID of the user
 * @param {integer} month.query.required - Month (1-12)
 * @param {integer} year.query.required - Year (e.g., 2024)
 * @returns {array<object>} 200 - List of sessions
 * @returns {integer} 200[].id - Session ID
 * @returns {string} 200[].title - Session title
 * @returns {string} 200[].session_date - Session date (ISO 8601 format)
 * @returns {boolean} 200[].validated - Whether the session is validated
 * @returns {string} 200[].created_at - Session creation timestamp (ISO 8601 format)
 * @returns {string} 200[].updated_at - Session last update timestamp (ISO 8601 format)
 * @returns {Error} 400 - Missing or invalid query parameters
 * @returns {Error} 404 - Sessions not found
 * @returns {Error} 500 - Internal server error
 */
router.get('/:userId/sessions', authMiddleware, catchErrors(sessionController.getAll));

/**
 * Get a specific session for a user
 * @route GET /users/{userId}/sessions/{sessionId}
 * @group Session - Operations related to sessions
 * @param {integer} userId.path.required - ID of the user
 * @param {integer} sessionId.path.required - ID of the session
 * @returns {object} 200 - Session details
 * @returns {integer} 200.id - Session ID
 * @returns {string} 200.title - Session title
 * @returns {string} 200.session_date - Session date (ISO 8601 format)
 * @returns {array<object>} 200.sessionExercises - List of session exercises
 * @returns {integer} 200.sessionExercises[].id - Exercise ID
 * @returns {string} 200.sessionExercises[].name - Exercise name
 * @returns {array<object>} 200.sessionExercises[].sets - List of sets for the exercise
 * @returns {integer} 200.sessionExercises[].sets[].id - Set ID
 * @returns {integer} 200.sessionExercises[].sets[].reps - Number of repetitions
 * @returns {integer} 200.sessionExercises[].sets[].weight - Weight used
 * @returns {Error} 404 - Session not found
 * @returns {Error} 500 - Internal server error
 */
router.get('/:userId/sessions/:sessionId', authMiddleware, catchErrors(sessionController.getOne));

/**
 * Create a new session for a user
 * @route POST /users/{userId}/sessions
 * @group Session - Operations related to sessions
 * @param {integer} userId.path.required - ID of the user
 * @param {Session.model} body.body.required - Session details (title, session_date)
 * @returns {object} 201 - Successfully created session
 * @returns {integer} 201.id - Session ID
 * @returns {string} 201.title - Session title
 * @returns {string} 201.session_date - Session date (ISO 8601 format)
 * @returns {string} 201.created_at - Session creation timestamp (ISO 8601 format)
 * @returns {string} 201.updated_at - Session last update timestamp (ISO 8601 format)
 * @returns {Error} 400 - Validation error
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal server error
 */
router.post('/:userId/sessions', authMiddleware, catchErrors(sessionController.create));

/**
 * Delete a session by ID for a user
 * @route DELETE /users/{userId}/sessions/{sessionId}
 * @group Session - Operations related to sessions
 * @param {integer} userId.path.required - ID of the user
 * @param {integer} sessionId.path.required - ID of the session
 * @returns {object} 200 - Successfully deleted session
 * @returns {integer} 200.id - Deleted session ID
 * @returns {Error} 404 - Session not found
 * @returns {Error} 500 - Internal server error
 */
router.delete('/:userId/sessions/:sessionId', authMiddleware, catchErrors(sessionController.delete));


export default router;


