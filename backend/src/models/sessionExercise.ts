import prisma from "../../prisma/client";
import { CreateSessionExerciseDTO, UpdateSessionExerciseDTO } from "../utils/types/session_exercise/sessionExercise";

export const sessionExerciseModel = {
    async findManyBySessionId(session_id: number) {
        return prisma.sessionExercise.findMany({
            where: { session_id }
        })
    },

    async create(data: CreateSessionExerciseDTO) {
        return prisma.sessionExercise.create({
            data
        });
    },

    async update(session_exercise_id: number, data: UpdateSessionExerciseDTO) {
        return prisma.sessionExercise.update({
            where: { id: session_exercise_id },
            data
        });
    },
    async delete(session_exercise_id: number) {
        //CASCADE DELETE FOR SET SEEMS TO NOT WORK
        // await prisma.set.deleteMany({
        //     where: { session_exercise_id },
        // });

        return prisma.sessionExercise.delete({ where: { id: session_exercise_id } })
    },
    async count() {
        return prisma.sessionExercise.count()
    }
}
