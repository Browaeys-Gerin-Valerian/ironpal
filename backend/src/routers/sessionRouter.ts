import express from 'express';
import sessionController from '../controllers/sessionController';
import authMiddleware from '../middleware/security';
import validate from '../middleware/validation/validation';
import schemas from '../middleware/validation/schema/session'
import { catchErrors } from '../middleware/handlers/errorHandlers';
const router = express.Router();
const postSchema = schemas.post;
const getSchema = schemas.get;
/**
 * Models type of CreateSession
 * @typedef Session
 * @property {string} title - Session dos
 * @property {string} session_date - 1993/02/21
 * @property {number} muscle_group_id - 1
 * @property {boolean} validated - false
 */



/**
 * Get session of the current month for logged user
 * @route GET /session/user
 * @group Session - Operations about session
 * @param {string} month.query.required - (format: MM)
 * @param {string} year.query.required - (format: YYYY)
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */

router.get('/user', authMiddleware, catchErrors(sessionController.getUserSessions))

/**
 * Create session 
 * @route POST /session/user
 * @group Session - Operations about session
 * @param {Session.model} data.body.required - title, session_date, muscle_group_id, validated
 * @returns {object} 201 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */

router.post('/user', authMiddleware, validate(postSchema, 'body'), catchErrors(sessionController.createSession))


/**
 * Get session by id
 * @route GET /session/{id}
 * @group Session - Operations about session
 * @param {integer} id.path.required - session_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */

router.get('/:id', validate(getSchema, 'params'), catchErrors(sessionController.getOne))

router.delete('/:id', catchErrors(sessionController.delete))

router.put('/:id', authMiddleware, catchErrors(sessionController.updateSession))

export default router;

