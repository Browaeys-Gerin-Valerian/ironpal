import { Request, Response, NextFunction } from 'express';
import { ReqWithUser } from '../utils/types/user/user';
import ApiError from '../middleware/handlers/apiError';
import sessionModel from '../models/sessionModel';
import { calculateDateRange } from '../utils/functions/time';
import { sessionExerciseModel } from '../models/sessionExercise';
import { isEmptyArray } from '../utils/functions/array';

export const sessionController = {

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const session = await sessionModel.findUnique(parseInt(id));

    if (!session) {
      const err = new ApiError(`Can not find session with id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json(session);
  },

  async getAll(req: ReqWithUser, res: Response, next: NextFunction) {
    const { id } = req.user as { id: number };
    const { month, year } = req.query;

    if (!month || !year) {
      const err = new ApiError(`Query parameter month or year missing`, 400);
      return next(err);
    };

    const { monthStart, monthEnd } = calculateDateRange(month as string, year as string)

    const sessions = await sessionModel.findManyByUserId(id, monthStart, monthEnd);

    if (!sessions) {
      const err = new ApiError(`Can not find session with id : ${id}`, 400);
      return next(err);
    };

    //Check the field "validated" in all session exercise from a session
    const sessionValidated = await Promise.all(
      sessions.map(async (s) => {
        const sessionExercises = await sessionExerciseModel.findManyBySessionId(s.id);
        const validated = isEmptyArray(sessionExercises) ? false : sessionExercises.every(se => se.validated);
        return { ...s, validated };
      })
    );

    res.status(200).json(sessionValidated);
  },


  async create(req: ReqWithUser, res: Response, next: NextFunction) {
    const { id } = req.user as { id: number };
    const { title, session_date } = req.body;

    const newSession = await sessionModel.create({
      title,
      session_date: new Date(session_date),
      user_id: id,
    });

    if (!newSession) {
      const err = new ApiError(`Can not create new session`, 400);
      return next(err);
    }

    res.status(201).json(newSession);
  },


  async delete(req: ReqWithUser, res: Response, next: NextFunction) {
    const { id } = req.params;
    const sessions = await sessionModel.delete(parseInt(id));

    if (!sessions) {
      const err = new ApiError(`Can not delete session with id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json(sessions);
  },
};
