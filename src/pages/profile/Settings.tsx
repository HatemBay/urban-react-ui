import {
  Avatar,
  AvatarBadge,
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
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useLightDark from "../../hooks/useLightDark";
import {
  ACCOUNT_LANGUAGE_OPTIONS,
  DIALECT_ITEMS,
  GENDER_OPTIONS,
  SHARED_COLORS,
} from "../../data/constants";
import { getUserInfo } from "../../utils/authUtils";
import { useFormik } from "formik";
import DynamicStickyIndex from "./DynamicStickyIndex";
import {
  FindUserInput,
  UpdateUserSettingsInput,
  User,
  UserInfo,
} from "../../data/types";
import { useMutation } from "urql";
import { UPDATE_USER_MUTATION } from "../../graphql/mutations/updateUserMutation";
import customToast from "../../utils/facades/customToast";
import { IoIosClose } from "react-icons/io";

type Props = {};

export const Settings = (props: Props) => {
  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const TextColor = useLightDark(SHARED_COLORS.TextColor);
  const userInfo: UserInfo = getUserInfo();

  const toast = useToast();

  //TODO: change with country from user data
  let [user, setUser] = useState<User>(userInfo);
  let [country, setCountry] = useState("");

  const [, updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [imageModified, setImageModified] = useState(false);
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

  const findUserInput: FindUserInput = {
    id: userInfo?.id,
  };

  // let res: ExtractedType = {};

  const updateUserInfo = useFormik({
    initialValues: {
      profilePicture: user.profilePicture || user.googleProfile?.picture,
      gender: user.gender || "",
      dateOfBirth: "",
      accountLanguage: user.accountLanguage || "",
      country: user.country?.name,
    },
    onSubmit: (values: any) => {
      if (imageModified) {
        values.profilePicture = user.profilePicture;
        updateUserInfo.dirty = true;
      }
      if (updateUserInfo.dirty) {
        const updateUserInput: UpdateUserSettingsInput = {
          profilePicture: user.profilePicture,
          gender: values.gender || "",
          accountLanguage: values.accountLanguage || "",
        };
        setUser({ ...user, ...values });

        const saveUser = updateUser({ findUserInput, updateUserInput });
        customToast(
          toast,
          saveUser,
          "Your profile has been updated",
          "Something went wrong... please try again later"
        );

        updateUserInfo.resetForm({
          values: { ...updateUserInfo.values },
        });
        setImageModified(false);
      }
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

  const selectProfilePicture = (e: any) => {
    profilePictureChangeRef.current.click();
  };

  const changeProfilePicture = (e: any) => {
    if (e.target.files[0] && e.target.files[0] !== null) {
      const img = e.target.files[0];
      if (img) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = (reader.result as string).split(",")[1];
          setUser({ ...user, profilePicture: base64String });
        };
        reader.readAsDataURL(img);
      }
    }
  };

  const removeProfilePicture = (e: any) => {
    e.stopPropagation();
    setImageModified(true);
    setUser({ ...user, profilePicture: "_" });
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
        <form onSubmit={updateUserInfo.handleSubmit}>
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
                accept="image/*"
                ref={profilePictureChangeRef}
                style={{ display: "none" }}
                onChange={changeProfilePicture}
              />
              <Avatar
                name={userInfo.username}
                src={
                  `data:image/jpg;base64,${user.profilePicture}` ||
                  userInfo.googleProfile?.picture
                }
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
              >
                {user.profilePicture !== "_" && (
                  <AvatarBadge
                    title="remove profile picture"
                    borderWidth={"5px"}
                    boxSize="0.7em"
                    bg="papayawhip"
                    textColor={"black"}
                    _hover={{
                      filter: "brightness(1.3)",
                      textColor: "gray.700",
                    }}
                    onClick={removeProfilePicture}
                  >
                    <IoIosClose />
                  </AvatarBadge>
                )}
              </Avatar>

              {/* <img src={Base64.atob(image)} alt="" /> */}
              <HStack>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  {userInfo.username}
                </Text>
              </HStack>
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
                      id="gender"
                      name="gender"
                      onChange={updateUserInfo.handleChange}
                      value={updateUserInfo.values.gender}
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
                    <Select
                      id="accountLanguage"
                      name="accountLanguage"
                      onChange={updateUserInfo.handleChange}
                      value={updateUserInfo.values.accountLanguage}
                      bg={PrimaryBgColor}
                      maxWidth="2xl"
                      w={{ base: "80%", md: "100%" }}
                      _hover={{ cursor: "pointer" }}
                    >
                      {ACCOUNT_LANGUAGE_OPTIONS.map((item) => (
                        <option key={item.language} value={item.abbreviation}>
                          {item.language}
                        </option>
                      ))}
                    </Select>
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
                      {DIALECT_ITEMS.map((item) => {
                        return (
                          <option key={item.label} value={item.dialect}>
                            <HStack>
                              {item.flag}
                              <Text>{item.country}</Text>
                            </HStack>
                          </option>
                        );
                      })}
                    </Select>
                  </HStack>
                </HStack>
                <Button
                  as="button"
                  type="submit"
                  colorScheme="purple"
                  w={"s"}
                  disabled={true}
                >
                  Save
                </Button>
              </VStack>
            </VStack>
          </HStack>
        </form>
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
