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
`;