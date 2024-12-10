import express from 'express';
import authMiddleware from '../middleware/security';
import authController from '../controllers/authController';
import sessionController from '../controllers/sessionController';
import { catchErrors } from '../middleware/handlers/errorHandlers';


const router = express.Router();

/**
 * get user information
 * @route GET /user
 * @group User - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.get('/', authMiddleware, catchErrors(authController.getLoggedUser));


/**
 * get statistic user
 * @route GET /user/stats
 * @group User - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.get('/stats', authMiddleware, catchErrors(authController.getUserStats));


/**
 * get user session count
 * @route GET /user/count
 * @group User - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/


router.get('/count', authMiddleware, catchErrors(sessionController.getUserSessionCount)); 


/**
 * get user validated session count
 * @route GET /user/validated/count
 * @group User - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.get('/validated/count', authMiddleware, catchErrors(sessionController.getUserValidatedSessionCount));


/**
 * get user session on today's date
 * @route GET /user/today
 * @group User - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/
router.get('/today', authMiddleware, catchErrors(sessionController.getUserTodaySession));


export default router;
