import express from 'express';
import { authController } from '../controllers/authController';
import { catchErrors } from '../middleware/handlers/errorHandlers';
import authMiddleware from '../middleware/security';
import { authSchema } from '../middleware/validation/schema/auth';
import validate from '../middleware/validation/validation';

const router = express.Router();

/**
 * Models type of UserLogin
 * @typedef UserLogin
 * @property {string} email - User email (example: johndoe@gmail.com)
 * @property {string} password - User password (example: P@ssw0rd!)
 */

/**
 * Models type of UserRegister
 * @typedef UserRegister
 * @property {string} firstname - User's first name (example: John)
 * @property {string} lastname - User's last name (example: Doe)
 * @property {string} email - User email (example: johndoe@gmail.com)
 * @property {string} password - User password (example: P@ssw0rd!)
 * @property {string} birthdate - User birthdate (example: 1990-12-05)
 */

/**
 * Models type of LoggedUser
 * @typedef LoggedUser
 * @property {number} id - User ID (example: 1)
 * @property {string} firstname - User's first name (example: John)
 * @property {string} lastname - User's last name (example: Doe)
 * @property {string} email - User email (example: johndoe@gmail.com)
 * @property {string} birthdate - User birthdate (example: 1990-12-05)
 */

/**
 * Get the logged-in user's information
 * @route GET /auth
 * @group Authentication - Operations about user authentication
 * @returns {LoggedUser.model} 200 - Details of the logged-in user
 * @returns {Error} 401 - Unauthorized, no user logged in
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 * 
 * @example response - 200 - Successful response
 * {
 *   "id": 1,
 *   "firstname": "John",
 *   "lastname": "Doe",
 *   "email": "johndoe@gmail.com",
 *   "birthdate": "1990-12-05"
 * }
 */
router.get('/', authMiddleware, catchErrors(authController.getLoggedUser));

/**
 * Login a user
 * @route POST /auth/login
 * @group Authentication - Operations about user authentication
 * @param {UserLogin.model} data.body.required - User login credentials
 * @returns {object} 200 - Successfully logged in, returns token and user info
 * @returns {Error} 401 - Unauthorized, invalid email or password
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 * 
 * @example response - 200 - Successful login
 * {
 *   "message": "Logged in successfully",
 *   "user": {
 *     "id": 1,
 *     "firstname": "John",
 *     "lastname": "Doe",
 *     "email": "johndoe@gmail.com",
 *     "birthdate": "1990-12-05"
 *   }
 * }
 */
router.post('/login', validate(authSchema.postBody, "body"), catchErrors(authController.login));

/**
 * Logout the current user
 * @route GET /auth/logout
 * @group Authentication - Operations about user authentication
 * @returns {object} 200 - Successfully logged out
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 * 
 * @example response - 200 - Successful logout
 * {
 *   "message": "Disconnected successfully"
 * }
 */
router.get('/logout', catchErrors(authController.logout));

export default router;
