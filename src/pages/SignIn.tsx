import {
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
  HStack,
  Divider,
  Text,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { BiDotsHorizontal } from "react-icons/bi";
import { useMutation } from "urql";
import useLightDark from "../hooks/useLightDark";
import { SHARED_COLORS } from "../data/constants";
import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../graphql/mutations/loginMutation";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInfoAsync,
  setUserTokenAsync,
} from "../redux/reducers/authSlice";
import { getUserInfo, setAuthTokens } from "../utils/authUtils";
import { LoginUserInput } from "../data/types";
import { AppDispatch, RootState } from "../redux/store";

type Props = {};

const SignIn = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isInvalidData, setIsInvalidData] = useState(false);

  const ButtonPrimary = useLightDark(SHARED_COLORS.ButtonPrimary);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [, signIn] = useMutation(LOGIN_MUTATION);

  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const navigate = useNavigate();

  const { userToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]);

  const handleEmail = (e: any) => {
    setEmail(e.target.value);

    setIsEmailError(!emailRegex.test(email));
  };
  const checkPassword = (e: any) => {
    setIsPasswordError(password === "");
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") handleSubmit();
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    const loginUserInput: LoginUserInput = {
      username: email,
      password: password,
    };

    const res = await signIn({ loginUserInput });

    if (res.error) {
      setIsInvalidData(true);
      setPassword("");
      return;
    }
    const { accessToken } = res.data.login;
    console.log("AccessToken");
    console.log(accessToken);
    

    return setTimeout(async () => {
      await setAuthTokens(accessToken);
      await dispatch(setUserTokenAsync(accessToken) as any);
      await dispatch(setUserInfoAsync(getUserInfo()) as any);
    });

    // window.location.reload();  
    // return redirect("/");
  };

  const handleGoogleSignup = async () => {
    window.location.href = "http://localhost:3001/auth";
  };

  return (
    <>
      <Container p={0}>
        <VStack
          bg={PrimaryBgColor}
          spacing={8}
          textAlign="center"
          fontSize="xl"
          borderRadius={"lg"}
        >
          <Box width={"100%"} bg={ButtonPrimary} py={5} borderTopRadius={"lg"}>
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

                {isInvalidData && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription fontSize={"sm"}>
                      Incorrect email or password
                    </AlertDescription>
                  </Alert>
                )}

                <InputGroup>
                  <Input
                    type="button"
                    role="submit"
                    pr={5}
                    value={"Login"}
                    size={"lg"}
                    fontWeight={"bold"}
                    background={ButtonPrimary}
                    _hover={{ background: "blue.400", cursor: "pointer" }}
                    onClick={handleSubmit}
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
                    color={ButtonPrimary}
                    fontSize={"sm"}
                    _hover={{ color: "blue.400" }}
                  >
                    Forgot password?
                  </Link>
                </Flex>
                <HStack width={"100%"} alignSelf={"flex-start"}>
                  <Divider></Divider>
                  <Text>Or</Text>
                  <Divider></Divider>
                </HStack>
                <Input
                  type="button"
                  role="submit"
                  pr={5}
                  value={"Sign in with google"}
                  size={"lg"}
                  fontWeight={"bold"}
                  // background={ButtonPrimary}
                  _hover={{ background: "blue.400", cursor: "pointer" }}
                  onClick={handleGoogleSignup}
                ></Input>
              </VStack>
            </FormControl>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};

export default SignIn;
