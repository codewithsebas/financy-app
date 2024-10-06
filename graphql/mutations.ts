import { gql } from '@apollo/client';

export const ADD_MOVEMENT = gql`
    mutation AddMovement($amount: Float!, $concept: String!, $date: String!) {
        addMovement(amount: $amount, concept: $concept, date: $date) {
            id
            concept
            amount
            date
        }
    }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!, $role: String!) {
    updateUser(id: $id, name: $name, role: $role) {
      id
      name
      role
    }
  }
`;
