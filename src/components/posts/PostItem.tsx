import React from "react";
import { Post } from "../../types";
import {
  Box,
  VStack,
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
interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const TextColor = useColorModeValue("gray.800", "white");
  const BgColor = useColorModeValue("white", "gray.800");

  return (
    <Flex
      boxShadow="md"
      p={5}
      bg={BgColor}
      borderRadius="lg"
      maxWidth="2xl"
      w="100%"
    >
      <HStack spacing={10}>
        <Avatar size="lg" />
        <Flex flexDirection="column" textAlign="left" color={TextColor}>
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
            <Text as="span" color="blue">
              {post.author.username}
            </Text>{" "}
            {formatDate(post.created_at)}
            {/* {month} {date}, {year} */}
            {/* //TODO: check time formatting after using data from db */}
          </Text>
          <HStack spacing={0} w="100%" h="100%">
            <Button
              display="inline"
              role="button"
              border="1px"
              borderColor={TextColor}
              width="70px"
              px={6}
              py={2}
              borderRightRadius="none"
              borderLeftRadius="full"
              borderBottom="2px"
              background={BgColor}
              _hover={{ background: "green" }}
            >
              <HStack spacing={2}>
                <Icon fontSize="15px" ml={-3} as={IoMdThumbsUp}></Icon>
                <Text fontSize="10px" fontWeight="bold">
                  {post.likes_count}
                </Text>
              </HStack>
            </Button>
            <Button
              role="button"
              border="1px"
              borderColor={TextColor}
              width="70px"
              px={6}
              py={2}
              borderRightRadius="full"
              borderLeftRadius="none"
              borderBottom="2px"
              textAlign="center"
              background={BgColor}
              _hover={{ background: "green" }}
            >
              <HStack spacing={2}>
                <Icon fontSize="15px" ml={-3} as={IoMdThumbsDown}></Icon>
                <Text fontSize="10px" fontWeight="bold">
                  {post.dislikes_count}
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
