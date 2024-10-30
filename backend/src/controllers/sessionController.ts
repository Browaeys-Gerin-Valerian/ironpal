import { Request, Response } from 'express';
import sessionModel from '../models/sessionModel';
import dayjs from 'dayjs';

const sessionController = {
  async getOne(req: Request, res: Response) {
    const sessionId = req.params.id;
    
    const user = await sessionModel.findUnique(parseInt(sessionId));

    res.status(200).json(user);
  },

  async createSession(req: Request, res: Response) {
    const { userId } = req.params;
    const { title, session_date, muscle_group_id, validated = false } = req.body;

    try {
      const newSession = await sessionModel.createSession({
        title,
        session_date: new Date(session_date),
        validated,
        user_id: parseInt(userId),
        muscle_group_id: parseInt(muscle_group_id),
      });

      res.status(201).json(newSession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la création de la session." });
    }
  },

  async getUserSessions(req: Request, res: Response) {
    const { userId } = req.params;
    const currentMonthStart = dayjs().startOf('month').toDate();
    const currentMonthEnd = dayjs().endOf('month').toDate();

    try {
      const sessions = await sessionModel.findUserSessionsForMonth(
        parseInt(userId),
        currentMonthStart,
        currentMonthEnd
      );
      res.status(200).json(sessions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des sessions pour un utilisateur." });
    }
  },
};

export default sessionController;
