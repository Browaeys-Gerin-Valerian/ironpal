import express from 'express';
import authController from '../controllers/authController';
import authMiddleware from '../middleware/security';
import validate from '../middleware/validation/validation';
import schemas  from '../middleware/validation/schema/user'
const router = express.Router();

const postSchema = schemas.post;

/**
 * Models type of User
 * @typedef User
 * @property {string} firstname - Jones
 * @property {string} lastname - Doe
 * @property {string} email - jonesDoe@gmail.com
 * @property {string} password - P@ssw0rd!
 * @property {string} repeat_password - P@ssw0rd!
 * @property {string} birthdate - 1993/02/21
 */

/**
 * Models type of UserLogin
 * @typedef UserLogin
 * @property {string} email - jonesDoe@gmail.com
 * @property {string} password - P@ssw0rd!
 */


/**
 * get user information
 * @route GET /auth/user
 * @group User - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.get('/user', authMiddleware, authController.getLoggedUser);


/**
 * Login a user
 * @route POST /auth/login
 * @group User - Operations about user
 * @param {UserLogin.model} data.body.required - email, password
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */

router.post('/login', authController.login)


/**
 * Create user
 * @route POST /auth/register
 * @group User - Operations about user
 * @param {User.model} data.body.required - firstname, lastname, email, password, repeat_password, birthdate
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */

router.post('/register', validate(postSchema, 'body'), authController.register)

/**
 * logout user
 * @route GET /auth/logout
 * @group User - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.get('/logout', authController.logout)

router.get('/user/stats', authMiddleware, authController.getUserStats);


export default router;
