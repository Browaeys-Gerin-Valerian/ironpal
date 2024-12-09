import { Request, Response } from 'express';
import statisticModel from '../models/statisticModel';

const statisticController = {
    getAllAppStatistic: async (req: Request, res: Response) => {
        try {
            const statistics = await statisticModel.allAppStatistic();
            res.json(statistics);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch statistics' });
          }
      },
 
};

export default statisticController;
