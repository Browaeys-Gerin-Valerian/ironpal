
import { Request, Response, NextFunction } from 'express';
import ApiError from '../middleware/handlers/apiError';
import { ReqWithUser } from '../utils/types/user/user';
import userModel from '../models/userModel';
import sessionModel from '../models/sessionModel';
import exerciseModel from '../models/exerciceModel';
import mucleGroupModel from '../models/muscleGroupModel';
import { sessionExerciseModel } from '../models/sessionExercise';


export const statController = {

  getAll: async (req: Request, res: Response, next: NextFunction) => {

    const [users, exercises, muscleGroups, sessions, sessionExercises] = await Promise.all(
      [
        await userModel.count(),
        await exerciseModel.count(),
        await mucleGroupModel.count(),
        await sessionModel.count(),
        await sessionExerciseModel.count()
      ]
    )

    const statistics = { users, exercises, muscleGroups, sessions, sessionExercises }


    if (!statistics) {
      const err = new ApiError(`Can not find statistics for the home page`, 400);
      return next(err);
    };

    res.json(statistics);
  },

};


