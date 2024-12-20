import { User } from "@prisma/client"
import { Request } from 'express';

export type ReqWithUser = Request & {
  user?: Omit<User, "password">
}


export type CreateSessionDto = {
  title: string;
  session_date: Date;
  user_id: number;
  muscle_group_id: number | null;
}

export type CreateUserDto = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
}