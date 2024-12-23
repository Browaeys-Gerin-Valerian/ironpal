import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs";
import userModel from '../models/userModel';
import { createOrRefreshToken, TOKEN_EXPIRATION_TIME } from '../utils/authentication/jwt';
import { ReqWithUser } from '../utils/types/user/user'
import ApiError from '../middleware/handlers/apiError';

export const authController = {
  async getLoggedUser(req: ReqWithUser, res: Response, next: NextFunction) {
    const { user } = req;
    if (!user) {
      const err = new ApiError(`Can not find user`, 404);
      return next(err);
    };
    res.status(200).json(user);
  },

  async register(req: Request, res: Response, next: NextFunction) {
    const { firstname, lastname, email, password, birthdate } = req.body;

    const user = await userModel.findByEmail(email);

    if (user) {
      const err = new ApiError(`Email already registered`, 409);
      return next(err);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      birthdate,
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  },

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);

    if (!user) {
      const err = new ApiError(`Invalid email or password`, 401);
      return next(err);
    }

    const isValidPwd = await bcrypt.compare(password, user.password);

    if (!isValidPwd) {
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

    res.status(200).json({ message: "Logged in successfully", user: userPayload });
  },

  async logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.status(200).json({ message: "Disconnected successfully" });
  },
};


