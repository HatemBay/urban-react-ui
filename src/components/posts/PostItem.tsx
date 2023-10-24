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
} from "@chakra-ui/react";
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io";
interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  return (
    <Flex
      boxShadow="md"
      p={5}
      bg="white"
      borderRadius="lg"
      maxWidth="xl"
      w="100%"
    >
      <Avatar size="lg" />
      <VStack>
        <Text textTransform="capitalize" size="4xl">
          {post.title}
        </Text>
        <Text>{post.content}</Text>
        <Text>{post.created_at}</Text>
        <HStack spacing={0}>
          <Button
            display="inline"
            role="button"
            border="1px"
            borderColor="black"
            width="10px"
            px={6}
            py={2}
            borderRightRadius="none"
            borderLeftRadius="3xl"
            borderBottom="2px"
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
            borderColor="black"
            width="10px"
            px={6}
            py={2}
            borderRightRadius="3xl"
            borderLeftRadius="none"
            borderBottom="2px"
            textAlign="center"
          >
            <HStack spacing={2}>
              <Icon fontSize="15px" ml={-3} as={IoMdThumbsDown}></Icon>
              <Text fontSize="10px" fontWeight="bold">
                {post.dislikes_count}
              </Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default PostItem;
