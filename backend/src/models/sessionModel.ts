import prisma from "../../prisma/client";

const sessionModel = {

  async findUnique(id: number) {
    return prisma.session.findUnique({
      where: { id },
    });
  },

};

export default sessionModel;
