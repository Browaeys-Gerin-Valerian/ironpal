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

};

export default sessionModel;
