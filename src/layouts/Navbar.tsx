"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  useDisclosure,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Avatar,
  HStack,
  Tooltip,
  createStandaloneToast,
  AvatarBadge,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  Search2Icon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { IoIosShuffle } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import {
  Outlet,
  Link as ReactRouterLink,
  redirect,
  useNavigate,
} from "react-router-dom";
import { Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setPage, setRandomize } from "../redux/reducers/pageSlice";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../redux/store";
import Layer from "./Layer";
import useLightDark from "../hooks/useLightDark";
import { SHARED_COLORS } from "../data/constants";
import {
  clearToken,
  getToken,
  getUserInfo,
  setUserInfo,
} from "../utils/authUtils";
import { FindUserInput, PaginatedPosts, User, UserInfo } from "../data/types";
import { useQuery } from "urql";
import { POSTS_QUERY } from "../graphql/queries/postsQuery";
import { FIND_USER_QUERY } from "../graphql/queries/findUserQuery";
import { IoIosArrowDown } from "react-icons/io";

const handleLogout = (e: any) => {
  clearToken();
  window.location.reload();
  return redirect("/");
};

interface UserDropDownItem {
  label: string;
  as: any;
  icon: any;
  href?: string;
  onClick?: any;
  onclose?: any;
  goTo?: string;
}

const USER_DROPDOWN_ELEMENTS: Array<UserDropDownItem> = [
  {
    label: "Settings",
    as: "a",
    icon: <SettingsIcon></SettingsIcon>,
    goTo: "/settings",
  },
  {
    label: "Favorite Terms",
    as: ReactRouterLink,
    icon: <MdFavorite />,
    href: "/favorite-terms",
  },
  {
    label: "Logout",
    as: ReactRouterLink,
    icon: <IoIosLogOut />,
    onClick: handleLogout,
  },
];

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const navbarColor = "#1B2936";
  const navbarItemColor = useColorModeValue("white", "white");
  const ButtonPrimary = useLightDark(SHARED_COLORS.ButtonPrimary);
  const TextColor = useLightDark(SHARED_COLORS.TextColor);
  const SecondaryBgColor = useLightDark(SHARED_COLORS.SecondaryBgColor);

  const [field, setOrderByField] = useState("createdAt");
  const [take, setTake] = useState(5);
  const [avatarKey, setAvatarKey] = useState(0);

  const { currPage: page } = useSelector((state: RootState) => state.page);
  let { filter } = useSelector((state: RootState) => state.page);
  let { randomize } = useSelector((state: RootState) => state.page);
  let { rerender } = useSelector((state: RootState) => state.page);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [PostsQueryResult, reexecutePostsQuery] = useQuery<PaginatedPosts>({
    query: POSTS_QUERY,
    variables: {
      orderBy: {
        field,
        direction: "desc",
      },
      pagination: {
        filter,
        page,
        take,
      },
      randomize,
      //rerender is a fake value used to bypass the cache when needed and trigger the query
      rerender,
    },
  });

  // clearToken();
  // const { userToken } = useSelector((state: RootState) => state.auth);
  const userToken = getToken();

  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const userInfo: UserInfo | null = getUserInfo();

  useEffect(() => {
    // we need to update the avatar key when the user changes to prevent rerendering bugs
    setAvatarKey((prevKey) => prevKey + 1);
  }, [userInfo?.profilePicture]);

  const findUserInput: FindUserInput = {
    id: userInfo?.sub,
  };

  const [{ data, fetching, error }] = useQuery({
    query: FIND_USER_QUERY,
    variables: { findUserInput },
  });

  const user: User = data?.user;
  setUserInfo(user);
  console.log("userinfo");
  console.log(data);

  const handleRandomize = () => {
    dispatch(setRandomize(true));
    return reexecutePostsQuery({
      requestPolicy: "network-only",
    });
  };

  const handleFilter = (e: any, randomize: boolean = false) => {
    if (randomize) {
      return handleRandomize();
    }

    dispatch(setRandomize(false));
    dispatch(setPage(1));
    return dispatch(setFilter(""));
  };

  const goTo = (href: string) => {
    dispatch(setRandomize(false));
    dispatch(setPage(1));
    dispatch(setFilter(""));
    return navigate(href);
  };

  // const toast = useToast();
  const { toast } = createStandaloneToast();
  const makeToast = (user: User) => {
    if (!toast.isActive("email-verify")) {
      toast({
        id: "email-verify",
        render: () => {
          const resendEmail = async () => {
            // window.location.href =
            //   "http://localhost:3001/email-confirmation/resend-confirmation-link";
            await fetch(
              "http://localhost:3001/email-confirmation/resend-confirmation-link",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ user }),
              }
            );
          };
          return (
            <div
              style={{
                background: "#FEB2B2",
                padding: "10px",
                paddingLeft: "20px",
                borderRadius: "10px",
              }}
            >
              <span style={{ color: "black", fontFamily: "sans-serif" }}>
                Please verify your email,{" "}
              </span>
              <button
                onClick={() => resendEmail()}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  fontWeight: "thin",
                  fontFamily: "sans-serif",
                }}
              >
                Resend confirmation email.
              </button>
              <button
                style={{
                  color: "black",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
                onClick={() => toast.closeAll()}
              >
                <strong>
                  <sup
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {"  "}X
                  </sup>
                </strong>
              </button>
            </div>
          );
        },
        status: "error",
        duration: 9000,
        colorScheme: "red",
      });
    }
  };

  if (!user?.emailVerified && user) {
    makeToast(user);
  }

  // if ()

  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue(navbarColor, "gray.800")}
          color={useColorModeValue("white", "white")}
          minH={"60px"}
          py={{ base: 4 }}
          px={{ base: 8 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
          justifyContent={"center"}
        >
          <Stack direction={"column"} spacing={4}>
            <Flex direction={"row"}>
              <Flex flexGrow={{ base: 2, md: 1 }} align={"center"}>
                <Flex
                  flex={{ base: 1, md: "auto" }}
                  ml={{ base: -2 }}
                  display={{ base: "flex", md: "none" }}
                >
                  <IconButton
                    onClick={onToggle}
                    bg={"gray.500"}
                    icon={
                      isOpen ? (
                        <CloseIcon w={3} h={3} />
                      ) : (
                        <HamburgerIcon w={5} h={5} />
                      )
                    }
                    variant={"ghost"}
                    aria-label={"Toggle Navigation"}
                  />
                </Flex>
                <Flex
                  flex={{ base: 1 }}
                  justify={{ base: "center", md: "start" }}
                  gap={4}
                  ml={-2}
                  alignItems={"center"}
                >
                  <Flex display={{ base: "flex", md: "flex" }} ml={{ md: 10 }}>
                    <ChakraLink
                      as={ReactRouterLink}
                      to="/"
                      _hover={{ cursor: "pointer" }}
                      textAlign={useBreakpointValue({
                        base: "right",
                        md: "left",
                      })}
                      fontFamily={"heading"}
                      color={navbarItemColor}
                      onClick={handleFilter}
                    >
                      Logo
                    </ChakraLink>
                  </Flex>
                  <Flex
                    flexGrow={{ base: 1, md: 1 }}
                    display={{ base: "none", md: "flex" }}
                    ml={10}
                  >
                    <DesktopNav />
                  </Flex>
                </Flex>
              </Flex>

              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                ml={10}
                spacing={6}
              >
                {userToken !== null ? (
                  <Button
                    as={ReactRouterLink}
                    fontSize={"sm"}
                    fontWeight={400}
                    variant={"link"}
                    to={"/create-post"}
                  >
                    Create Post
                  </Button>
                ) : (
                  <Button
                    as={ReactRouterLink}
                    fontSize={"sm"}
                    fontWeight={400}
                    variant={"link"}
                    to={"/sign-in"}
                  >
                    Sign In
                  </Button>
                )}
                {userToken !== null ? (
                  <Popover trigger={"click"}>
                    {({ onClose }) => (
                      <>
                        <PopoverTrigger>
                          <Box>
                            <Tooltip
                              as={Box}
                              label="Profile"
                              aria-label="A tooltip"
                              borderRadius={"md"}
                            >
                              <Avatar
                                key={avatarKey}
                                name={userInfo?.username}
                                src={
                                  `${userInfo?.profilePicture}` &&
                                  `${userInfo?.profilePicture}` !== ""
                                    ? `data:image/png;base64,${userInfo?.profilePicture}`
                                    : userInfo?.googleProfile?.picture
                                }
                                // as={Button}
                                // borderRadius={"full"}
                                cursor={"pointer"}
                                _hover={{
                                  filter: "brightness(1.3)",
                                }}
                                display={{ base: "none", md: "inline-flex" }}
                              >
                                <AvatarBadge
                                  mr={1}
                                  mb={1}
                                  borderWidth={"1px"}
                                  boxSize="0.7em"
                                  bg="gray.800"
                                  textColor={"gray.600"}
                                  _hover={{
                                    textColor: "gray.500",
                                  }}
                                >
                                  <IoIosArrowDown />
                                </AvatarBadge>
                              </Avatar>
                            </Tooltip>
                          </Box>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton pt={4} color={TextColor} />
                          <PopoverHeader
                            as={"a"}
                            textAlign={"left"}
                            color={TextColor}
                            textTransform={"capitalize"}
                            onClick={() => {
                              onClose();
                              goTo("/profile");
                            }}
                            p={4}
                            _hover={{
                              cursor: "pointer",
                              background: SecondaryBgColor,
                            }}
                          >
                            <HStack gap={5}>
                              <Avatar
                                size={"sm"}
                                name={userInfo?.username}
                                src={
                                  `data:image/jpg;base64,${userInfo?.profilePicture}` ||
                                  userInfo?.googleProfile?.picture
                                }
                              ></Avatar>
                              <Text fontWeight={"bold"} fontSize={"lg"}>
                                {userInfo?.username}
                              </Text>
                            </HStack>
                          </PopoverHeader>
                          <PopoverBody>
                            <Flex
                              py={2}
                              direction={"column"}
                              justifyContent={"flex-start"}
                              gap={3}
                            >
                              {USER_DROPDOWN_ELEMENTS.map((element) => (
                                <HStack
                                  gap={3}
                                  as={element.as}
                                  display={{ base: "none", md: "inline-flex" }}
                                  fontSize={"lg"}
                                  w={"full"}
                                  fontWeight={600}
                                  color={TextColor}
                                  bg={"transparent"}
                                  to={element.href}
                                  textTransform={"capitalize"}
                                  borderRadius={"md"}
                                  onClick={() => {
                                    onClose();
                                    if (element.onClick) {
                                      element.onClick();
                                    }
                                    if (element.goTo) {
                                      goTo(element.goTo);
                                    }
                                  }}
                                  p={2}
                                  textAlign={"left"}
                                  _hover={{
                                    cursor: "pointer",
                                    background: SecondaryBgColor,
                                  }}
                                >
                                  {element.icon}
                                  <Text>{element.label}</Text>
                                </HStack>
                              ))}
                            </Flex>
                          </PopoverBody>
                        </PopoverContent>
                      </>
                    )}
                  </Popover>
                ) : (
                  <Button
                    as={ReactRouterLink}
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={ButtonPrimary}
                    to={"/sign-up"}
                    _hover={{
                      bg: "blue.400",
                    }}
                  >
                    Sign Up
                  </Button>
                )}
              </Stack>
            </Flex>
            <Stack direction={"row"}>
              <InputGroup>
                <InputLeftElement mr={2}>
                  <Search2Icon
                    color={"gray.300"}
                    fontSize={"2xl"}
                  ></Search2Icon>
                </InputLeftElement>
                <Input
                  bg={"white"}
                  color={"gray.900"}
                  placeholder="Search"
                ></Input>
                <InputRightElement>
                  <Box
                    pt={2}
                    as={"a"}
                    display={"center"}
                    fontWeight={900}
                    _hover={{ cursor: "pointer" }}
                    onClick={(e: any) => handleFilter(e, true)}
                  >
                    <Icon
                      as={IoIosShuffle}
                      color={ButtonPrimary}
                      fontSize={"4xl"}
                      mr={2}
                    ></Icon>
                  </Box>
                </InputRightElement>
              </InputGroup>
            </Stack>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
      <Layer>
        <Outlet
          context={[
            PostsQueryResult,
            setOrderByField,
            take,
            setTake,
            handleRandomize,
          ]}
        />
      </Layer>
    </>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("white", "gray.200");
  const linkHoverColor = useColorModeValue("blue", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.700");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction={"row"} gap={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            trigger={"click"}
            placement={"bottom-start"}
          >
            <PopoverTrigger>
              <Flex
                as="button"
                role="group"
                p={2}
                fontSize={"sm"}
                fontWeight={900}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
                {navItem.children && (
                  <Flex justify={"flex-end"} align={"center"} flex={1}>
                    <Icon color={"white"} w={5} h={5} as={ChevronDownIcon} />
                  </Flex>
                )}
              </Flex>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"100%"}
              >
                <Grid
                  alignContent={"center"}
                  templateColumns="repeat(5, 1fr)"
                  gap={1}
                >
                  {navItem.children.map((child) => (
                    <DesktopSubNav
                      onclose={onClose}
                      value={child.value}
                      key={child.label}
                      {...child}
                    />
                  ))}
                </Grid>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Flex>
  );
};

const DesktopSubNav = ({ label, value, href, onclose }: NavItem) => {
  const dispatch = useDispatch();
  const handleFilter = (e: any) => {
    dispatch(setPage(1));
    dispatch(setRandomize(false));
    return dispatch(setFilter(e));
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  const focus = () => {
    handleFilter(buttonRef.current?.value);
    onclose();
  };

  return (
    <Stack>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        as="button"
        ref={buttonRef}
        value={value}
        onClick={focus}
        role={"group"}
        background={"gray.100"}
        h={"3em"}
        w={"3em"}
        justify-self="center"
        align-self="center"
        rounded={"full"}
        _hover={{
          bg: useColorModeValue("blue.100", "blue"),
          cursor: "pointer",
        }}
      >
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: useColorModeValue("blue.400", "white") }}
            fontWeight={900}
            color={"black"}
          >
            {label}
          </Text>
        </Box>
      </Flex>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} value={navItem.value} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
              ml={2}
            />
          )}
        </Text>
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          <Grid
            alignContent={"center"}
            templateColumns="repeat(5, 1fr)"
            w={"100%"}
            gap={1}
          >
            {children &&
              children.map((child) => {
                return (
                  <MobileNavSubItem
                    key={child.label}
                    value={child.value}
                    {...child}
                  />
                );
              })}
          </Grid>
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileNavSubItem = ({ value, label, children, href }: NavItem) => {
  const dispatch = useDispatch();
  const handleFilter = (e: any) => {
    dispatch(setRandomize(false));
    return dispatch(setFilter(e));
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  const focus = () => {
    handleFilter(buttonRef.current?.value);
  };

  return (
    <Box as="button" ref={buttonRef} value={value} onClick={focus} py={2}>
      {label}
    </Box>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  value?: string;
  onclose?: any;
}

const arr = [];
for (let i = 97; i < 122; i++) {
  arr.push(String.fromCharCode(i));
}

const FILTER_CRITERIA = {
  hashtag: "#",
  newLabel: "new",
};

const BrowseItems = [...arr, ...Object.values(FILTER_CRITERIA)];

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Browse",
    children: BrowseItems.map((item): NavItem => {
      return {
        label: item[0].toUpperCase() + item.substring(1).toLowerCase(),
        value: item,
      };
    }),
  },
  {
    label: "Store",
  },
  {
    label: "Discord",
    href: "#",
  },
  {
    label: "Advertise",
    href: "#",
  },
];
