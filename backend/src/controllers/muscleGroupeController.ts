import { Request, Response, NextFunction } from 'express';
import mucleGroupModel from '../models/muscleGroupModel';


export const muscleGroupController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const muscleGroups = await mucleGroupModel.findMany();
    res.status(200).json(muscleGroups);
  },
};


