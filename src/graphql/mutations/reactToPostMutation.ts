import { gql } from "urql";

export const LIKE_POST_MUTATION = gql`
  mutation LikePost($findPostInput: FindPostInput!) {
    likePost(findPostInput: $findPostInput) {
      id
      authorId
      titleArabic
      likedBy {
        id
        username
      }
      dislikedBy {
        id
        username
      }
      likesCount
      dislikesCount
    }
  }
`;

export const UNLIKE_POST_MUTATION = gql`
  mutation UnlikePost($findPostInput: FindPostInput!) {
    unlikePost(findPostInput: $findPostInput) {
      id
      authorId
      titleArabic
      likedBy {
        id
        username
      }
      dislikedBy {
        id
        username
      }
      likesCount
      dislikesCount
    }
  }
`;

export const DISLIKE_POST_MUTATION = gql`
  mutation DislikePost($findPostInput: FindPostInput!) {
    dislikePost(findPostInput: $findPostInput) {
      id
      authorId
      titleArabic
      likedBy {
        id
        username
      }
      dislikedBy {
        id
        username
      }
      likesCount
      dislikesCount
    }
  }
`;

export const UNDISLIKE_POST_MUTATION = gql`
  mutation UndislikePost($findPostInput: FindPostInput!) {
    undislikePost(findPostInput: $findPostInput) {
      id
      authorId
      titleArabic
      likedBy {
        id
        username
      }
      dislikedBy {
        id
        username
      }
      likesCount
      dislikesCount
    }
  }
`;
