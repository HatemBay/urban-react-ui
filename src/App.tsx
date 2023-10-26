import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";

const theme = extendTheme({
  // colors: {
  //     primary: "gray.900",
  //     secondary: "gray.300",
  //   },
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
]);

export const App = () => (
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
