import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  useToast,
} from "@chakra-ui/react";
import { IoIosFlag } from "react-icons/io";
import { Reason } from "../../data/enums";
import { useRef, useState } from "react";
import { CreateFlagInput, Flag, Post } from "../../data/types";
import { CREATE_FLAG_MUTATION } from "../../graphql/mutations/createFlagMutation";
import { useMutation } from "urql";
import { getUserInfo } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { FLAG_OPTIONS } from "../../data/constants";
import customToast from "../../utils/facades/customToast";

interface Props {
  styles: any;
  post: Post;
}

const ReportFlag = ({ styles, post }: Props) => {
  const userInfo = getUserInfo();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirmDialog,
    onOpen: onOpenConfirmDialog,
    onClose: onCloseConfirmDialog,
  } = useDisclosure();
  const {
    isOpen: isOpenRedirectDialog,
    onOpen: onOpenRedirectDialog,
    onClose: onCloseRedirectDialog,
  } = useDisclosure();

  const [, createFlag] = useMutation(CREATE_FLAG_MUTATION);

  const [flag, setFlag] = useState<Flag>({
    reason: Reason.PRIVATE,
    content: "It includes someone's full name or other personal information",
    postId: post.id,
    userId: userInfo?.sub,
  });
  const [otherContent, setOtherContent] = useState<string>("");

  const flagTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const cancelConfirmRef = useRef<any>();
  const cancelRedirectRef = useRef<any>();

  const handleOpenModal = () => {
    userInfo ? onOpenModal() : onOpenRedirectDialog();
  };

  const goTo = (url: string) => {
    return navigate(url);
  };

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
    onCloseConfirmDialog();
    return onCloseModal();
  };

  const reportDefinition = async () => {
    let createFlagInput: CreateFlagInput = {
      reason: flag.reason,
      content: flag.content,
      postId: post.id,
      userId: userInfo?.sub,
    };
    if (flag.reason === "OTHER") {
      createFlagInput = { ...createFlagInput, content: otherContent };
    }

    const report = createFlag({ createFlagInput });
    customToast(
      toast,
      report,
      "Your report has been submitted, thank you!",
      "Something went wrong... please try again later"
    );
    clearData();
  };

  return (
    <>
      <Button
        mr={3}
        sx={styles}
        borderRightRadius="full"
        borderLeftRadius="full"
        onClick={handleOpenModal}
      >
        <HStack spacing={2}>
          <Icon fontSize="15px" ml={-3} as={IoIosFlag}></Icon>
          <Text fontSize="10px" fontWeight="bold">
            Flag
          </Text>
        </HStack>
      </Button>

      <Modal
        size={"4xl"}
        isOpen={isOpenModal}
        onClose={onCloseModal}
        isCentered
      >
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
                <RadioGroup defaultValue={Reason.PRIVATE} colorScheme="green">
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
            <Button colorScheme="yellow" onClick={onOpenConfirmDialog}>
              Report Definition
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isOpenConfirmDialog}
        leastDestructiveRef={cancelConfirmRef}
        onClose={onCloseConfirmDialog}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Report Definition
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelConfirmRef} onClick={onCloseConfirmDialog}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={reportDefinition} ml={3}>
                Report
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isOpenRedirectDialog}
        leastDestructiveRef={cancelRedirectRef}
        onClose={onCloseRedirectDialog}
        isCentered
        size={"xl"}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Sign In required
            </AlertDialogHeader>

            <AlertDialogBody mb={3}>
              You must be signed in to report a definition.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRedirectRef} onClick={onCloseRedirectDialog}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => goTo("/sign-up")}
                ml={3}
              >
                Sign Up
              </Button>
              <Button
                colorScheme="green"
                onClick={() => goTo("/sign-in")}
                ml={3}
                px={2}
              >
                Sign In
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

ReportFlag.propTypes = {};

export default ReportFlag;
