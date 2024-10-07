import { gql } from '@apollo/client';

// Querie para obtener todos los usuarios
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      phone
      role
    }
  }
`;

// Querie para obtener todos los movimientos
export const GET_MOVEMENTS = gql`
  query GetMovements {
    movements {
        id
        concept
        amount
        date
        user {
          id
          name
          email
      }
    }
  }
`