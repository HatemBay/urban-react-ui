import { Box, Button, Heading, Select, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { useQuery } from "urql";
import { PaginatedPosts } from "../../data/types";
import PageNavigator from "./PageNavigator";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import useLightDark from "../../hooks/useLightDark";
import { SHARED_COLORS } from "../../data/constants";
import { POSTS_QUERY } from "../../graphql/queries/postsQuery"

type Props = {
};

export const Posts = (props: Props) => {
  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const TextColor = useLightDark(SHARED_COLORS.TextColor);

  const [field, setOrderByField] = React.useState("createdAt");
  let [take, setTake] = React.useState(5);

  const { currPage: page } = useSelector((state: RootState) => state.page)
  let { filter } = useSelector((state: RootState) => state.page)
  let { randomize } = useSelector((state: RootState) => state.page)

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

  const handleRandomPosts = () => {
    reexecuteQuery({ requestPolicy: 'network-only' });
    return window.scrollTo(0, 0);
  };

  const changeField = (e: any) => {
    setOrderByField(() => "title");
  };

  const [result, reexecuteQuery] = useQuery<PaginatedPosts>({
    query: POSTS_QUERY,
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
      randomize
    },
  });

  const { data, fetching, error } = result;

  if (error) return <p> Something went wrong... {error.name} </p>
  if (fetching || !data) return <p>Loading...</p>;
  return (
    <Box w="100%" color={TextColor}>
      <Heading textTransform="capitalize" mb={4}>
        {(data.posts.pagination !== undefined) && (data.posts.pagination.totalCount === 0) && "No "} posts
      </Heading>
      {/* <Button onClick={changeField}>Change</Button> */}

      {data.posts.pagination?.totalCount !== 0 && <VStack minH={"2xl"} spacing={4}>
        <Select
          onChange={changeTake}
          value={take}
          width={"50%"}
          bg={PrimaryBgColor}
          maxWidth="2xl"
          w="100%"
          _hover={{ cursor: "pointer" }}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </Select>
        {/* ********************************************* */}
        {/* TODO: check with undefined and length */}
        {/* ********************************************* */}
        {data.posts.data && data.posts.data.map((post) => (
          <PostItem key={post.id} post={post}></PostItem>
        ))}
        {!randomize && <PageNavigator take={take} totalCount={data.posts.pagination.totalCount} />}
        {randomize && <Button onClick={handleRandomPosts}>More random definitions</Button>}
      </VStack>}
    </Box >
  );
};
