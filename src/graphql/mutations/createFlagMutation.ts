import { gql } from "urql";

export const CREATE_FLAG_MUTATION = gql`
  mutation CreateFlag($createFlagInput: CreateFlagInput!) {
    createFlag(createFlagInput: $createFlagInput) {
      id
      reason
      content
      postId
      createdAt
    }
  }
`;
