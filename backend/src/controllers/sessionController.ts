import { Request, Response, NextFunction } from 'express';
import sessionModel from '../models/sessionModel';
import dayjs from 'dayjs';
import { ReqWithUser } from '../utils/types/types';
import ApiError from '../middleware/handlers/apiError';

const sessionController = {
  async getOne(req: Request, res: Response, next: NextFunction) {
    const sessionId = req.params.id;

    const session = await sessionModel.findUnique(parseInt(sessionId));

    if(!session) {
      const err = new ApiError(`Can not find session with id : ${sessionId}`, 400);
      return next(err);
  };

    res.status(200).json(session);
  },

  async createSession(req: ReqWithUser, res: Response, next: NextFunction) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };
    const { title, session_date, muscle_group_id, validated = false } = req.body;

    const newSession = await sessionModel.createSession({
      title,
      session_date: new Date(session_date),
      validated,
      user_id: id,
      muscle_group_id: parseInt(muscle_group_id),
    });

    if (!newSession) {
      const err = new ApiError(`Can not create new session`, 400);
      return next(err);
    }

    res.status(201).json(newSession);
  },

  async getUserSessions(req: ReqWithUser, res: Response, next: NextFunction) {

    if(!req.user) throw new Error('Aucun utilisateur trouvé');
    const  {id}  = req.user as {id: number};
    
    const currentMonthStart = dayjs().startOf('month').toDate();
    const currentMonthEnd = dayjs().endOf('month').toDate();

    const sessions = await sessionModel.findUserSessionsForMonth(
      id,
      currentMonthStart,
      currentMonthEnd
    );

    if(!sessions) {
      const err = new ApiError(`Can not find session with id : ${id}`, 400);
      return next(err);
  };

    res.status(200).json(sessions);
  },

  async getUserSessionCount(req: ReqWithUser, res: Response, next : NextFunction) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };


    const count = await sessionModel.getUserSessionCount(id);

    if(!count) {
      const err = new ApiError(`Can not get user session count with id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json({ count });

  },

  async getUserValidatedSessionCount(req: ReqWithUser, res: Response, next: NextFunction) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };

      const count = await sessionModel.getUserValidatedSessionCount(id);

      if(!count) {
        const err = new ApiError(`Can not get user validated session count with id : ${id}`, 400);
        return next(err);
      };

      res.status(200).json({ count });

  },

  async getUserTodaySession(req: ReqWithUser, res: Response, next: NextFunction) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };

      const todaySession = await sessionModel.getUserTodaySession(id);

      if(!todaySession) {
        const err = new ApiError(`Unable to find today's sessions for user id : ${id}`, 400);
        return next(err);
      };

      res.status(200).json(todaySession);

  },

  async updateSession(req: ReqWithUser, res: Response, next: NextFunction) {
    if(!req.user) throw new Error('Aucun utilisateur trouvé');
    const  id  = req.params.id;
    const data = req.body;

    const sessions = await sessionModel.update( parseInt(id), data );

    if(!sessions) {
      const err = new ApiError(`Can not update session with id : ${id}`, 400);
      return next(err);
  };

    res.status(200).json(sessions);
  },
};

export default sessionController;
