import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import useLightDark from "../../hooks/useLightDark";
import { SHARED_COLORS } from "../../data/constants";
import { CREATE_POST_MUTATION } from "../../graphql/mutations/createPostMutation";
import { useMutation } from "urql";
import { useState } from "react";
import { Post } from "../../data/types";
import DefinitionTextArea from "../../components/DefinitionTextArea";
import ExampleTextArea from "../../components/ExampleTextArea";
import DialectsPopoverButton from "../../components/DialectsPopoverButton";
import { CREATE_EXAMPLE_MUTATION } from "../../graphql/mutations/createExampleMutation";
import { useNavigate } from "react-router-dom";
type PostsQueryRes = {
  posts: Post[];
};

type Props = {};

const CreatePost = (props: Props) => {
  const PrimaryBgColor = useLightDark(SHARED_COLORS.PrimaryBgColor);
  const TextColor = useLightDark(SHARED_COLORS.TextColor);

  // TODO: separate for different languages
  const [example, setExample] = useState("");
  // TODO: separate for different languages
  const [definition, setDefinition] = useState("");

  const [newPostResult, newPost] = useMutation(CREATE_POST_MUTATION);
  const [newExampleResult, newExample] = useMutation(CREATE_EXAMPLE_MUTATION);
  const [content, setContent] = useState("");
  const [type, setType] = useState("Term");
  const [arabicTerm, setArabicTerm] = useState("");
  const [latinTerm, setLatinTerm] = useState("");
  const navigate = useNavigate();

  const handleTermArabic = (e: any) => {
    setArabicTerm(e.target.value);
  };
  const handleTermLatin = (e: any) => {
    setLatinTerm(e.target.value);
  };

  const ChangeType = (e: any) => {
    setType(e.target.value);
  };

  const handleSubmit = async () => {
    // console.log("starting");
    const createPostInput = {
      title: latinTerm,
      content: definition,
    };

    //TODO: improve
    await newPost({ createPostInput }).then(async (postData) => {
      console.log(postData);
      console.log(postData.data.createPost.id);

      const createExampleInput = {
        content: example,
        postId: postData.data.createPost.id,
      };
      await newExample({ createExampleInput }).then((exampleData) => {
        if (exampleData.error) {
          console.log("ERROR");
          console.log(exampleData.error);
          return;
        }
        console.log("SUCCESS");
        console.log(exampleData);
        navigate("/");
      });
    });
  };

  return (
    <>
      <Container fontSize="3xl" mb={5} p={0}>
        <VStack
          bg={PrimaryBgColor}
          spacing={8}
          textAlign="left"
          fontSize="xl"
          p={0}
          pb={5}
        >
          <Heading mt={5} color={TextColor} alignSelf={"center"}>
            Create Definition
          </Heading>
          <HStack>
            <VStack w={"xl"} alignSelf={"flex-start"}>
              <Box w={"md"} ml={10} p={3} pt={8}>
                <FormControl mb={3}>
                  <FormLabel>Arabic letters</FormLabel>
                  <Input
                    type="text"
                    placeholder={"المصطلح"}
                    fontSize={"lg"}
                    onChange={(e) => handleTermArabic(e)}
                  ></Input>
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>latin letters</FormLabel>
                  <Input
                    type="text"
                    placeholder={"Word"}
                    fontSize={"lg"}
                    onChange={(e) => handleTermLatin(e)}
                  ></Input>
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onChange={ChangeType}
                    value={type}
                    width={"30%"}
                    bg={PrimaryBgColor}
                    maxWidth="2xl"
                    w="100%"
                    _hover={{ cursor: "pointer" }}
                  >
                    <option value={"Term"}>Term</option>
                    <option value={"Proverb"}>Proverb</option>
                  </Select>
                </FormControl>
              </Box>
            </VStack>
            <VStack w={"xl"} alignSelf={"flex-start"}>
              <Box w={"md"} ml={10} p={3} pt={8}>
                <DialectsPopoverButton></DialectsPopoverButton>
              </Box>
            </VStack>
          </HStack>
          <Tabs width={"90%"} variant="enclosed">
            <TabList>
              <Tab>Arabic</Tab>
              <Tab>English</Tab>
              <Tab>French</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box p={3} pt={8}>
                  <VStack gap={5}>
                    <DefinitionTextArea
                      language={"Arabic"}
                      onChange={setDefinition}
                    ></DefinitionTextArea>
                    <ExampleTextArea
                      language={"Arabic"}
                      onChange={setExample}
                    ></ExampleTextArea>
                  </VStack>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box p={3} pt={8}>
                  <VStack gap={5}>
                    <DefinitionTextArea
                      language={"English"}
                      onChange={setDefinition}
                    ></DefinitionTextArea>
                    <ExampleTextArea
                      language={"English"}
                      onChange={setExample}
                    ></ExampleTextArea>
                  </VStack>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box p={3} pt={8}>
                  <VStack gap={5}>
                    <DefinitionTextArea
                      language={"French"}
                      onChange={setDefinition}
                    ></DefinitionTextArea>
                    <ExampleTextArea
                      language={"French"}
                      onChange={setExample}
                    ></ExampleTextArea>
                  </VStack>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Button
            mt={-5}
            colorScheme="blue"
            size={"lg"}
            role="submit"
            onClick={handleSubmit}
          >
            Add Definition
          </Button>
        </VStack>
      </Container>
    </>
  );
};

export default CreatePost;
