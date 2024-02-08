<<<<<<< HEAD
import { gql } from "urql";

export const LOGIN_MUTATION = gql`
  mutation login($loginUserInput: LoginUserInput!) {
    login(LoginUserInput: $loginUserInput) {
      accessToken
      user {
        id
        username
        email
        password
        name
        role
        isU18
        emailVerified
        createdAt
        updatedAt
        googleId
        googleProfile
      }
    }
  }
=======
import { gql } from "urql";

export const LOGIN_MUTATION = gql`
  mutation login($loginUserInput: LoginUserInput!) {
    login(LoginUserInput: $loginUserInput) {
      accessToken
      user {
        id
        username
        email
        password
        name
        role
        isU18
        emailVerified
        createdAt
        updatedAt
        googleId
        googleProfile
      }
    }
  }
>>>>>>> 846f6cb141ed49dc7a2547f910356b8ffe19a2b7
`;