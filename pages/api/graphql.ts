import { ApolloServer } from 'apollo-server-micro';
import { schema } from '@/graphql/schema';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

let apolloServer: ApolloServer | null = null;

export const config = {
  api: {
    bodyParser: false,
  },
};

const getApolloServer = async () => {
  if (!apolloServer) {
    apolloServer = new ApolloServer({
      schema,
      context: () => ({ prisma }),
    });
    await apolloServer.start();
  }
  return apolloServer;
};

// Manejador de solicitudes GraphQL
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const server = await getApolloServer();
    return server.createHandler({ path: '/api/graphql' })(req, res);
  } catch (error) {
    console.error('Error handling the request', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
