import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  UnorderedList,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { IoIosFlag } from "react-icons/io";
import { Reason } from "../../data/enums";
import { useRef, useState } from "react";
import { CreateFlagInput, Flag, FlagOptionsRadioGroup, Post } from "../../data/types";
import { CREATE_FLAG_MUTATION } from "../../graphql/mutations/createFlagMutation";
import { useMutation } from "urql";

interface Props {
  styles: any;
  post: Post;
}

const ReportFlag = ({ styles, post }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [, createFlag] = useMutation(CREATE_FLAG_MUTATION);

  const [flag, setFlag] = useState<Flag>({
    reason: Reason.PRIVATE,
    content: "It includes someone's full name or other personal information",
    postId: post.id,
  });
  const [otherContent, setOtherContent] = useState<string>("");

  const flagTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const FLAG_OPTIONS: Array<FlagOptionsRadioGroup> = [
    {
      reason: Reason.PRIVATE,
      content: "It includes someone's full name or other personal information",
      postId: post.id,
    },
    {
      reason: Reason.OFFENSIVE,
      content: "It includes hate speech, bullying, or other hurtful comments",
      postId: post.id,
    },
    {
      reason: Reason.TABOO,
      content: "It conveys sensitive or inappropriate information",
      postId: post.id,
    },
    {
      reason: Reason.OTHER,
      content: "Other",
      postId: post.id,
    },
  ];

  const handleFlag = (e: any) => {
    const flagTextArea = flagTextAreaRef.current as HTMLTextAreaElement;
    flagTextArea.disabled = !(e.target.value === Reason.OTHER);
    setFlag(() => {
      return {
        ...flag,
        reason: e.target.value,
        content: e.target.content,
      } as Flag;
    });
  };

  const clearData = () => {
    setOtherContent("");
    setFlag(() => FLAG_OPTIONS[0] as Flag);
    onClose();
  };

  const reportDefinition = async () => {
    let createFlagInput: CreateFlagInput = {
      reason: flag.reason,
      content: flag.content,
      postId: post.id,
    };
    if (flag.reason === "OTHER") {
      createFlagInput = { ...createFlagInput, content: otherContent };
    }

    const report = await createFlag({ createFlagInput });
    if (!report.error) {
      return clearData();
    }
  };

  return (
    <>
      <Button
        mr={3}
        sx={styles}
        borderRightRadius="full"
        borderLeftRadius="full"
        onClick={onOpen}
      >
        <HStack spacing={2}>
          <Icon fontSize="15px" ml={-3} as={IoIosFlag}></Icon>
          <Text fontSize="10px" fontWeight="bold">
            Flag
          </Text>
        </HStack>
      </Button>

      <Modal size={"4xl"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Report Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems={"left"} gap={3}>
              <Heading ml={5}>
                Use this form to report definitions that...
              </Heading>
              <UnorderedList>
                <ListItem>Lorem ipsum dolor sit amet</ListItem>
                <ListItem>Consectetur adipiscing elit</ListItem>
                <ListItem>Integer molestie lorem at massa</ListItem>
                <ListItem>Facilisis in pretium nisl aliquet</ListItem>
              </UnorderedList>
              <Heading ml={5}>You chose:</Heading>
              <VStack alignItems={"left"}>
                <HStack>
                  <Text>Arabic term: </Text>
                  <Text _firstLetter={{ textTransform: "uppercase" }}>
                    {post.titleArabic}
                  </Text>
                </HStack>
                <HStack>
                  <Text>Latin term: </Text>
                  <Text _firstLetter={{ textTransform: "uppercase" }}>
                    {post.titleLatin}
                  </Text>
                </HStack>
                <HStack>
                  <Text>By: </Text>
                  <Text _firstLetter={{ textTransform: "uppercase" }}>
                    {post.author.username}
                  </Text>
                </HStack>
              </VStack>
              <Heading ml={5}>Why should this definition be removed?</Heading>
              <Box>
                <RadioGroup
                  // onChange={handleFlag}
                  defaultValue={Reason.PRIVATE}
                  colorScheme="green"
                >
                  <VStack spacing={2} alignItems={"left"} mb={2}>
                    {FLAG_OPTIONS.map((option) => {
                      return (
                        <Radio
                          key={option.reason}
                          value={option.reason}
                          {...option}
                          onChange={handleFlag}
                        >
                          {option.content}
                        </Radio>
                      );
                    })}
                  </VStack>
                </RadioGroup>
                <Textarea
                  isDisabled
                  value={otherContent}
                  ref={flagTextAreaRef}
                  onChange={(e) => setOtherContent(e.target.value)}
                  placeholder="Type an example of how it's used in a sentence..."
                />
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button colorScheme="blue" mr={3} onClick={clearData}>
              Close
            </Button>
            <Button colorScheme="yellow" onClick={reportDefinition}>
              Report Definition
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

ReportFlag.propTypes = {};

export default ReportFlag;
