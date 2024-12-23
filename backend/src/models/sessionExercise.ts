import prisma from "../../prisma/client";
import { CreateSessionExerciseDTO, UpdateSessionExerciseDTO } from "../utils/types/session_exercise/sessionExercise";

export const sessionExerciseModel = {
    async findManyBySessionId(sessionId: number) {
        return prisma.sessionExercise.findMany({
            where: { session_id: sessionId },
            orderBy: { id: 'asc' },
            include: { exercise: true },
        })
    },

    async create(data: CreateSessionExerciseDTO) {
        return prisma.sessionExercise.create({
            data
        });
    },

    async update(sessionExerciseId: number, data: UpdateSessionExerciseDTO) {
        return prisma.sessionExercise.update({
            where: { id: sessionExerciseId },
            data
        });
    },
    async delete(sessionExerciseId: number) {
        return prisma.sessionExercise.delete({ where: { id: sessionExerciseId } })
    },
    async count() {
        return prisma.sessionExercise.count()
    }
}
