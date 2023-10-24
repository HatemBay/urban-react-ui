import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import PostItem from "./PostItem";

type Props = {};

export const Posts = (props: Props) => {
  return (
    <Box w="100%">
      <Heading textTransform="capitalize">posts</Heading>

      <VStack spacing={4}>
        <PostItem
          post={{
            title: "title",
            content: "lorem ipsum dolor",
            likes_count: 5,
            dislikes_count: 0,
            created_at: "2024-10-19T16:26:10.174Z",
          }}
        ></PostItem>
        <PostItem
          post={{
            title: "title",
            content: "lorem ipsum dolor",
            likes_count: 5,
            dislikes_count: 0,
            created_at: "2024-10-19T16:26:10.174Z",
          }}
        ></PostItem>
        <PostItem
          post={{
            title: "title",
            content: "lorem ipsum dolor",
            likes_count: 5,
            dislikes_count: 0,
            created_at: "2024-10-19T16:26:10.174Z",
          }}
        ></PostItem>
      </VStack>
    </Box>
  );
};
