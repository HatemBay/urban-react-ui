import { Box, Button, Heading, Select, VStack } from "@chakra-ui/react";
import React from "react";
import PostItem from "./PostItem";
import { useQuery } from "urql";
import { PaginatedPosts } from "../../data/types";
import PageNavigator from "./PageNavigator";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import useLightDark from "../../hooks/useLightDark";
import { SHARED_COLORS } from "../../data/constants";
import { POSTS_QUERY } from "../../graphql/queries/postsQuery";

type Props = {};

export const Posts = (props: Props) => {
  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const TextColor = useLightDark(SHARED_COLORS.TextColor);

  const [field, setOrderByField] = React.useState("createdAt");
  let [take, setTake] = React.useState(5);

  const { currPage: page } = useSelector((state: RootState) => state.page);
  let { filter } = useSelector((state: RootState) => state.page);
  let { randomize } = useSelector((state: RootState) => state.page);
  let { rerender } = useSelector((state: RootState) => state.page);

  const filterActions: { [key: string]: () => void } = {
    "#": () => {
      // TODO: go to page displaying links for words that contain special filters
      console.log("under construction");
    },
    new: () => {
      filter = "";
    },
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
  const options = [3, 5, 10];

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
      randomize,
      //rerender is a fake value used to bypass the cache when needed and trigger the query
      rerender,
    },
  });

  const { data, fetching, error } = result;
  console.log("erorrrrr");
  console.log(error);

  const handleRandomPosts = () => {
    reexecuteQuery({ requestPolicy: "network-only" });
    return window.scrollTo(0, 0);
  };

  console.log("data?.posts");
  console.log(data?.posts);

  if (error) return <p> Something went wrong... {error.name} </p>;
  if (fetching || !data) return <p>Loading...</p>;
  return (
    <Box
      color={TextColor}
      // minW={{ base: "10rem", sm: "60%", md: "60%" }}
      maxW={"100%"}
    >
      <Heading textTransform="capitalize" mb={4}>
        {data.posts.pagination !== undefined &&
          data.posts.pagination.totalCount === 0 &&
          "No "}{" "}
        posts
      </Heading>
      {/* <Button onClick={changeField}>Change</Button> */}

      {data.posts.pagination?.totalCount !== 0 && (
        <VStack
          minH={"xl"}
          minW={{ base: "10rem", sm: "100%", md: "100%" }}
          maxW={"100%"}
          spacing={4}
        >
          {!randomize && (
            <Select
              onChange={changeTake}
              value={take}
              // width={"50%"}
              bg={PrimaryBgColor}
              maxWidth="2xl"
              w={{ base: "80%", md: "100%" }}
              _hover={{ cursor: "pointer" }}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          )}
          {/* ********************************************* */}
          {/* TODO: check with undefined and length */}
          {/* ********************************************* */}
          {data.posts.data &&
            data.posts.data.map((post) => (
              <PostItem key={post.id} post={post}></PostItem>
            ))}
          {!randomize && (
            <PageNavigator
              take={take}
              totalCount={data.posts.pagination.totalCount}
            />
          )}
          {randomize && (
            <Button onClick={handleRandomPosts}>More random definitions</Button>
          )}
        </VStack>
      )}
    </Box>
  );
};
