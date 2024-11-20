import { Request, Response } from 'express';
import mucleGroupModel from '../models/muscleGroupModel';

const muscleGroupController = {
  async getAll(req: Request, res: Response) {
    try {
      const muscleGroups = await mucleGroupModel.findMany();
      res.status(200).json(muscleGroups);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching muscle groups.' });
    }
  },
};

export default muscleGroupController;
