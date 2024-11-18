import prisma from "../../prisma/client";

const sessionModel = {

  async findUnique(id: number) {
    return prisma.session.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            birthdate: true
          },
        },
        muscle_group: {
          select: {
            id: true,
            name: true,
          },
        },
        SessionExercise: {
          select: {
            id: true,
            load: true,
            validated: true,
            rest_between_exercises: true,
            exercise: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
            Set: {
              select: {
                id: true,
                number_of_repetitions: true,
                difficulty: true,
                rest_between_sets: true,
                session_exercise: true,
              },
            },
          },
        },
      },
    });
  },

  async createSession(data: { title: string, session_date: Date, validated: boolean, user_id: number, muscle_group_id: number }) {
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
