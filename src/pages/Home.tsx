import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import * as React from "react";
import { VStack, useColorModeValue } from "@chakra-ui/react";
import { gql, useQuery } from "urql";
import { Posts } from "../components/posts/Posts";
import { Link } from "react-router-dom";
import Layer from "../layouts/Layer";

const Users = gql`
  query {
    users {
      id
      username
    }
  }
`;

// TODO: get number of total posts
const posts = Math.random();

export const Home = () => {
  const BgColor = useColorModeValue("gray.300", "gray.600");
  const BgColor2 = useColorModeValue("gray.100", "gray.700");
  const TextColor = useColorModeValue("gray.800", "white");

  const [{ data, fetching, error }] = useQuery({
    query: Users,
  });

  let mt = {};
  if (posts === 1) {
    mt = { base: 0, md: -40 };
  }

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <>
      <Layer>
        <VStack spacing={8} mt={mt} bg={BgColor2}>
          <Posts colors={{ BgColor, TextColor }} />
        </VStack>
      </Layer>
    </>
  );
};
