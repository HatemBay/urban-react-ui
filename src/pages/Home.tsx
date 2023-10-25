import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { gql, useQuery } from "urql";
import { Posts } from "../components/posts/Posts";
import WithSubnavigation from "../components/Header/Header";

const Users = gql`
  query {
    users {
      id
      username
    }
  }
`;

export const Home = () => {
  const BgColor = useColorModeValue("gray.800", "gray.50");

  const theme = extendTheme({
    colors: {
      primary: "gray.900",
      secondary: "gray.300",
    },
    fonts: {
      body: "Montserrat",
      heading: "Montserrat",
    },
  });

  const [{ data, fetching, error }] = useQuery({
    query: Users,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <ChakraProvider theme={theme}>
      <WithSubnavigation />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} bg={"gray.50"}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Posts></Posts>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
