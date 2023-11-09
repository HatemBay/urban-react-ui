import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./layouts/Navbar";
import CreatePost from "./pages/postFeed/CreatePost";
import { Profile } from "./pages/profile/Profile";
import { NotFound } from "./pages/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

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
  const { userToken } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = (userToken !== null);

  const createPrivateRoute = (isAuthenticated: boolean, fallbackPath = '/not-found') => {

    return (path: string, element: any, error: Response = new Response("Not found", { status: 404 })) => {
      return {
        path,
        element: isAuthenticated ? <Navigate to={fallbackPath} replace /> : element,
        action: () => {
          if (isAuthenticated) throw error
          return null
        }
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
        privateRoute('/sign-in', < SignIn />, ForbiddenResponse),
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
