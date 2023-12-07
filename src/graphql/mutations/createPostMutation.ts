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
