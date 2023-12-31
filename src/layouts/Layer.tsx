import { Box, Grid, useColorModeValue } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

type Props = {
  children: any;
};

const Layer = ({ children }: Props) => {
  return (
    <Box
      // maxW={{ xs: "50%" }}
      // alignSelf={"center"}
      textAlign="center"
      // fontSize="3xl"
      bg={useColorModeValue("gray.100", "gray.700")}
    >
      <Grid minH={"3xl"} p={3}>
        <ColorModeSwitcher
          my={1}
          color={"black"}
          bg={useColorModeValue("gray.300", "gray.600")}
          justifySelf={{ md: "flex-end", base: "center" }}
        />
        {children}
      </Grid>
    </Box>
  );
};
export default Layer;
