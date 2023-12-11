import "@fontsource/lora/600.css";
import React from "react";
import { Post } from "../../data/types";
import {
  Heading,
  Flex,
  Avatar,
  Text,
  HStack,
  Button,
  Icon,
  Box,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io";
import formatDate from "../../utils/formatDate";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import useLightDark from "../../hooks/useLightDark";
import { SHARED_COLORS } from "../../data/constants";
import { VStack } from "@chakra-ui/react";
interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const TextColor = useLightDark(SHARED_COLORS.TextColor);
  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const ButtonPrimary = useLightDark(SHARED_COLORS.ButtonPrimary);
  const ButtonSecondary = useLightDark(SHARED_COLORS.ButtonSecondary);

  const reactionButtonStyles = {
    border: "1px",
    borderColor: TextColor,
    width: "70px",
    px: 6,
    borderBottom: "2px",
    background: PrimaryBgColor,
    _hover: { background: "#85CB33" },
  };

  console.log("pst");
  console.log(post);

  return (
    <Tabs
      as={Flex}
      variant="solid-rounded"
      boxShadow="md"
      p={5}
      bg={PrimaryBgColor}
      borderRadius="lg"
      maxWidth="2xl"
      w={{ base: "100%", md: "100%" }}
    >
      {/* <Flex
        boxShadow="md"
        p={5}
        bg={PrimaryBgColor}
        borderRadius="lg"
        maxWidth="2xl"
        w="100%"
      > */}
      <VStack>
        <Flex
          direction={"row"}
          justifyContent={"space-between"}
          minW={"100%"}
          px={2}
        >
          <TabList>
            <HStack>
              {post.contentArabic && <Tab>Arabic</Tab>}
              {post.contentEnglish && <Tab>English</Tab>}
              {post.contentFrench && <Tab>French</Tab>}
            </HStack>
          </TabList>
          <Flex justifyContent={"flex-end"} gap={2}>
            {/* // TODO: change the link to a single post page view */}
            <FacebookShareButton
              url="https://www.npmjs.com/package/react-share"
              quote={"slmslm"}
              hashtag="#programming joke"
            >
              <FacebookIcon size={30} round={true}></FacebookIcon>
            </FacebookShareButton>
            <TwitterShareButton
              url="https://www.npmjs.com/package/react-share"
              title="slmslm"
              hashtags={["#programming joke"]}
            >
              <TwitterIcon size={30} round={true}></TwitterIcon>
            </TwitterShareButton>
          </Flex>
        </Flex>
      </VStack>
      <HStack spacing={10} px={5} py={2} minW={"100%"} minH={"xs"}>
        <Box>
          <Avatar size="lg" />
        </Box>
        {/* // TODO: extract repetitive components / Extract to a reusable component */}
        <TabPanels>
          {post.contentArabic && (
            <TabPanel
              as={Flex}
              grow={1}
              flexDirection="column"
              textAlign="left"
              color={TextColor}
            >
              <VStack alignItems={"flex-start"} mb={3}>
                <Heading
                  mb={3}
                  fontFamily="lora"
                  color={ButtonSecondary}
                  textTransform="capitalize"
                  fontSize="3xl"
                >
                  {post.titleLatin}
                </Heading>
                <Heading
                  mb={3}
                  fontFamily="lora"
                  color={ButtonPrimary}
                  textTransform="capitalize"
                  fontSize="xl"
                >
                  {post.titleArabic}
                </Heading>
              </VStack>

              <Text
                css={{
                  "&:first-letter": {
                    textTransform: "uppercase",
                  },
                }}
                mb={6}
                fontFamily="Source Sans Pro"
                fontWeight="normal"
                fontSize="1.125rem"
              >
                {post.contentArabic}
              </Text>
              <Text
                fontFamily="Source Sans Pro"
                fontWeight="normal"
                fontSize="1.125rem"
              >
                Example:{" "}
              </Text>
              <Text
                mb={6}
                fontStyle={"italic"}
                _firstLetter={{ textTransform: "uppercase" }}
                color={"gray.500"}
                display={"inline"}
              >
                {post.example.contentArabic}
              </Text>
            </TabPanel>
          )}
          {post.contentEnglish && (
            <TabPanel
              as={Flex}
              grow={1}
              flexDirection="column"
              textAlign="left"
              color={TextColor}
            >
              <VStack alignItems={"flex-start"} mb={3}>
                <Heading
                  mb={3}
                  fontFamily="lora"
                  color={ButtonSecondary}
                  textTransform="capitalize"
                  fontSize="3xl"
                >
                  {post.titleLatin}
                </Heading>
                <Heading
                  mb={3}
                  fontFamily="lora"
                  color={ButtonPrimary}
                  textTransform="capitalize"
                  fontSize="xl"
                >
                  {post.titleArabic}
                </Heading>
              </VStack>
              <Text
                css={{
                  "&:first-letter": {
                    textTransform: "uppercase",
                  },
                }}
                mb={6}
                fontFamily="Source Sans Pro"
                fontWeight="normal"
                fontSize="1.125rem"
              >
                {post.contentEnglish}
              </Text>
              <Text
                fontFamily="Source Sans Pro"
                fontWeight="normal"
                fontSize="1.125rem"
              >
                Example:{" "}
              </Text>
              <Text
                mb={6}
                fontStyle={"italic"}
                _firstLetter={{ textTransform: "uppercase" }}
                color={"gray.500"}
                display={"inline"}
              >
                {post.example.contentEnglish}
              </Text>
            </TabPanel>
          )}
          {post.contentFrench && (
            <TabPanel
              as={Flex}
              grow={1}
              flexDirection="column"
              textAlign="left"
              color={TextColor}
            >
              <VStack alignItems={"flex-start"} mb={3}>
                <Heading
                  mb={3}
                  fontFamily="lora"
                  color={ButtonSecondary}
                  textTransform="capitalize"
                  fontSize="3xl"
                >
                  {post.titleLatin}
                </Heading>
                <Heading
                  mb={3}
                  fontFamily="lora"
                  color={ButtonPrimary}
                  textTransform="capitalize"
                  fontSize="xl"
                >
                  {post.titleArabic}
                </Heading>
              </VStack>

              <Text
                _firstLetter={{ textTransform: "uppercase" }}
                mb={6}
                fontFamily="Source Sans Pro"
                fontWeight="normal"
                fontSize="1.125rem"
              >
                {post.contentFrench}
              </Text>
              <Text
                fontFamily="Source Sans Pro"
                fontWeight="normal"
                fontSize="1.125rem"
              >
                Example:{" "}
              </Text>
              <Text
                mb={6}
                fontStyle={"italic"}
                _firstLetter={{ textTransform: "uppercase" }}
                color={"gray.500"}
                display={"inline"}
              >
                {post.example.contentFrench}
              </Text>
            </TabPanel>
          )}
          <Text mb={3} fontWeight="bold" fontSize="sm" textAlign={"left"}>
            by{" "}
            <Text as="span" color={ButtonPrimary} textTransform={"capitalize"}>
              {post.author.username}
            </Text>{" "}
            {formatDate(post.createdAt)}
            {/* {month} {date}, {year} */}
            {/* //TODO: check time formatting after using data from db */}
          </Text>
          <HStack spacing={0} w="100%" h="100%">
            <Button
              borderRightRadius="none"
              borderLeftRadius="full"
              sx={reactionButtonStyles}
            >
              <HStack spacing={2}>
                <Icon fontSize="15px" ml={-3} as={IoMdThumbsUp}></Icon>
                <Text fontSize="10px" fontWeight="bold">
                  {post.likesCount}
                </Text>
              </HStack>
            </Button>
            <Button
              sx={reactionButtonStyles}
              borderRightRadius="full"
              borderLeftRadius="none"
            >
              <HStack spacing={2}>
                <Icon fontSize="15px" ml={-3} as={IoMdThumbsDown}></Icon>
                <Text fontSize="10px" fontWeight="bold">
                  {post.dislikesCount}
                </Text>
              </HStack>
            </Button>
          </HStack>
        </TabPanels>
        {/* <Flex
          grow={1}
          flexDirection="column"
          textAlign="left"
          color={TextColor}
        > */}
        {/* </Flex> */}
      </HStack>
      {/* </Flex> */}
    </Tabs>
  );
};

export default PostItem;
