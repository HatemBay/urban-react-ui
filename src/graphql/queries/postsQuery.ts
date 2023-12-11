import { gql } from "urql";

export const POSTS_QUERY = gql`
query Posts($orderBy: OrderByParams, $pagination: PaginationParams, $randomize: Boolean) {
  posts(orderBy: $orderBy, pagination: $pagination, randomize: $randomize) {
    data {
      id
      author {
        username
      }
      example {
        id
        contentArabic
        contentEnglish
        contentFrench
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
    pagination {
      totalCount
    }
  }
}
`;