<<<<<<< HEAD
import { gql } from "urql";

export const CREATE_POST_MUTATION = gql`
  mutation createPost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
      author {
        username
      }
      authorId
      titleArabic
      titleLatin
      contentArabic
      contentEnglish
      contentFrench
      published
      isU18
      likesCount
      dislikesCount
      createdAt
      updatedAt
    }
  }
`;
=======
import { gql } from "urql";

export const CREATE_POST_MUTATION = gql`
  mutation createPost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
      author {
        username
      }
      authorId
      titleArabic
      titleLatin
      contentArabic
      contentEnglish
      contentFrench
      published
      isU18
      likesCount
      dislikesCount
      createdAt
      updatedAt
    }
  }
`;
>>>>>>> 846f6cb141ed49dc7a2547f910356b8ffe19a2b7
