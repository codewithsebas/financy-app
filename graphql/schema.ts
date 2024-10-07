import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'apollo-server-micro';
import resolvers from './resolvers/resolver';

// Esquema GraphQL
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    role: String!
    movements: [Movements!]!
  }

  type Movements {
    id: ID!
    concept: String!
    amount: Float!
    date: String!
    user: User
  }

  type Query {
    users: [User!]!
    movements: [Movements!]!
  }

  type Mutation {
    updateUser(id: ID!, name: String!, role: String!): User!
    addMovement(concept: String!, amount: Float!, date: String!, userId: ID): Movements!
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
