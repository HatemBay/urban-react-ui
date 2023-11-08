import { Button, FormControl, FormErrorMessage, Input, InputGroup, VStack } from "@chakra-ui/react";

type Props = {}

const CreatePost = (props: Props) => {
    return (<>
        <FormControl p={3} pt={8}>
            <VStack gap={5}>
                <InputGroup>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                    ></Input>
                    {/* {!isInvalidData && (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )} */}
                </InputGroup>
                <InputGroup>
                    <Input
                        id="password"
                        type="password"
                        pr={5}
                        placeholder="Password"
                    ></Input>
                </InputGroup>
                <Button
                    colorScheme="blue"
                    size={"lg"}
                    role="submit"
                >
                    Create
                </Button>
            </VStack>
        </FormControl>
    </>)
}

export default CreatePost;
