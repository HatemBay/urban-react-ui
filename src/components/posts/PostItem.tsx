import React from "react";
import { Post } from "../../types";
import {
  Heading,
  Flex,
  Avatar,
  Text,
  HStack,
  Button,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io";
import formatDate from "../../utils/formatDate";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { useLightDark } from "../../utils/hooks/useLightDark";
import { SHARED_COLORS } from "../../utils/constants/constants";
interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const TextColor = useLightDark(SHARED_COLORS.TextColor);
  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);

  const reactionButtonStyles = {
    border: "1px",
    borderColor: TextColor,
    width: "70px",
    px: 6,
    borderBottom: "2px",
    background: PrimaryBgColor,
    _hover: { background: "green" },
  };

  return (
    <Flex
      boxShadow="md"
      p={5}
      bg={PrimaryBgColor}
      borderRadius="lg"
      maxWidth="2xl"
      w="100%"
    >
      <HStack spacing={10} px={5} py={2}>
        <Avatar size="lg" />
        <Flex flexDirection="column" textAlign="left" color={TextColor}>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <Heading
              mb={3}
              fontWeight="bold"
              fontFamily="lora"
              color="blue"
              textTransform="capitalize"
              fontSize="3xl"
            >
              {post.title}
            </Heading>
            <Flex justifyContent={"flex-end"} gap={2}>
              {/* // TODO: change the link to a single post page view */}
              <FacebookShareButton
                url="https://www.npmjs.com/package/react-share"
                quote={"slmslm"}
                hashtag="#programing joke"
              >
                <FacebookIcon size={30} round={true}></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton
                url="https://www.npmjs.com/package/react-share"
                title="slmslm"
                hashtags={["#programing joke"]}
              >
                <TwitterIcon size={30} round={true}></TwitterIcon>
              </TwitterShareButton>
            </Flex>
          </Flex>
          <Text
            mb={2}
            fontFamily="Source Sans Pro"
            fontWeight="normal"
            fontSize="1.125rem"
          >
            A mysterious word which is actually made up of the abbreviation “ur”
            and the word “ban.” It probably hints to how the government is
            planning to ban Urban Dictionary because it speaks the truth about
            English and they’re jealous their dictionary can’t be the same.
            {post.content}
          </Text>
          <Text mb={3} fontWeight="bold" fontSize="sm">
            by{" "}
            <Text as="span" color="blue" textTransform={"capitalize"}>
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
        </Flex>
      </HStack>
    </Flex>
  );
};

export default PostItem;
