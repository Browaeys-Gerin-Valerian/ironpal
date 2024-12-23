import { Set } from "@prisma/client";

export type CreateSetDTO = Omit<Set, 'id'>
export type UpdateSetDTO = Partial<Set>

