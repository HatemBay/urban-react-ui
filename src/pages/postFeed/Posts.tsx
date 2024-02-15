import { Box, Button, Heading, Select, VStack } from "@chakra-ui/react";
import PostItem from "../../components/posts/PostItem";
import { Post, User } from "../../data/types";
import PageNavigator from "../../components/posts/PageNavigator";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import useLightDark from "../../hooks/useLightDark";
import { SHARED_COLORS } from "../../data/constants";
import { useOutletContext } from "react-router-dom";

type Props = {};

export const Posts = (props: Props) => {
  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const TextColor = useLightDark(SHARED_COLORS.TextColor);
  let { randomize } = useSelector((state: RootState) => state.page);
  let { filter } = useSelector((state: RootState) => state.page);

  // TODO: set hooks instead of context
  const { PostsQueryResult, setOrderByField, take, setTake, handleRandomize } =
    useOutletContext<any>();

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
  const options = [2, 5, 10];

  let { data, fetching, error } = PostsQueryResult;
  console.log("erorrrrr");
  console.log(error);

  const handleRandomPosts = () => {
    handleRandomize();

    return window.scrollTo(0, 0);
  };

  console.log("data?.posts");
  console.log(data?.posts);

  if (error) return <p> Something went wrong... {error.name} </p>;
  if (fetching || !data) return <p>Loading...</p>;
  return (
    <Box color={TextColor} maxW={"100%"}>
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
          {data.posts.data &&
            data.posts.data.map((post: Post) => (
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
