import { Set } from '@prisma/client';
import prisma from '../../prisma/client';
import { CreateSetDTO, UpdateSetDTO } from '../utils/types/set/set';

const setModel = {
  async findManyBySessionExerciseId(sessionExerciseId: number) {
    return prisma.set.findMany({
      where: { session_exercise_id: sessionExerciseId },
      orderBy: { id: 'asc' }
    })
  },
  async create(data: CreateSetDTO) {
    return prisma.set.create({
      data
    })
  },
  async update(sessionExerciseId: number, data: UpdateSetDTO) {
    return prisma.set.update({
      where: { id: sessionExerciseId },
      data,
    });
  },
  async delete(sessionExerciseId: number) {
    return prisma.set.delete({
      where: { id: sessionExerciseId }
    })
  }
};

export default setModel;

