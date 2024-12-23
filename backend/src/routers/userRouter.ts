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
 * Models type of User
 * @typedef User
 * @property {number} id - User ID (example: 1)
 * @property {string} firstname - User's first name (example: John)
 * @property {string} lastname - User's last name (example: Doe)
 * @property {string} email - User's email address (example: johndoe@gmail.com)
 * @property {string} password - User's password (example: Monmotdepasse001!)
 * @property {string} birthdate - User's birthdate (example: 1990-12-05T15:00:02.079Z)
 * @property {string} created_at - User creation timestamp (example: 2024-11-17T15:00:02.079Z)
 * @property {string} updated_at - User last update timestamp (example: 2024-12-20T15:00:02.079Z)
 */

/**
 * Models type of Session
 * @typedef Session
 * @property {number} id - Session ID (example: 101)
 * @property {string} title - Session title (example: Upper Body Workout)
 * @property {string} session_date - Session date (example: 2024-01-05T10:00:00.000Z)
 * @property {number} user_id - User ID (example: 1)
 * @property {string} created_at - Session creation timestamp (example: 2024-01-01T15:00:00.000Z)
 * @property {string} updated_at - Session last update timestamp (example: 2024-01-05T15:00:00.000Z)
 */

/**
 * Get user by ID
 * @route GET /users/{id}
 * @group User - Operations about user
 * @param {integer} id.path.required - User ID
 * @returns {object} 200 - User details
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 */
router.get('/:id', catchErrors(userController.getOne));

/**
 * Create user
 * @route POST /users
 * @group User - Operations about user creation
 * @param {User.model} data.body.required - User details (firstname, lastname, email, password, birthdate)
 * @returns {object} 201 - Successfully created user
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 */
router.post('/', validate(postSchema, 'body'), catchErrors(userController.create));

/**
 * Update user by ID
 * @route PATCH /users/{id}
 * @group User - Operations about user update
 * @param {integer} id.path.required - User ID
 * @param {User.model} data.body - Updated user details (firstname, lastname, email, password, birthdate)
 * @returns {object} 200 - Successfully updated user
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 */
router.patch('/:id', authMiddleware, catchErrors(userController.update));

/**
 * Get all sessions for a user
 * @route GET /users/{id}/sessions
 * @group Session - Operations about user sessions
 * @param {integer} id.path.required - User ID
 * @returns {object} 200 - List of sessions
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Sessions not found
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 */
router.get('/:id/sessions', authMiddleware, catchErrors(sessionController.getAll));

/**
 * Get a specific session for a user
 * @route GET /users/{id}/sessions/{sessionId}
 * @group Session - Operations about user sessions
 * @param {integer} id.path.required - User ID
 * @param {integer} sessionId.path.required - Session ID
 * @returns {object} 200 - Session details
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Session not found
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 */
router.get('/:id/sessions/:sessionId', authMiddleware, catchErrors(sessionController.getOne));

/**
 * Create a session for a user
 * @route POST /users/{id}/sessions
 * @group Session - Operations about user sessions
 * @param {integer} id.path.required - User ID
 * @param {Session.model} data.body.required - Session details (title, session_date)
 * @returns {object} 201 - Successfully created session
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 */
router.post('/:id/sessions', authMiddleware, catchErrors(sessionController.create));

/**
 * Delete a session by ID for a user
 * @route DELETE /users/{id}/sessions/{sessionId}
 * @group Session - Operations about user sessions
 * @param {integer} id.path.required - User ID
 * @param {integer} sessionId.path.required - Session ID
 * @returns {object} 200 - Successfully deleted session
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Session not found
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 */
router.delete('/:id/sessions/:sessionId', authMiddleware, catchErrors(sessionController.delete));

export default router;


