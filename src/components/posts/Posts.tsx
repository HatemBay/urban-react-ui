import { Box, Heading, VStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
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

type Props = {};

export const Posts = (props: Props) => {
  const [field, setOrderByField] = React.useState("createdAt");

  const changeField = (field: string) => {
    setOrderByField(() => field);
  };

  const BgColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("white", "gray.800");
  console.log("slm");

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
    <Box w="100%" color={"gray.800"}>
      <Heading textTransform="capitalize" mb={4}>
        posts
      </Heading>

      <VStack spacing={4}>
        {data.posts.map((post) => (
          <PostItem post={post}></PostItem>
        ))}
      </VStack>
    </Box>
  );
};
