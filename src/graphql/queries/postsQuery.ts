import { gql } from "urql";

export const POSTS_QUERY = gql`
  query Posts(
    $orderBy: OrderByParams
    $pagination: PaginationParams
    $authorId: Int
    $randomize: Boolean
  ) {
    posts(
      orderBy: $orderBy
      pagination: $pagination
      authorId: $authorId
      randomize: $randomize
    ) {
      data {
        id
        author {
          username
          profilePicture
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
        likedBy {
          id
          username
        }
        dislikedBy {
          id
          username
        }
      }
      pagination {
        totalCount
      }
    }
  }
`;
