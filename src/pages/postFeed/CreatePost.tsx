import { Box, Button, Container, FormControl, FormErrorMessage, Heading, Input, InputGroup, Textarea, VStack } from "@chakra-ui/react";
import useLightDark from "../../hooks/useLightDark";
import { SHARED_COLORS } from "../../data/constants";
import { CREATE_POST_MUTATION } from "../../graphql/mutations/createPostMutation";
import { useMutation } from "urql";
import { useState } from "react";
import { Post } from "../../data/types";

type PostsQueryRes = {
    posts: Post[];
};

type Props = {}

const CreatePost = (props: Props) => {
    const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);

    const [newPostResult, newPost] = useMutation(CREATE_POST_MUTATION);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleTitle = (e: any) => {
        setTitle(e.target.value)
    }

    const handleContent = (e: any) => {
        setContent(e.target.value)
    }


    const handleSubmit = () => {
        console.log('starting');

        const createPostInput = {
            title,
            content,
        };

        newPost({ createPostInput }).then((res) => {
            if (res.error) {
                console.log("ERROR");
                console.log(res.error);
                return
            }
            console.log("SUCCESS");
            console.log(res);

        });
    };

    return (<>
        <Container p={0}>
            <VStack bg={PrimaryBgColor} spacing={8} textAlign="center" fontSize="xl">
                <Box width={"100%"} bg={"blue"} py={5}>
                    <Heading color={"white"}>Create Post</Heading>
                </Box>
                <FormControl p={3} pt={8}>
                    <VStack gap={5}>
                        <InputGroup>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Title"
                                onChange={handleTitle}
                            ></Input>
                            {/* {!isInvalidData && (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )} */}
                        </InputGroup>
                        <InputGroup>
                            <Textarea
                                id="content"
                                pr={5}
                                placeholder="Content"
                                onChange={handleContent}
                            ></Textarea>
                        </InputGroup>
                        <Button
                            colorScheme="blue"
                            size={"lg"}
                            role="submit"
                            onClick={handleSubmit}
                        >
                            Create
                        </Button>
                    </VStack>
                </FormControl>
            </VStack>
        </Container>
    </>)
}

export default CreatePost;
