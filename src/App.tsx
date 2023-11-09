import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./layouts/Navbar";
import CreatePost from "./pages/postFeed/CreatePost";
import { Profile } from "./pages/profile/Profile";

const theme = extendTheme({
  fonts: {
    body: "Montserrat",
    heading: "Montserrat",
  },
  colors: {
    primary: {
      light: "gray.300",
      dark: "gray.600",
    },
    secondary: {
      light: "gray.100",
      dark: "gray.700",
    },
    text: {
      light: "gray.800",
      dark: "white",
    },
  },
});

// TODO: implement lazy loading for conditional pages if necessary
const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/create-post",
        element: <CreatePost />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: (<h1>Not found (Replcae me with a page)</h1>),
  },
]);

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};
