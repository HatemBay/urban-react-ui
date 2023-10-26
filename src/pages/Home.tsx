import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import * as React from "react";
import {
  Box,
  Text,
  VStack,
  Code,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { gql, useQuery } from "urql";
import { Posts } from "../components/posts/Posts";
import WithSubnavigation from "../layouts/Header/Header";

const Users = gql`
  query {
    users {
      id
      username
    }
  }
`;

export const Home = () => {
  const BgColor = useColorModeValue("gray.300", "gray.600");
  const BgColor2 = useColorModeValue("gray.100", "gray.700");

  const [{ data, fetching, error }] = useQuery({
    query: Users,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <>
      <WithSubnavigation />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} bg={BgColor2}>
          <ColorModeSwitcher
            color={"black"}
            bg={BgColor}
            justifySelf="flex-end"
          />
          <VStack spacing={8} bg={BgColor2}>
            <Posts />
          </VStack>
        </Grid>
      </Box>
    </>
  );
};
