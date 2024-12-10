import { Request, Response, RequestHandler } from 'express';
import bcrypt from "bcryptjs";
import userModel from '../models/userModel';
import sessionModel from '../models/sessionModel';
import { createOrRefreshToken, TOKEN_EXPIRATION_TIME } from '../utils/authentication/jwt';
import { ReqWithUser } from '../utils/types/types';

const authController = {
  getLoggedUser: (async (req: ReqWithUser, res: Response) => {
    try {
      const { user } = req;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  }),

  register: (async (req: Request, res: Response) => {
    const { firstname, lastname, email, password, birthdate } = req.body;
    try {
      // Check if user already exists
      const existingUser = await userModel.findUserByEmail(email);

      if (existingUser) {
        return res.status(409).json({ message: "Email already registered" });
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
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }) as RequestHandler,

  login: (async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await userModel.findUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
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
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  }) as RequestHandler,

  logout: (async (req: Request, res: Response) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Disconnected successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error during logout", error });
    }
  }) as RequestHandler,

  getUserStats: (async (req: ReqWithUser, res: Response) => {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };

    try {
      const totalUsers = await userModel.getTotalUsers();
      const sessionCount = await sessionModel.getUserSessionCount(id);
      const validatedSessionCount = await sessionModel.getUserValidatedSessionCount(id);

      res.status(200).json({
        totalUsers,
        sessionCount,
        validatedSessionCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des statistiques utilisateur.", error });
    }
  }) as RequestHandler,
};

export default authController;
