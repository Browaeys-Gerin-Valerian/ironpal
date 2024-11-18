import { Response, NextFunction } from 'express';
import { ReqWithUser } from '../utils/types/types';
import userModel from '../models/userModel';
import { checkToken, createOrRefreshToken, TOKEN_EXPIRATION_TIME } from '../utils/authentication/jwt';

const authMiddleware = async (req: ReqWithUser, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = checkToken(token)
    if (typeof decoded === "string") {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    const user = await userModel.findUniqueWithoutPassword(decoded.id);
    if (!user) {
      res.status(403).json({ message: 'User not found.' });
      return;
    }

    const newToken = createOrRefreshToken(decoded.id)
    res.cookie('token', newToken, { httpOnly: true, expires: new Date(Date.now() + TOKEN_EXPIRATION_TIME) });
    req.user = user;

    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;