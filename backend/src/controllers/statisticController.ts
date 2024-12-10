
import { Request, Response, NextFunction } from 'express';
import statisticModel from '../models/statisticModel';
import ApiError from '../middleware/handlers/apiError';

const statisticController = {
    getAllAppStatistic: async (req: Request, res: Response, next: NextFunction) => {
     
        const statistics = await statisticModel.allAppStatistic();

        if(!statistics) {
          const err = new ApiError(`Can not find statistics for the home page`, 400);
          return next(err);
        };

        res.json(statistics);
      },

};

export default statisticController;
