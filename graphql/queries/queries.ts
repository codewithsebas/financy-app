import { gql } from '@apollo/client';

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