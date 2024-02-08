<<<<<<< HEAD
import { gql } from "urql";

export const CREATE_EXAMPLE_MUTATION = gql`
  mutation Mutation($createExampleInput: CreateExampleInput!) {
    createExample(createExampleInput: $createExampleInput) {
      id
      contentArabic
      contentEnglish
      contentFrench
      postId
      createdAt
      updatedAt
    }
  }
`;
=======
import { gql } from "urql";

export const CREATE_EXAMPLE_MUTATION = gql`
  mutation Mutation($createExampleInput: CreateExampleInput!) {
    createExample(createExampleInput: $createExampleInput) {
      id
      contentArabic
      contentEnglish
      contentFrench
      postId
      createdAt
      updatedAt
    }
  }
`;
>>>>>>> 846f6cb141ed49dc7a2547f910356b8ffe19a2b7
