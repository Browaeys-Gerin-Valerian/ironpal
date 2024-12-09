import express from 'express';
import statisticController from '../controllers/statisticController';

const router = express.Router();

/**
 * get all stat for home page
 * @route GET /statistics
 * @group Statistics - Operations about HomePage
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/

router.get('/', statisticController.getAllAppStatistic);

export default router;
