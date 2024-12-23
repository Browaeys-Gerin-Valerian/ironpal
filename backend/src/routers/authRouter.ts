import express from 'express';
import { authController } from '../controllers/authController';
import { catchErrors } from '../middleware/handlers/errorHandlers';
import authMiddleware from '../middleware/security';

const router = express.Router();



/**
 * Models type of UserLogin
 * @typedef UserLogin
 * @property {string} email - jonesDoe@gmail.com
 * @property {string} password - P@ssw0rd!
 */

/**
 * Models type for logged user informations
 * @route GET /auth
 * @group Authentification - Operations about authentication
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.get('/', authMiddleware, catchErrors(authController.getLoggedUser));


/**
 * Login a user
 * @route POST /auth/login
 * @group Authentification - Operations about authentication
 * @param {UserLogin.model} data.body.required - email, password
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */

router.post('/login', catchErrors(authController.login))


/**
 * logout user
 * @route GET /auth/logout
 * @group Authentification - Operations about authentication
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.get('/logout', authController.logout)

export default router;
