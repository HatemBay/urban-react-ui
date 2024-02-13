import { gql } from "urql";

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $findUserInput: FindUserInput!
    $updateUserInput: UpdateUserInput!
  ) {
    updateUser(
      findUserInput: $findUserInput
      updateUserInput: $updateUserInput
    ) {
      id
      username
      email
      password
      name
      role
      isU18
      emailVerified
      gender
      accountLanguage
      createdAt
      updatedAt
      googleId
      googleProfile
      profilePicture
    }
  }
`;
