import { gql } from "urql";

export const POSTS_QUERY = gql`
query Posts($orderBy: OrderByParams, $pagination: PaginationParams, $randomize: Boolean) {
  posts(orderBy: $orderBy, pagination: $pagination, randomize: $randomize) {
    data {
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
    pagination {
      totalCount
    }
  }
}
`;