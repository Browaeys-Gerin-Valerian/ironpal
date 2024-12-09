import express from 'express'
import authMiddleware from '../middleware/security';
import profilController from '../controllers/profilController';
import validate from '../middleware/validation/validation';
import schemas  from '../middleware/validation/schema/user'
const router = express.Router();

const pathSchema = schemas.path;
const getSchema = schemas.get;

/**
 * Get user
 * @route GET /profil/{id}
 * @group User - Operations about user
 * @param {integer} id.path.required - user_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */

router.get('/:id', authMiddleware, validate(getSchema, 'params'), profilController.getOne)

/**
 * Update user
 * @route PUT /profil/{id}
 * @group User - Operations about user
 * @param {integer} id.path.required - user_id
 * @param {User.model} data.body.required - firstname, lastname, email, password, repeat_password, birthdate
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */

router.put('/:id', authMiddleware, validate(pathSchema, 'body'), profilController.update)


export default router;