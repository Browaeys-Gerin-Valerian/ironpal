import { Session } from "@prisma/client"



export type CreateSessionDTO = Omit<Session, 'id' | 'created_at' | 'updated_at'>
export type UpdateSessionDTO = Partial<Session>