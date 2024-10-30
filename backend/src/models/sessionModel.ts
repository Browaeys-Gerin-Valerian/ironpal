import prisma from "../../prisma/client";

const sessionModel = {

  async findUnique(id: number) {
    return prisma.session.findUnique({
      where: { id },
    });
  },

  async createSession(data: { title: string, session_date: Date, validated: boolean, user_id: number, muscle_group_id: number}) {
    return prisma.session.create({
      data,
    });
  },

  async findUserSessionsForMonth(userId: number, startDate: Date, endDate: Date) {
    return prisma.session.findMany({
      where: {
        user_id: userId,
        session_date: {
          // gte and lte are comparison operators used to filter results based on some conditions on specific fields.  
          // greater than or equal 
          gte: startDate,
          // less than or equal
          lte: endDate,
        },
      },
      orderBy: {
        session_date: 'asc',
      },
    });
  },

};

export default sessionModel;
