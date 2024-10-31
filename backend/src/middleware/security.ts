import { Response, NextFunction } from 'express';
import { ReqWithUser } from '../utils/types/types';
import userModel from '../models/userModel';

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'myKey';

const authMiddleware = async (req: ReqWithUser, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await userModel.findUniqueWithoutPassword( decoded.id);

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    req.user = user; 
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
