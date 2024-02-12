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
import { useRef, useState } from "react";
import useLightDark from "../../hooks/useLightDark";
import {
  DIALECT_ITEMS,
  GENDER_OPTIONS,
  SHARED_COLORS,
} from "../../data/constants";
import { getUserInfo } from "../../utils/authUtils";
import { useFormik } from "formik";
import DynamicStickyIndex from "./DynamicStickyIndex";
import { User, UserInfo } from "../../data/types";

type Props = {};

export const Settings = (props: Props) => {
  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const TextColor = useLightDark(SHARED_COLORS.TextColor);
  const userInfo: UserInfo = getUserInfo();
  console.log("userInfo: " + JSON.stringify(userInfo));
  console.log(userInfo);

  //TODO: change with country from user data
  let [user, setUser] = useState<User>(userInfo);
  let [country, setCountry] = useState("");
  let [image, setImage] = useState("");
  const profilePictureChangeRef = useRef<any>();

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

  const updateUserInfo = useFormik({
    initialValues: {
      profilePicture: user.profilePicture || user.googleProfile?.picture,
      gender: user.gender,
      dateOfBirth: "",
      language: "english",
      country: user.country?.name,
    },
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const resetPassword = useFormik({
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

  const changeGender = (e: any) => {
    console.log(e.target.value);

    setUser({ ...user, gender: "Female" });
    console.log(user.gender);
  };

  const selectProfilePicture = (e: any) => {
    profilePictureChangeRef.current.click();
  };

  const changeProfilePicture = (e: any) => {
    if (e.target.files[0] && e.target.files[0] !== null) {
      const img = e.target.files[0];
      const url = URL.createObjectURL(img);
      setImage(url);
      console.log("sjup");
      console.log(url);
    }
  };

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
            <input
              type="file"
              ref={profilePictureChangeRef}
              style={{ display: "none" }}
              onChange={changeProfilePicture}
            />
            <Avatar
              name={userInfo.username}
              src={image || userInfo.googleProfile?.picture}
              // bg={image || userInfo.googleProfile?.picture}
              // src="https://bit.ly/dan-abramov"
              // w={"4em"}
              // h={"4em"}
              title="profile picture"
              size={"2xl"}
              // boxSize={"10em"}
              // fontWeight={"normal"}
              // __css={{ color: "red" }}
              // fontSize={"10em"}
              // cursor={"pointer"}
              _hover={{ cursor: "pointer" }}
              onClick={selectProfilePicture}
            ></Avatar>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {userInfo.username}
            </Text>
          </VStack>
          <VStack align={"flex-start"} spacing={5} p={4} minW={"60%"}>
            {/* <FormControl>
              <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                variant="filled"
                onChange={resetPassword.handleChange}
                value={resetPassword.values.oldPassword}
              />
            </FormControl> */}

            <VStack alignItems={"flex-start"}>
              <Text> User Info </Text>
              <HStack spacing={5}>
                <HStack>
                  <Text>Gender: </Text>
                  <Select
                    onChange={changeGender}
                    // value={updateUserInfo.values.gender}
                    bg={PrimaryBgColor}
                    maxWidth="2xl"
                    w={{ base: "80%", md: "100%" }}
                    _hover={{ cursor: "pointer" }}
                  >
                    {GENDER_OPTIONS.map((item) => (
                      <option key={item.gender} value={item.content}>
                        {item.gender}
                      </option>
                    ))}
                  </Select>
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
              <Button type="submit" colorScheme="purple" width="full" w={"xs"}>
                Save
              </Button>
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
          <form onSubmit={resetPassword.handleSubmit}>
            <VStack spacing={4} align={"flex-start"} w={"xl"}>
              <FormControl>
                <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  variant="filled"
                  onChange={resetPassword.handleChange}
                  value={resetPassword.values.oldPassword}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="newPassword">New Password</FormLabel>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  variant="filled"
                  onChange={resetPassword.handleChange}
                  value={resetPassword.values.newPassword}
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
