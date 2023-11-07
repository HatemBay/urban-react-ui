import { Box, Button, Colors, HStack, Heading, Select, VStack } from "@chakra-ui/react";
import React from "react";
import PostItem from "./PostItem";
import { gql, useQuery } from "urql";
import { Post } from "../../data/types";
import PageNavigator from "./PageNavigator";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import useLightDark from "../../hooks/useLightDark";
import { SHARED_COLORS } from "../../data/constants";

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
};

export const Posts = (props: Props) => {
  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const TextColor = useLightDark(SHARED_COLORS.TextColor);

  const [field, setOrderByField] = React.useState("createdAt");
  const [take, setTake] = React.useState(5);

  const { currPage: page } = useSelector((state: RootState) => state.page)
  let { filter } = useSelector((state: RootState) => state.page)

  const filterActions: { [key: string]: () => void } = {
    "#": () => {
      // TODO: go to page displaying links for words that contain special filters
      console.log("under construction");
    },
    "new": () => {
      filter = ""
    }
  };

  if (filterActions[filter]) {
    filterActions[filter]();
  }

  const changeTake = (e: any) => {
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
        filter,
        page,
        take,
      },
    },
  });

  if (error) return <p>Something went wrong...</p>;
  if (fetching || !data) return <p>Loading...</p>;
  return (
    <Box w="100%" color={TextColor}>
      <Heading textTransform="capitalize" mb={4}>
        {data.posts.length === 0 && "No "}
        posts
      </Heading>
      {/* <Button onClick={changeField}>Change</Button> */}

      {data.posts.length > 0 && <VStack spacing={4}>
        < Select
          onChange={changeTake}
          value={take}
          width={"50%"}
          bg={PrimaryBgColor}
          maxWidth="2xl"
          w="100%"
          _hover={{ background: "blue.500", color: "white", cursor: "pointer" }}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </Select>
        {data.posts.map((post) => (
          <PostItem post={post}></PostItem>
        ))}
        <PageNavigator />
      </VStack>}
    </Box >
  );
};
