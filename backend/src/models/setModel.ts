import { Set } from '@prisma/client';
import prisma from '../../prisma/client';

const setModel = {
  async update(id: number, data: Partial<Set>) {
    return prisma.set.update({
      where: { id },
      data,
    });
  },
};

export default setModel;
