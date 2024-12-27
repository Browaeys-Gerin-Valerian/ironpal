import { Request, Response, NextFunction } from 'express';
import mucleGroupService from '../services/muscleGroup.service';


export const muscleGroupController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const muscleGroups = await mucleGroupService.findMany();
    res.status(200).json(muscleGroups);
  },
};


