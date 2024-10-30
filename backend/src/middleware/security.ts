import { Response, NextFunction } from 'express';
import { ReqWithUser } from '../utils/types/types';

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'myKey';

const authMiddleware = (req: ReqWithUser, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
