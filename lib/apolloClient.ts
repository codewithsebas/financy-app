import { ApolloClient, InMemoryCache } from '@apollo/client';
// Creamos una instancia de ApolloClient, configurando la URI del servidor GraphQL
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL, // URL de la API GraphQL
  cache: new InMemoryCache(), // Cache de consultas en memoria
});

export default client;
