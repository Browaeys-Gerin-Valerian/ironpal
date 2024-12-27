import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs";
import userService from '../services/user.service';
import { createOrRefreshToken, TOKEN_EXPIRATION_TIME } from '../utils/authentication/jwt';
import { ReqWithUser } from '../utils/types/DTO/user'
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
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password: pwdBody } = req.body;

    const user = await userService.findByEmail(email);

    if (!user) {
      const err = new ApiError(`Invalid email or password`, 401);
      return next(err);
    }

    const isValidPwd = await bcrypt.compare(pwdBody, user.password);

    if (!isValidPwd) {
      const err = new ApiError(`Invalid email or password`, 401);
      return next(err);
    }

    const { password, ...rest } = user


    // Create the token for the next protected API calls, authenticity of the token will be checked in security middleware
    const newToken = createOrRefreshToken(rest.id);
    res.cookie('token', newToken, { httpOnly: true, expires: new Date(Date.now() + TOKEN_EXPIRATION_TIME) });

    res.status(200).json({ message: "Logged in successfully", user: rest });
  },

  async logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.status(200).json({ message: "Disconnected successfully" });
  },
};


