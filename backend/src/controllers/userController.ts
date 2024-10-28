import { Request, Response, RequestHandler } from 'express';
import bcrypt from "bcrypt";
import userModel from '../models/userModel';

const userController = {
  async getOne(req: Request, res: Response) {
    const userId = req.params.id;
    
    const fakeUser = {
      id: userId,
      name: "John Doe",
      email: "john.doe@example.com"
    };

    res.status(200).json(fakeUser);
  },

  register: (async (req: Request, res: Response) => {
    const { firstname, lastname, email, password } = req.body;

    try {

      // Check if user already exists
      const existingUser = await userModel.findUserByEmail(email);
      console.log(existingUser)
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

      // Authentication successful
      res.status(200).json({ message: "Logged in successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  }) as RequestHandler,

};

export default userController;
