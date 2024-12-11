import { Set } from "@prisma/client";

export type CreateSetDto = Omit<Set, 'id'>