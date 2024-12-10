import { Request, Response, RequestHandler, NextFunction } from 'express';
import bcrypt from "bcryptjs";
import userModel from '../models/userModel';
import sessionModel from '../models/sessionModel';
import { createOrRefreshToken, TOKEN_EXPIRATION_TIME } from '../utils/authentication/jwt';
import { ReqWithUser } from '../utils/types/types';
import ApiError from '../middleware/handlers/apiError';

const authController = {
  getLoggedUser: (async (req: ReqWithUser, res: Response, next: NextFunction) => {

      const { user } = req;

      if(!user) {
        const err = new ApiError(`Can not find user`, 404);
        return next(err);
      };

      res.status(200).json(user);
   
  }),

  register: (async (req: Request, res: Response, next: NextFunction) => {
    const { firstname, lastname, email, password, birthdate } = req.body;
      // Check if user already exists
      const existingUser = await userModel.findUserByEmail(email);

      if (existingUser) {
        const err = new ApiError(`Email already registered`, 409);
        return next(err);
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await userModel.createUser({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        birthdate,
      });

      res.status(201).json({ message: "User created successfully", user: newUser });
  }) as RequestHandler,

  login: (async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

      // Check if user exists
      const user = await userModel.findUserByEmail(email);

      if (!user) {
        const err = new ApiError(`Invalid email or password`, 401);
        return next(err);
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        const err = new ApiError(`Invalid email or password`, 401);
        return next(err);
      }

      const userPayload = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        birthdate: user.birthdate,
      };

      // Create the token for the next protected API calls, authenticity of the token will be checked in security middleware
      const newToken = createOrRefreshToken(user.id);
      res.cookie('token', newToken, { httpOnly: true, expires: new Date(Date.now() + TOKEN_EXPIRATION_TIME) });

      // Authentication successful
      res.status(200).json({ message: "Logged in successfully", user: userPayload });
  
  }) as RequestHandler,

  logout: (async (req: Request, res: Response) => {
      res.clearCookie("token");
      res.status(200).json({ message: "Disconnected successfully" });
  }) as RequestHandler,

  getUserStats: (async (req: ReqWithUser, res: Response, next: NextFunction) => {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };

      const totalUsers = await userModel.getTotalUsers();
      const sessionCount = await sessionModel.getUserSessionCount(id);
      const validatedSessionCount = await sessionModel.getUserValidatedSessionCount(id);

      if(!totalUsers && !sessionCount && !validatedSessionCount) {
        const err = new ApiError(`Can not find totals user and session count and validated session count`, 404);
        return next(err);
      };

      res.status(200).json({
        totalUsers,
        sessionCount,
        validatedSessionCount,
      });
  }) as RequestHandler,
};

export default authController;
