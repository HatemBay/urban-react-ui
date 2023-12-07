import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import useLightDark from "../../hooks/useLightDark";
import { SHARED_COLORS } from "../../data/constants";
import { CREATE_POST_MUTATION } from "../../graphql/mutations/createPostMutation";
import { useMutation } from "urql";
import { useState } from "react";
import { Language, Post, TermForm } from "../../data/types";
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

  const [term, setTerm] = useState<TermForm>({
    arabic: "",
    latin: "",
  });

  const [definition, setDefinition] = useState<Language>({
    arabic: "",
    english: "",
    french: "",
  });

  const [example, setExample] = useState<Language>({
    arabic: "",
    english: "",
    french: "",
  });

  const [, newPost] = useMutation(CREATE_POST_MUTATION);
  const [, newExample] = useMutation(CREATE_EXAMPLE_MUTATION);
  const [type, setType] = useState("Term");

  // const [latinTerm, setLatinTerm] = useState("");
  const navigate = useNavigate();

  const handleDefinition = (e: any, language: string) => {
    console.log({ ...definition, [language]: e });

    setDefinition({ ...definition, [language]: e });
  };

  const handleExample = (e: any, language: string) => {
    console.log({ ...example, [language]: e });
    setExample({ ...definition, [language]: e });
  };

  const handleTerm = (e: any, language: string) => {
    console.log({ ...term, [language]: e.target.value });
    setTerm({ ...term, [language]: e.target.value });
  };
  const ChangeType = (e: any) => {
    setType(e.target.value);
  };

  const handleSubmit = async () => {
    // console.log("starting");
    const createPostInput = {
      contentArabic: definition.arabic,
      contentEnglish: definition.english,
      contentFrench: definition.french,
      // isU18: null,
      titleArabic: term.arabic,
      titleLatin: term.latin,
    };

    //TODO: improve
    await newPost({ createPostInput }).then(
      async (postData: any) => {
        console.log(postData);
        const createExampleInput = {
          contentArabic: example.arabic,
          contentEnglish: example.english,
          contentFrench: example.french,
          postId: postData.data.createPost.id,
        };

        await newExample({ createExampleInput }).then(
          (exampleData: any) => {
            console.log("SUCCESS");
            console.log(exampleData);
            navigate("/");
          },
          (error) => {
            console.log("ERROR");
            console.log(error);
          }
        );
      },
      (error) => {
        console.log("ERROR");
        console.log(error);
      }
    );
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
                    onChange={(e) => handleTerm(e, "arabic")}
                  ></Input>
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>latin letters</FormLabel>
                  <Input
                    type="text"
                    placeholder={"Word"}
                    fontSize={"lg"}
                    onChange={(e) => handleTerm(e, "latin")}
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
                    <FormControl>
                      <FormLabel>
                        Define your word in <b>Arabic</b>
                      </FormLabel>
                      <DefinitionTextArea
                        onChange={(e) => handleDefinition(e, "arabic")}
                      ></DefinitionTextArea>
                    </FormControl>
                    <ExampleTextArea
                      onChange={(e) => handleExample(e, "arabic")}
                    ></ExampleTextArea>
                  </VStack>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box p={3} pt={8}>
                  <VStack gap={5}>
                    <FormControl>
                      <FormLabel>
                        Define your word in <b>English</b>
                      </FormLabel>
                      <DefinitionTextArea
                        onChange={(e) => handleDefinition(e, "english")}
                      ></DefinitionTextArea>
                    </FormControl>
                    <ExampleTextArea
                      onChange={(e) => handleExample(e, "english")}
                    ></ExampleTextArea>
                  </VStack>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box p={3} pt={8}>
                  <VStack gap={5}>
                    <FormControl>
                      <FormLabel>
                        Define your word in <b>French</b>
                      </FormLabel>
                      <DefinitionTextArea
                        onChange={(e) => handleDefinition(e, "french")}
                      ></DefinitionTextArea>
                    </FormControl>
                    <ExampleTextArea
                      onChange={(e) => handleExample(e, "french")}
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