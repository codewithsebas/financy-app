// pages/api/graphql.ts
import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../graphql/schema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let apolloServer: ApolloServer;
let isServerStarted = false;

// Crear el servidor Apollo
const createServer = () => {
  if (!apolloServer) {
    apolloServer = new ApolloServer({
      schema,
      context: () => ({ prisma }),
    });
  }
  return apolloServer;
};

// Configuración de la API de Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

// Manejador de solicitudes GraphQL
const handler = async (req: any, res: any) => {
  const server = createServer();

  // Iniciar el servidor si no está ya iniciado
  if (!isServerStarted) {
    await server.start();
    isServerStarted = true; // Marcar como iniciado
  }

  return server.createHandler({ path: '/api/graphql' })(req, res);
};

export default handler;
