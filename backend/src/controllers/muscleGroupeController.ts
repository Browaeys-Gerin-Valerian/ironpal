import { Request, Response, NextFunction } from 'express';
import mucleGroupModel from '../models/muscleGroupModel';
import ApiError from '../middleware/handlers/apiError';

const muscleGroupController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
      const muscleGroups = await mucleGroupModel.findMany();

      if(!muscleGroups || muscleGroups.length === 0) {
        const err = new ApiError(`Can not find muscle group`, 400);
        return next(err);
      };  

      res.status(200).json(muscleGroups);
  },
};

export default muscleGroupController;
