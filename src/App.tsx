import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import SignIn from "./pages/SignIn";
import Header from "./layouts/Header";
import Layer from "./layouts/Layer";

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
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Layer>
        <RouterProvider router={router} />
      </Layer>
    </ChakraProvider>
  );
};
