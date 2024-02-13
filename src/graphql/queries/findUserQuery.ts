import { gql } from "urql";

export const FIND_USER_QUERY = gql`
  query User($findUserInput: FindUserInput!) {
    user(findUserInput: $findUserInput) {
      id
      username
      email
      profilePicture
      gender
      accountLanguage
      emailVerified
      name
      isU18
      countryId
      googleProfile
    }
  }
`;
