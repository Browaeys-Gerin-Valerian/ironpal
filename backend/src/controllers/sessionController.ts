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

  async getUserSessionCount(req: ReqWithUser, res: Response) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };

    try {
      const count = await sessionModel.getUserSessionCount(id);
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération du nombre de sessions pour l'utilisateur.", error });
    }
  },

  async getUserValidatedSessionCount(req: ReqWithUser, res: Response) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };

    try {
      const count = await sessionModel.getUserValidatedSessionCount(id);
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération du nombre de sessions validées pour l'utilisateur.", error });
    }
  },

  async getUserTodaySession(req: ReqWithUser, res: Response) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };

    try {
      const todaySession = await sessionModel.getUserTodaySession(id);
      res.status(200).json(todaySession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération de la session du jour pour l'utilisateur.", error });
    }
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
