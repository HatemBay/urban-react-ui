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
import { useDispatch } from "react-redux";
import { forceRerender } from "../../redux/reducers/pageSlice";

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
  const dispatch = useDispatch();

  const handleDefinition = (language: string) => {
    return (e: any) => setDefinition({ ...definition, [language]: e });
  };

  const handleExample = (language: string) => {
    return (e: any) => setExample({ ...example, [language]: e });
  };

  const handleTerm = (language: string) => {
    return (e: any) => setTerm({ ...term, [language]: e.target.value });
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
            console.log(postData);
            //TODO: Test more thouroughly, (when i created a post with full language and example when there was one post existing, none showed up after redirect)
            dispatch(forceRerender());
            return navigate("/");
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
    <Container
      // fontSize={"3xl"}
      minW={{ base: "7rem", sm: "60%", md: "60%" }}
      maxW={"3xl"}
      mb={5}
      p={0}
    >
      <VStack
        minW={"27rem"}
        bg={PrimaryBgColor}
        spacing={8}
        textAlign="left"
        p={0}
        pb={5}
      >
        <Heading mt={5} color={TextColor} alignSelf={"center"}>
          New Definition
        </Heading>
        <HStack px={10} w={"100%"} alignItems={"center"}>
          <VStack flexGrow={1} alignSelf={"flex-start"} textAlign={"center"}>
            <Box w={"100%"} ml={10} p={3} pt={8}>
              <FormControl w={{ base: "90%", sm: "90%", md: "80%" }} mb={3}>
                <FormLabel>Arabic letters</FormLabel>
                <Input
                  type="text"
                  placeholder={"المصطلح"}
                  fontSize={"lg"}
                  onChange={handleTerm("arabic")}
                ></Input>
              </FormControl>
              <FormControl w={{ base: "90%", sm: "90%", md: "80%" }} mb={3}>
                <FormLabel>latin letters</FormLabel>
                <Input
                  type="text"
                  placeholder={"Word"}
                  fontSize={"lg"}
                  onChange={handleTerm("latin")}
                ></Input>
              </FormControl>
              <FormControl w={{ base: "90%", sm: "90%", md: "80%" }} mb={3}>
                <FormLabel>Type</FormLabel>
                <Select
                  onChange={ChangeType}
                  value={type}
                  bg={PrimaryBgColor}
                  maxWidth="2xl"
                  _hover={{ cursor: "pointer" }}
                >
                  <option value={"Term"}>Term</option>
                  <option value={"Proverb"}>Proverb</option>
                </Select>
              </FormControl>
              <FormControl display={{ md: "none" }} textAlign={"center"} mt={4}>
                <DialectsPopoverButton></DialectsPopoverButton>
              </FormControl>
            </Box>
          </VStack>
          <VStack
            flexGrow={1}
            display={{ base: "none", md: "block" }}
            alignSelf={"flex-start"}
          >
            <Box ml={10} p={3} pt={8}>
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
                      onChange={handleDefinition("arabic")}
                    ></DefinitionTextArea>
                  </FormControl>
                  <ExampleTextArea
                    onChange={handleExample("arabic")}
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
                      onChange={handleDefinition("english")}
                    ></DefinitionTextArea>
                  </FormControl>
                  <ExampleTextArea
                    onChange={handleExample("english")}
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
                      onChange={handleDefinition("french")}
                    ></DefinitionTextArea>
                  </FormControl>
                  <ExampleTextArea
                    onChange={handleExample("french")}
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
  );
};

export default CreatePost;
