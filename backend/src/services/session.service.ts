import prisma from "../../prisma/client";
import { CreateSessionDTO } from "../utils/types/DTO/session";


const sessionService = {
  async findOneById(sessionId: number) {
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
    return await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });
  },

  async count() {
    return prisma.session.count()
  },
  async countByUserId(userId: number) {
    return prisma.session.count({ where: { user_id: userId } })
  },
  async countValidateByUserId(userId: number) {
    return prisma.session.count({
      where: {
        user_id: userId, session_exercises: {
          every: {
            validated: true,
          },
        },
      }
    })
  }
};

export default sessionService;