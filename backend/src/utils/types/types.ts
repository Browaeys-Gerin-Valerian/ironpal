import { User } from "@prisma/client"
import { Request } from 'express';

export type ReqWithUser = Request & {
    user?: User
  }