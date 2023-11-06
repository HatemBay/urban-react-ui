import { Box, Button, HStack, Heading, Select, VStack } from "@chakra-ui/react";
import React from "react";
import PostItem from "./PostItem";
import { gql, useQuery } from "urql";
import { Post } from "../../types";
import { colors } from "../../utils/interfaces/colors";
import PageNavigator from "./PageNavigator";
import store, { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const PostsQuery = gql`
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

type PostsQueryRes = {
  posts: Post[];
};

type Props = {
  colors: colors;
};

export const Posts = ({ colors }: Props) => {
  const [field, setOrderByField] = React.useState("createdAt");
  const [take, setTake] = React.useState(5);

  const { page } = useSelector((state: RootState) => state.page)

  const changeTake = (e: any) => {
    console.log(e.target.value);

    setTake(+e.target.value);
  };


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
      pagination: {
        page,
        take,
      },
    },
  });

  console.log(data);

  if (error) return <p>Something went wrong...</p>;
  if (fetching || !data) return <p>Loading...</p>;
  return (
    <Box w="100%" color={colors.TextColor}>
      <Heading textTransform="capitalize" mb={4}>
        posts
      </Heading>
      <Button onClick={changeField}>Change</Button>

      <VStack spacing={4}>
        <Select
          onChange={changeTake}
          value={take}
          placeholder={take.toString()}
          width={"50%"}
          bg={colors.BgColor}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </Select>
        {data.posts.map((post) => (
          <PostItem post={post}></PostItem>
        ))}
        <PageNavigator />
      </VStack>
    </Box>
  );
};
