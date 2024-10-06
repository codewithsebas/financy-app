import { PrismaClient, User as PrismaUser, Movements as PrismaMovements } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async (_parent: unknown, _args: unknown, context: { prisma: PrismaClient }): Promise<PrismaUser[]> => {
      return await context.prisma.user.findMany({
        include: { movements: true },
      });
    },
    movements: async (_parent: unknown, _args: unknown, context: { prisma: PrismaClient }): Promise<PrismaMovements[]> => {
      return await context.prisma.movements.findMany({
        include: { user: true },
      });
    },    
  },
  Mutation: {
    updateUser: async (_parent: unknown, { id, name, role }: { id: string; name: string; role: string }, context: { prisma: PrismaClient }): Promise<PrismaUser> => {
      return await context.prisma.user.update({
        where: { id: Number(id) },
        data: { name, role },
      });
    },
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

// Exportar los resolvers
export default resolvers;
