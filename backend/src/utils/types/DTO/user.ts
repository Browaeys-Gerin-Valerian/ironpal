import { User } from "@prisma/client"
import { Request } from 'express';

export type ReqWithUser = Request & {
    user?: Omit<User, "password">
}

export type CreateUserDto = Omit<User, 'id' | 'created_at' | 'updated_at'>
export type UpdateUserDTO = Partial<User>