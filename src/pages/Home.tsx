import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import { VStack, useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "urql";
import Layer from "../layouts/Layer";
import { Posts } from "./postFeed/Posts";
import { USERS_QUERY } from "../graphql/queries/usersQuery";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";

// TODO: get number of total posts
const posts = Math.random();

export const Home = () => {
  const BgColor = useColorModeValue("gray.100", "gray.700");

  // TODO: remove
  const [{ data, fetching, error }] = useQuery({
    query: USERS_QUERY,
  });

  let mt = {};
  if (posts === 1) {
    mt = { base: 0, md: -40 };
  }

  // console.log("token");
  // console.log(token);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const callBackendApi = async () => {
    try {
      const code = searchParams.get("code");
      // const token = searchParams.get("token");
      // const token = searchParams.get("token");

      // console.log("YA 3aMMMI AAAAAAAAAAAAAAAAAAAA PSWEYYYYYYY");

      console.log(location.pathname);
      console.log("code");
      console.log(code);
      const url = `http://localhost:3001/auth/google/google-redirect?code=${code}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(
          "********************************* ERROR **************************************"
        );

        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // const status = response.status;
      // console.log("Data from backend:", data);
      // console.log("MESSAGE:", data.message);
      // console.log("ACCESS TOKEN:", data.user.accessToken);
      // console.log("USER:", data.user.user);
      // console.log("STAAAAAAAAAAAAAT:", status);

      return data;

      // Do something with the data, like updating state in your React component
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors, show a message, or redirect the user to an error page
    }
  };

  useEffect(() => {
    callBackendApi();
  }, []);

  // if (code) {
  //   // navigate(`auth/email-confirmation/confirm`);
  //   fetch("http://localhost:3001/auth/email-confirmation/confirm", {

  //   })
  // }

  // TODO: return to this part when cloud registration is done

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <>
      <VStack spacing={8} mt={mt} bg={BgColor}>
        {/* <p>{window.location.href}</p> */}
        {/* {isInvalidData && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription fontSize={"sm"}>
              Incorrect email or password
            </AlertDescription>
          </Alert>
        )} */}
        <Posts />
      </VStack>
    </>
  );
};
