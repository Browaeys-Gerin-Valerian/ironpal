import prisma from "../../prisma/client";

import { CreateExerciseSessionDTO, UpdatedExerciseSessionDTO } from "../utils/types/session_exercise/sessionExercise";

export const sessionExerciseModel = {
    async getOneWithExerciseAndSets(id: number) {
        return prisma.sessionExercise.findFirst(({
            where: { id }, select: {
                id: true,
                load: true,
                rest_between_exercises: true,
                validated: true,
                comment: true,
                exercise: true,
                set: true
            }
        }))
    },

    async create(data: CreateExerciseSessionDTO) {
        const { session_id, exercise_id, load, rest_between_exercises, sets } = data


        const createdSessionExercise = await prisma.sessionExercise.create({
            data: {
                load: Number(load),
                session_id: Number(session_id),
                exercise_id: Number(exercise_id),
                rest_between_exercises: Number(rest_between_exercises),
                validated: false,
                comment: "",

            },
        });

        if (createdSessionExercise && sets && Array.isArray(sets)) {
            for (const set of sets) {
                const { rest_between_sets, number_of_repetitions } = set
                await prisma.set.create({
                    data: {
                        session_exercise_id: createdSessionExercise.id,
                        number_of_repetitions: Number(number_of_repetitions),
                        rest_between_sets: Number(rest_between_sets),
                        difficulty: 0,

                    },
                });
            }
        }
        return this.getOneWithExerciseAndSets(createdSessionExercise.id)
    },
    async update(id: number, data: UpdatedExerciseSessionDTO) {
        const { exercise_id, load, validated, rest_between_exercises, sets } = data


        const updatedSessionExercise = await prisma.sessionExercise.update({
            where: { id },
            data: {
                load: Number(load),
                exercise_id: Number(exercise_id),
                rest_between_exercises: Number(rest_between_exercises),
                validated,
                comment: "",

            },
        });

        //TODO TRAITER LE CAS OU L'UTILISATEUR AJOUTE OU SUPPRIME DES SETS LORS DE L'UPDATE
        if (updatedSessionExercise && sets && Array.isArray(sets)) {
            for (const set of sets) {
                const { id, rest_between_sets, number_of_repetitions, difficulty } = set
                await prisma.set.update({
                    where: { id },
                    data: {
                        session_exercise_id: updatedSessionExercise.id,
                        number_of_repetitions: Number(number_of_repetitions),
                        rest_between_sets: Number(rest_between_sets),
                        difficulty,
                    },
                });
            }
        }
        return this.getOneWithExerciseAndSets(updatedSessionExercise.id)
    },
    async delete(id: number) {
        //CASCADE DELETE FOR SET SEEMS TO NOT WORK
        await prisma.set.deleteMany({
            where: { session_exercise_id: id },
        });

        await prisma.sessionExercise.delete({ where: { id } })
    }
}
