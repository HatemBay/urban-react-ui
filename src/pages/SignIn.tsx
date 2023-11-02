import React from "react";
import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Box,
  Avatar,
  Checkbox,
  Flex,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { BiDotsHorizontal } from "react-icons/bi";
import { gql, useMutation } from "urql";
import { signal } from "@preact/signals-react";

const LOGIN_MUTATION = gql`
  mutation login($loginUserInput: LoginUserInput!) {
    login(LoginUserInput: $loginUserInput) {
      accessToken
      user {
        id
        username
        email
        password
        name
        role
        isU18
        emailVerified
        createdAt
        updatedAt
        googleId
        googleProfile
      }
    }
  }
`;

type Props = {};

const SignIn = (props: Props) => {
  const [email, setEmail] = React.useState("");
  // const email = signal("");
  const [password, setPassword] = React.useState("");
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const [state, executeMutation] = useMutation(LOGIN_MUTATION);

  const handleSubmit = () => {
    const loginUserInput = {
      username: email,
      password: password,
    };

    executeMutation({ loginUserInput }).then((res) => {
      if (res.error) {
        // TODO: improve error handling
        console.error("Oh no!", res.error);
      } else {
        const { accessToken } = res.data.login;
        console.log(res);

        // TODO: improve
        localStorage.setItem("TOKEN_KEY", accessToken);
      }
    });
  };

  return (
    <>
      <Container p={0}>
        <VStack bg={"white"} spacing={8} textAlign="center" fontSize="xl">
          <Box width={"100%"} bg={"blue"} py={5}>
            <Heading color={"white"}>Sign In</Heading>
          </Box>
          <VStack width={"100%"} px={4} pb={8}>
            <Avatar size={"2xl"} rounded={"3xl"}></Avatar>
            <FormControl p={3} pt={8}>
              <VStack gap={5}>
                <InputGroup>
                  <InputLeftElement>
                    <EmailIcon></EmailIcon>
                  </InputLeftElement>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Email"
                  ></Input>
                </InputGroup>
                <InputGroup>
                  <InputLeftElement>
                    <BiDotsHorizontal></BiDotsHorizontal>
                  </InputLeftElement>
                  <Input
                    id="password"
                    type="password"
                    pr={5}
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                  ></Input>
                </InputGroup>
                <Flex
                  mt={2}
                  width={"100%"}
                  alignItems="center"
                  minWidth="max-content"
                  direction={"row"}
                >
                  <Checkbox _hover={{ color: "blue.400" }}>
                    Remember me{" "}
                  </Checkbox>
                  <Spacer />
                  <Link
                    href="#"
                    color={"blue"}
                    fontSize={"sm"}
                    _hover={{ color: "blue.400" }}
                  >
                    Forgot password?
                  </Link>
                </Flex>
                <Button
                  colorScheme="blue"
                  size={"lg"}
                  role="submit"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </VStack>
            </FormControl>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};

export default SignIn;
