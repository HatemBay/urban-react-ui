import { gql } from "urql";

export const POSTS_QUERY = gql`
  query posts($orderBy: OrderByParams, $pagination: PaginationParams) {
    posts(orderBy: $orderBy, pagination: $pagination) {
      id
      author {
        username
      }
      authorId
      title
      content
      published
      isU18
      likesCount
      dislikesCount
      createdAt
      updatedAt
    }
  }
`;