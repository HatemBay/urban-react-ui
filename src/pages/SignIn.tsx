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
  Alert,
  AlertIcon,
  AlertDescription,
  FormErrorMessage,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { BiDotsHorizontal } from "react-icons/bi";
import { gql, useMutation } from "urql";
import Layer from "../layouts/Layer";
import useLightDark from "../hooks/useLightDark";
import { SHARED_COLORS } from "../data/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../graphql/mutations/loginMutation";
import { useDispatch } from "react-redux";
import { setUserInfo, setUserToken } from "../redux/reducers/authSlice";
import { getUserInfo, setAuthTokens } from "../utils/authUtils";



type Props = {};

const SignIn = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isInvalidData, setIsInvalidData] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [signInResult, signIn] = useMutation(LOGIN_MUTATION);

  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const navigate = useNavigate();

  const handleEmail = (e: any) => {
    setEmail(e.target.value);

    setIsEmailError(!(emailRegex.test(email)))
  };
  const checkPassword = (e: any) => {
    setIsPasswordError(password === '')
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    const loginUserInput = {
      username: email,
      password: password,
    };

    // TODO: improve login 
    signIn({ loginUserInput }).then(async (res) => {
      if (res.error) {
        setIsInvalidData(true);
        setPassword('')
        return
      }
      const { accessToken } = res.data.login;



      setTimeout(() => {
        setAuthTokens(accessToken);

        dispatch(setUserToken(accessToken))
        dispatch(setUserInfo(getUserInfo()))
      })

      navigate('/')
    });
  };

  return (
    <>
      <Container p={0}>
        <VStack bg={PrimaryBgColor} spacing={8} textAlign="center" fontSize="xl">
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
                    isInvalid={isEmailError}
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Email"
                  ></Input>
                  {!isInvalidData && (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                  )}
                </InputGroup>
                <InputGroup>
                  <InputLeftElement>
                    <BiDotsHorizontal></BiDotsHorizontal>
                  </InputLeftElement>
                  <Input
                    isInvalid={isPasswordError}
                    id="password"
                    type="password"
                    pr={5}
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                    onBlur={checkPassword}
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
                {isInvalidData &&
                  (<Alert status='error'>
                    <AlertIcon />
                    <AlertDescription fontSize={"sm"}>Incorrect email or password</AlertDescription>
                  </Alert>)
                }
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
      </Container >
    </>
  );
};

export default SignIn;
