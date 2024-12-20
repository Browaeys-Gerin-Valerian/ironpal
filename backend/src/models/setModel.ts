import { Set } from '@prisma/client';
import prisma from '../../prisma/client';
import { CreateSetDTO, UpdateSetDTO } from '../utils/types/set/set';

const setModel = {
  async findManyBySessionExerciseId(sessionExerciseId: number) {
    return prisma.set.findMany({
      where: { session_exercise_id: sessionExerciseId }
    })
  },
  async create(data: CreateSetDTO) {
    return prisma.set.create({
      data
    })
  },
  async update(id: number, data: UpdateSetDTO) {
    return prisma.set.update({
      where: { id },
      data,
    });
  },
  async delete(id: number) {
    return prisma.set.delete({
      where: { id }
    })
  }
};

export default setModel;

