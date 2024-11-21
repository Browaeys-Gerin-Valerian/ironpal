import express from 'express';
import sessionController from '../controllers/sessionController';
import authMiddleware from '../middleware/security';
const router = express.Router();

/**
 * Models type of CreateSession
 * @typedef Session
 * @property {string} title - Session dos
 * @property {string} session_date - 1993/02/21
 * @property {number} muscle_group_id - 1
 * @property {boolean} validated - false
 */

router.get('/', )

/**
 * Get all session by user
 * @route GET /session/user
 * @group Session - Operations about session
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */

router.get('/user', authMiddleware, sessionController.getUserSessions )

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

router.post('/user', authMiddleware, sessionController.createSession )

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

router.get('/:id', sessionController.getOne)

router.put('/:id/user', authMiddleware, sessionController.updateSession)

router.delete('/:id',)


export default router;
