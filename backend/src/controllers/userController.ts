import { Request, Response, RequestHandler } from 'express';
import bcrypt from "bcryptjs"
const jwt = require('jsonwebtoken')
import userModel from '../models/userModel';


const JWT_SECRET = process.env.JWT_SECRET || 'myKey';

const userController = {

  async getOne(req: Request, res: Response) {
    const userId = req.params.id;
    
    const user = await userModel.findUnique(parseInt(userId));

    res.status(200).json(user);
  },

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

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      // Authentication successful
      res.status(200).json({ message: "Logged in successfully", token, user: userPayload });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  }) as RequestHandler,

};

export default userController;
