import prisma from "../../prisma/client";
import setModel from "./setModel";
import { isNotEmptyArray } from "../utils/functions/array";
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
                set: {
                    orderBy: {
                        id: 'asc',
                    },
                }
            }
        }))
    },

    async create(data: CreateExerciseSessionDTO) {
        const { session_id, exercise_id, load, comment, rest_between_exercises, sets } = data


        const createdSessionExercise = await prisma.sessionExercise.create({
            data: {
                load: Number(load),
                session_id: Number(session_id),
                exercise_id: Number(exercise_id),
                rest_between_exercises: Number(rest_between_exercises),
                validated: false,
                comment: comment ?? '',

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


        if (updatedSessionExercise && sets && Array.isArray(sets)) {

            //HANDLE THE CASE WHERE USER ADD OR DELETE SETS ON UPDATE
            const setsFromSessionExercise = await setModel.getSetsFromSessionExercise(updatedSessionExercise.id)
            const setsToCreate = sets.filter(set => !set.id);
            const setsToUpdate = sets.filter(set => new Set(setsFromSessionExercise.map(set => set.id)).has(set.id));
            const setsToDelete = setsFromSessionExercise.filter(set => !new Set(sets.map(set => set.id)).has(set.id));

            if (isNotEmptyArray(setsToCreate)) {
                await Promise.all(
                    setsToCreate.map(async (set) => {
                        const { rest_between_sets, number_of_repetitions } = set;
                        const payload = { rest_between_sets: Number(rest_between_sets), number_of_repetitions: Number(number_of_repetitions), session_exercise_id: updatedSessionExercise.id, difficulty: 0 }
                        return setModel.create(payload)
                    })
                )

            }

            if (isNotEmptyArray(setsToDelete)) {
                await Promise.all(
                    setsToDelete.map(async (set) => {
                        const { id } = set;
                        return setModel.delete(id)
                    })
                );

            }


            if (isNotEmptyArray(setsToUpdate)) {
                await Promise.all(
                    setsToUpdate.map(async (set) => {
                        const { id, rest_between_sets, number_of_repetitions, difficulty } = set;
                        const payload = { rest_between_sets: Number(rest_between_sets), number_of_repetitions: Number(number_of_repetitions), difficulty }
                        return setModel.update(id, payload)
                    })
                );
            }
        }
        return this.getOneWithExerciseAndSets(updatedSessionExercise.id)
    },
    async delete(id: number) {
        //CASCADE DELETE FOR SET SEEMS TO NOT WORK
        await prisma.set.deleteMany({
            where: { session_exercise_id: id },
        });

        const deletedSessionExercise = await prisma.sessionExercise.delete({ where: { id } })

        return deletedSessionExercise
    }
}
