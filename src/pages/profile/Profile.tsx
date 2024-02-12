import { Heading, VStack, Select, Box } from "@chakra-ui/react";
import { useQuery } from "urql";
import PageNavigator from "../../components/posts/PageNavigator";
import PostItem from "../../components/posts/PostItem";
import { PaginatedPosts, UserInfo } from "../../data/types";
import { POSTS_QUERY } from "../../graphql/queries/postsQuery";
import { SHARED_COLORS } from "../../data/constants";
import useLightDark from "../../hooks/useLightDark";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getUserInfo } from "../../utils/authUtils";

type Props = {};

export const Profile = (props: Props) => {
  const userInfo: UserInfo = getUserInfo();
  console.log(userInfo.sub);

  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const TextColor = useLightDark(SHARED_COLORS.TextColor);

  const [field, setOrderByField] = React.useState("createdAt");
  let [take, setTake] = React.useState(5);

  const { currPage: page } = useSelector((state: RootState) => state.page);
  let { filter } = useSelector((state: RootState) => state.page);
  let { randomize } = useSelector((state: RootState) => state.page);

  const changeTake = (e: any) => {
    setTake(+e.target.value);
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
      authorId: userInfo.sub,
    },
  });
  const { data, fetching, error } = result;

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
          {/* ********************************************* */}
          {/* TODO: check with undefined and length */}
          {/* ********************************************* */}
          {data.posts.data &&
            data.posts.data.map((post) => (
              <PostItem key={post.id} post={post}></PostItem>
            ))}
          <PageNavigator
            take={take}
            totalCount={data.posts.pagination.totalCount}
          />
        </VStack>
      )}
    </Box>
  );
};
