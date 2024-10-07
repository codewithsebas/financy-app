import { PrismaClient } from '@prisma/client';
// Creamos una instancia de prismaClient que usaremos para interactuar con la base de datos
const prisma = new PrismaClient();
// Esto permite que la instancia de prisma este disponible en el contexto de todas las operaciones
export function createContext() {
  return { prisma };
}
