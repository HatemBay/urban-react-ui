import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Home } from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./layouts/Navbar";
import { Profile } from "./pages/profile/Profile";
import { NotFound } from "./pages/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import SignUp from "./pages/Signup";
import { getToken, getUserInfo } from "./utils/authUtils";
import CreatePost from "./pages/createPost/CreatePost";
import { useEffect } from "react";

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

export const App = () => {
  const { userToken } =
    useSelector((state: RootState) => state.auth) || getToken();

  const isAuthenticated = userToken !== null;

  const createPrivateRoute = (
    isAuthenticated: boolean,
    //TODO: fallback path should be unauthorized but i think it's better to just redirect to home (make decision)
    fallbackPath = "/"
  ) => {
    return (
      authRoute: boolean,
      path: string,
      element: any,
      error: Response = new Response("Not found", { status: 404 })
    ) => {
      if (authRoute) {
        return {
          path,
          element: isAuthenticated ? (
            <Navigate to={fallbackPath} replace />
          ) : (
            element
          ),
          action: () => {
            if (isAuthenticated) throw error;
            return null;
          },
        };
      }
      // If the user is not logged in, redirect them to the home page
      return {
        path,
        element: isAuthenticated ? element : <Navigate to={"/"} replace />,
        action: () => {
          if (isAuthenticated) throw error;
          return null;
        },
      };
    };
  };

  const privateRoute = createPrivateRoute(isAuthenticated);

  const ForbiddenResponse = new Response("Forbidden", { status: 301 });

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
          path: "/auth/google/google-redirect",
          element: <Home />,
        },
        privateRoute(true, "/sign-in", <SignIn />, ForbiddenResponse),
        privateRoute(true, "/sign-up", <SignUp />, ForbiddenResponse),
        privateRoute(false, "/create-post", <CreatePost />, ForbiddenResponse),
        privateRoute(false, "/profile", <Profile />, ForbiddenResponse),
        // {
        //   path: "/profile",
        //   element: <Profile />,
        // },
      ],
    },
    {
      path: "*" || "/not-found",
      element: <NotFound />,
    },
  ]);
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};
