import { Request, Response, RequestHandler } from 'express';
import bcrypt from "bcryptjs"
import userModel from '../models/userModel';
import { createOrRefreshToken } from '../utils/authentication/jwt';
import { ReqWithUser } from '../utils/types/types';


const userController = {
  getLoggedUser: (async (req: ReqWithUser, res: Response) => {
    const { user } = req
    res.status(200).json(user);
  }),

  register: (async (req: Request, res: Response) => {
    const { firstname, lastname, email, password, birthdate } = req.body;


    try {

      // Check if user already exists
      const existingUser = await userModel.findUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      //Create user
      const newUser = await userModel.createUser({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        birthdate
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
        return res.status(404).json({ message: "Invalid email or password" });
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
        birthdate: user.birthdate
      }

      //Create the token for the next protected api calls, authenticity of the token will be checked in security middleware
      const newToken = createOrRefreshToken(user.id)
      res.cookie('token', newToken, { httpOnly: true, secure: true });

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
      res.status(500).json({ message: "Error Logout", error });
    }
  }) as RequestHandler,

};

export default userController;
