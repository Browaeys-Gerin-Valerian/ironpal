
import { Request, Response, NextFunction } from 'express';
import ApiError from '../middleware/handlers/apiError';
import userService from '../services/user.service';
import sessionService from '../services/session.service';
import exerciseService from '../services/exercise.service';
import mucleGroupService from '../services/muscleGroup.service';
import { sessionExerciseService } from '../services/sessionExercise.service';


export const statController = {

  getAll: async (req: Request, res: Response, next: NextFunction) => {

    const [users, exercises, muscleGroups, sessions, sessionExercises] = await Promise.all(
      [
        await userService.count(),
        await exerciseService.count(),
        await mucleGroupService.count(),
        await sessionService.count(),
        await sessionExerciseService.count()
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


