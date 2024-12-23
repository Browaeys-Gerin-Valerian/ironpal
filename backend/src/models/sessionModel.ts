import prisma from "../../prisma/client";
import { CreateSessionDTO } from "../utils/types/session/session";


const sessionModel = {
  async findOne(sessionId: number) {
    return prisma.session.findUnique({
      where: { id: sessionId },
    });
  },


  async findManyByUserId(userId: number, startDate: Date, endDate: Date) {
    return prisma.session.findMany({
      where: {
        user_id: userId,
        session_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        session_date: 'asc',
      },
    });
  },

  async create(data: CreateSessionDTO) {
    return prisma.session.create({
      data,
    });
  },
  async delete(sessionId: number) {
    // await prisma.set.deleteMany({
    //   where: {
    //     session_exercise: {
    //       session_id
    //     },
    //   },
    // });

    // await prisma.sessionExercise.deleteMany({
    //   where: {
    //     session_id,
    //   },
    // });

    return await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });
  },

  async count() {
    return prisma.session.count()
  },
};

export default sessionModel;