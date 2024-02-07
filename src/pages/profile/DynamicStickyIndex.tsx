import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  bg: string;
};

const DynamicStickyIndex = ({ bg }: Props) => {
  const [isSticky, setIsSticky] = useState(false);
  const threshold = 197;

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= threshold);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return (
    <Box
      __css={{
        position: isSticky ? "fixed" : "relative",
        top: isSticky ? 0 : "auto",
        width: "100%",
        transition: "position 0.3s ease",
      }}
      id="slm"
      width={"fit-content"}
    >
      <HStack spacing={5} mb={4}>
        <Heading
          minW={"fit-content"}
          fontWeight={"medium"}
          textAlign={"left"}
          pl={2}
        >
          Settings
        </Heading>
        <Divider
        // borderColor={TextColor}
        ></Divider>
      </HStack>
      <VStack
        bg={bg}
        p={4}
        minH={"60em"}
        mb={5}
        borderRadius={"lg"}
        shadow={"2xl"}
      >
        <InputGroup>
          <InputLeftElement>
            <Search2Icon color={"gray.300"} fontSize={"2xl"}></Search2Icon>
          </InputLeftElement>
          <Input color={"gray.900"} placeholder="Search"></Input>
        </InputGroup>
      </VStack>
    </Box>
  );
};

export default DynamicStickyIndex;
