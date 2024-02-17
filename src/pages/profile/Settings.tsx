import {
  Box,
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
import { useState } from "react";
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
import SettingsProfilePicture from "./SettingsProfilePicture";

type Props = {};

export const Settings = (props: Props) => {
  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const TextColor = useLightDark(SHARED_COLORS.TextColor);
  const userInfo: UserInfo = getUserInfo();

  console.log("SettingsUserInfo");
  console.log(userInfo);

  const toast = useToast();

  let [user, setUser] = useState<User>(userInfo);
  let [country, setCountry] = useState("");
  const [, updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [imageModified, setImageModified] = useState(false);
  const [dateModified, setDateModified] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const findUserInput: FindUserInput = {
    id: userInfo?.id,
  };

  const updateUserInfo = useFormik({
    initialValues: {
      profilePicture: user.profilePicture || user.googleProfile?.picture,
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth,
      accountLanguage: user.accountLanguage || "",
      country: user.country?.name,
    },
    onSubmit: async (values: any) => {
      if (imageModified) {
        values.profilePicture = user.profilePicture;
        updateUserInfo.dirty = true;
      }
      if (dateModified) {
        values.dateOfBirth = user.dateOfBirth;
        updateUserInfo.dirty = true;
      }
      if (updateUserInfo.dirty) {
        console.log("BIRTHDAY");
        console.log(typeof user.dateOfBirth);

        const updateUserInput: UpdateUserSettingsInput = {
          profilePicture: user.profilePicture,
          gender: values.gender || "",
          dateOfBirth: user.dateOfBirth,
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

  const selectDateOfBirth = (e: any) => {
    console.log("BDATE");
    console.log();

    setUser({ ...user, dateOfBirth: new Date(e.target.value) });
    setDateModified(true);
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
            <SettingsProfilePicture
              user={user}
              setUser={setUser}
              setImageModified={setImageModified}
            ></SettingsProfilePicture>
            <VStack align={"flex-start"} spacing={5} p={4} minW={"60%"}>
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
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                      value={
                        new Date(user.dateOfBirth as string)
                          ?.toISOString()
                          .split("T")[0]
                      }
                      max={today}
                      onChange={selectDateOfBirth}
                    />
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
                <Box
                  as="button"
                  type="submit"
                  bg={"purple.200"}
                  color={"black"}
                  fontWeight={"bold"}
                  p={2}
                  px={4}
                  borderRadius={"lg"}
                  _hover={{ bg: "purple.300" }}
                  disabled={
                    !(imageModified || dateModified || updateUserInfo.dirty)
                  }
                  _disabled={{ opacity: "0.5", cursor: "auto" }}
                >
                  Save
                </Box>
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
          <Divider></Divider>
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
