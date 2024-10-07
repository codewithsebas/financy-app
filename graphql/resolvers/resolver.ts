import { PrismaClient, User as PrismaUser, Movements as PrismaMovements } from '@prisma/client';

const resolvers = {
  // Resolve para la querie de GET_USERS
  Query: {
    users: async (_parent: unknown, _args: unknown, context: { prisma: PrismaClient }): Promise<PrismaUser[]> => {
      return await context.prisma.user.findMany({
        include: { movements: true },
      });
    },
    // Resolve para la querie de GET_MOVEMENTS
    movements: async (_parent: unknown, _args: unknown, context: { prisma: PrismaClient }): Promise<PrismaMovements[]> => {
      return await context.prisma.movements.findMany({
        include: { user: true },
      });
    },    
  },
  // Resolve para la mutation de UPDATE_USER
  Mutation: {
    updateUser: async (_parent: unknown, { id, name, role }: { id: string; name: string; role: string }, context: { prisma: PrismaClient }): Promise<PrismaUser> => {
      return await context.prisma.user.update({
        where: { id: Number(id) },
        data: { name, role },
      });
    },
    // Resolve para la mutation de ADD_MOVEMENT
    addMovement: async (_parent: unknown, { concept, amount, date, userId }: { concept: string; amount: number; date: string; userId?: number }, context: { prisma: PrismaClient }): Promise<PrismaMovements> => {
      return await context.prisma.movements.create({
          data: {
              concept,
              amount,
              date,
              userId,
          },
      });
    },
  },
};

export default resolvers;
