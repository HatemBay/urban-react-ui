import { gql } from "urql";

export const USERS_QUERY = gql`
  query {
    users {
      id
      username
    }
  }
`;
