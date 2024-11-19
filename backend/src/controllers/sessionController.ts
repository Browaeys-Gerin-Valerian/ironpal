import { Request, Response } from 'express';
import sessionModel from '../models/sessionModel';
import dayjs from 'dayjs';
import { ReqWithUser } from '../utils/types/types';

const sessionController = {
  async getOne(req: Request, res: Response) {
    const sessionId = req.params.id;
    
    const user = await sessionModel.findUnique(parseInt(sessionId));

    res.status(200).json(user);
  },

  async createSession(req: ReqWithUser, res: Response) {
    if(!req.user) throw new Error('Aucun utilisateur trouvé')
    const { id } = req.user as {id: number};
    const { title, session_date, muscle_group_id, validated = false } = req.body;

    try {
      const newSession = await sessionModel.createSession({
        title,
        session_date: new Date(session_date),
        validated,
        user_id: id,
        muscle_group_id: parseInt(muscle_group_id),
      });

      res.status(201).json(newSession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la création de la session." });
    }
  },

  async getUserSessions(req: ReqWithUser, res: Response) {
    if(!req.user) throw new Error('Aucun utilisateur trouvé');
    const  {id}  = req.user as {id: number};
    
    const currentMonthStart = dayjs().startOf('month').toDate();
    const currentMonthEnd = dayjs().endOf('month').toDate();

    try {
      const sessions = await sessionModel.findUserSessionsForMonth(
        id,
        currentMonthStart,
        currentMonthEnd
      );
      res.status(200).json(sessions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des sessions pour un utilisateur." });
    }
  },

  async updateSession(req: ReqWithUser, res: Response) {
    if(!req.user) throw new Error('Aucun utilisateur trouvé');
    const  id  = req.params.id;
    const data = req.body;

    try {
      const sessions = await sessionModel.update( parseInt(id), data );
      res.status(200).json(sessions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la modification ou création d'une session exercice." });
    }
  },
};

export default sessionController;
