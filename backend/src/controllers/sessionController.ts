import { Request, Response } from 'express';
import sessionModel from '../models/sessionModel';

const sessionController = {
  async getOne(req: Request, res: Response) {
    const sessionId = req.params.id;
    
    const user = await sessionModel.findUnique(parseInt(sessionId));

    res.status(200).json(user);
  },
};

export default sessionController;
