import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  Select,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import useLightDark from "../../hooks/useLightDark";
import { DIALECT_ITEMS, SHARED_COLORS } from "../../data/constants";
import { getUserInfo } from "../../utils/authUtils";
import { useFormik } from "formik";
import DynamicStickyIndex from "./DynamicStickyIndex";
import { UserInfo } from "../../data/types";

type Props = {};

export const Settings = (props: Props) => {
  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const TextColor = useLightDark(SHARED_COLORS.TextColor);
  const userInfo: UserInfo = getUserInfo();
  console.log("userInfo: " + JSON.stringify(userInfo));

  //TODO: change with country from user data
  let [country, setCountry] = useState("");

  // const [ip, setIP] = useState("");

  // const getData = async () => {
  //   const res = await axios.get("https://api.ipify.org/?format=json");
  //   console.log(res.data);
  //   setIP(res.data.ip);
  // };

  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  // }, []);

  const passwordReset = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const changeCountry = (e: any) => {
    setCountry(e.target.value);
  };

  console.log("picture:");
  console.log(userInfo.googleProfile?.picture);

  return (
    <Grid
      templateColumns="repeat(8, 1fr)"
      id="index"
      gap={4}
      mb={5}
      minH={"300vh"}
      maxW={"100%"}
      p={4}
    >
      <GridItem colSpan={2} textColor={TextColor}>
        <DynamicStickyIndex bg={PrimaryBgColor} />
      </GridItem>
      <GridItem colSpan={6} textColor={TextColor}>
        <HStack spacing={5} mb={4}>
          <Heading
            minW={"fit-content"}
            fontWeight={"medium"}
            textAlign={"left"}
          >
            Your Profile
          </Heading>
          <Divider
          // borderColor={TextColor}
          ></Divider>
        </HStack>

        <HStack
          divider={<StackDivider borderColor="gray.700" />}
          bg={PrimaryBgColor}
          // maxW={"100%"}
          minH={"33vh"}
          spacing={4}
          borderRadius={"lg"}
          shadow={"2xl"}
          align={"flex-start"}
          mb={4}
        >
          <VStack p={4} minW={"25vw"} spacing={4} alignSelf={"center"}>
            <Avatar
              name={userInfo.username}
              src={userInfo.googleProfile?.picture}
              bg={"teal.500"}
              // src="https://bit.ly/dan-abramov"
              // w={"4em"}
              // h={"4em"}
              size={"2xl"}
              // boxSize={"10em"}
              fontWeight={"normal"}
              __css={{ color: "red" }}
              // fontSize={"10em"}
            ></Avatar>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {userInfo.username}
            </Text>
          </VStack>
          <VStack align={"flex-start"} spacing={5} p={4} minW={"60%"}>
            <VStack alignItems={"flex-start"}>
              <Text> User Info </Text>
              <HStack spacing={5}>
                <HStack>
                  <Text>Gender: </Text>
                  <Text fontWeight={"bold"}> Male </Text>
                </HStack>
                <HStack>
                  <Text>Date of Birth: </Text>
                  <Text fontWeight={"bold"}> 20/05/1997 </Text>
                </HStack>
              </HStack>
            </VStack>
            <VStack alignItems={"flex-start"}>
              <Text> User Settings </Text>
              <HStack spacing={5}>
                <HStack>
                  <Text>Language: </Text>
                  <Text fontWeight={"bold"}> English </Text>
                </HStack>
                <HStack>
                  <Text>Country: </Text>
                  <Select
                    onChange={changeCountry}
                    value={country}
                    bg={PrimaryBgColor}
                    maxWidth="2xl"
                    w={{ base: "80%", md: "100%" }}
                    _hover={{ cursor: "pointer" }}
                  >
                    {DIALECT_ITEMS.map((item) => (
                      <option key={item.label} value={item.dialect}>
                        <HStack>
                          {item.flag}
                          <Text>{item.dialect}</Text>
                        </HStack>
                      </option>
                    ))}
                  </Select>
                </HStack>
              </HStack>
            </VStack>
          </VStack>
        </HStack>

        <HStack spacing={5} mb={4} mt={6}>
          <Heading
            minW={"fit-content"}
            fontWeight={"medium"}
            textAlign={"left"}
          >
            Password Reset
          </Heading>
          <Divider
          // borderColor={TextColor}
          ></Divider>
        </HStack>
        <VStack
          bg={PrimaryBgColor}
          maxW={"100%"}
          minH={"33vh"}
          spacing={4}
          borderRadius={"lg"}
          shadow={"2xl"}
          align={"flex-start"}
          mb={4}
          p={5}
          pl={10}
        >
          <form onSubmit={passwordReset.handleSubmit}>
            <VStack spacing={4} align={"flex-start"} w={"xl"}>
              <FormControl>
                <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  variant="filled"
                  onChange={passwordReset.handleChange}
                  value={passwordReset.values.oldPassword}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="newPassword">New Password</FormLabel>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  variant="filled"
                  onChange={passwordReset.handleChange}
                  value={passwordReset.values.newPassword}
                />
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" w={"xs"}>
                Reset
              </Button>
            </VStack>
          </form>
        </VStack>
      </GridItem>
    </Grid>
  );
};
