import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import PostItem from "./PostItem";
import { gql, useQuery } from "urql";
import { Post } from "../../types";
import { colors } from "../../utils/interfaces/colors";

const PostsQuery = gql`
  query posts($orderBy: OrderByParams) {
    posts(orderBy: $orderBy) {
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

type PostsQueryRes = {
  posts: Post[];
};

type Props = {
  colors: colors;
};

export const Posts = ({ colors }: Props) => {
  const [field, setOrderByField] = React.useState("createdAt");

  const changeField = (e: any) => {
    setOrderByField(() => "title");
  };

  const [{ data, fetching, error }] = useQuery<PostsQueryRes>({
    query: PostsQuery,
    variables: {
      orderBy: {
        field,
        direction: "desc",
      },
    },
  });

  if (error) return <p>Something went wrong...</p>;
  if (fetching || !data) return <p>Loading...</p>;

  return (
    <Box w="100%" color={colors.TextColor}>
      <Heading textTransform="capitalize" mb={4}>
        posts
      </Heading>
      <Button onClick={changeField}>Change</Button>

      <VStack spacing={4}>
        {data.posts.map((post) => (
          <PostItem colors={colors} post={post}></PostItem>
        ))}
      </VStack>
    </Box>
  );
};
