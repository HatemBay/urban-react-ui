import { Box, Heading, VStack, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import PostItem from "./PostItem";
import { gql, useQuery } from "urql";
import { Post } from "../../types";

const PostsQuery = gql`
  query posts($orderBy: OrderByParams) {
    posts(orderBy: $orderBy) {
      id
      author {
        username
      }
      author_id
      title
      content
      published
      is_u_18
      likes_count
      dislikes_count
      created_at
      updated_at
    }
  }
`;

type PostsQueryRes = {
  posts: Post[];
};

type Props = {};

export const Posts = (props: Props) => {
  const [field, setOrderByField] = useState("created_at");

  const BgColor = useColorModeValue("gray.800", "white");

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
    <Box w="100%" color={BgColor}>
      <Heading textTransform="capitalize">posts</Heading>

      <VStack spacing={4}>
        {data.posts.map((post) => (
          <PostItem post={post}></PostItem>
        ))}
      </VStack>
    </Box>
  );
};
