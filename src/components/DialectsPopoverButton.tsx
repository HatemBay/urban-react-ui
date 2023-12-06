import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Dialect } from "../data/types";
import Flags from "country-flag-icons/react/3x2";
import { useState } from "react";

interface Props {}

// TODO: complete with all arabic dialects
const DIALECT_ITEMS: Array<Dialect> = [
  {
    label: "TN",
    dialect: "Tunisian",
    flag: <Flags.TN style={{ width: "20px" }} />,
  },
  {
    label: "EG",
    dialect: "Egyptian",
    flag: <Flags.EG style={{ width: "20px" }} />,
  },
];

const DialectsPopoverButton = (props: Props) => {
  const [dialects, setDialects] = useState<Array<Dialect>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelectDialects = (e: any) => {
    if (e.target.checked) {
      setDialects([
        ...dialects,
        DIALECT_ITEMS.find((dialect) => dialect.label === e.target.value)!,
      ]);
    } else {
      setDialects(
        DIALECT_ITEMS.filter((dialect) => dialect.label !== e.target.value)
      );
    }
  };

  return (
    <>
      <FormControl mb={3}>
        <FormLabel>Dialect(s)*</FormLabel>
        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          trigger={"click"}
          placement={"bottom-start"}
        >
          <PopoverTrigger>
            <Button
              border={"gray.200"}
              // role="group"
              p={2}
              fontSize={"sm"}
              fontWeight={900}
              // color={"blue"}
              _hover={{
                textDecoration: "none",
                // color: "red",
              }}
            >
              Choose
            </Button>
          </PopoverTrigger>

          <PopoverContent
            border={0}
            boxShadow={"xl"}
            // bg={popoverContentBgColor}
            p={4}
            rounded={"xl"}
            minW={"100%"}
          >
            <Flex alignContent={"center"} direction={"column"} gap={2}>
              {DIALECT_ITEMS.map((element) => (
                <Checkbox
                  minH={"30px"}
                  colorScheme="blue"
                  onSelect={handleSelectDialects}
                >
                  <HStack>
                    {element.flag}
                    <Text>{element.dialect}</Text>
                  </HStack>
                </Checkbox>
              ))}
            </Flex>
          </PopoverContent>
        </Popover>
      </FormControl>
    </>
  );
};
export default DialectsPopoverButton;
