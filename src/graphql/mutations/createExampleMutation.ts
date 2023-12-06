import { gql } from "urql";

export const CREATE_EXAMPLE_MUTATION = gql`
  mutation Mutation($createExampleInput: CreateExampleInput!) {
    createExample(createExampleInput: $createExampleInput) {
      id
      content
      postId
      createdAt
      updatedAt
    }
  }
`;
