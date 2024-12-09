import express from 'express';
import statisticController from '../controllers/statisticController';

const router = express.Router();

router.get('/', statisticController.getAllAppStatistic);

export default router;
