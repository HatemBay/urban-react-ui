import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import * as React from "react";
import { Box, ChakraProvider, Grid, useColorModeValue } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import SignIn from "./pages/SignIn";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Header from "./layouts/Header/Header";

const theme = extendTheme({
  fonts: {
    body: "Montserrat",
    heading: "Montserrat",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);

export const App = () => {
  const BgColor = useColorModeValue("gray.300", "gray.600");
  const BgColor2 = useColorModeValue("gray.100", "gray.700");

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} bg={BgColor2}>
          <ColorModeSwitcher
            my={1}
            color={"black"}
            bg={BgColor}
            justifySelf={{ md: "flex-end", base: "center" }}
          />
          <RouterProvider router={router} />
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
