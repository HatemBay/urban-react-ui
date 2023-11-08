import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import { VStack, useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "urql";
import Layer from "../layouts/Layer";
import { Posts } from "./postFeed/Posts";
import { USERS_QUERY } from "../graphql/queries/usersQuery";


// TODO: get number of total posts
const posts = Math.random();

export const Home = () => {
  const BgColor = useColorModeValue("gray.100", "gray.700");

  const [{ data, fetching, error }] = useQuery({
    query: USERS_QUERY,
  });

  let mt = {};
  if (posts === 1) {
    mt = { base: 0, md: -40 };
  }

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <>
      <VStack spacing={8} mt={mt} bg={BgColor}>
        <Posts />
      </VStack>
    </>
  );
};
