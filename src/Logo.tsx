<<<<<<< HEAD
import * as React from "react";
import { chakra, ImageProps, forwardRef } from "@chakra-ui/react";
import logo from "./logo.svg";

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  return <chakra.img src={logo} ref={ref} {...props} />;
});
=======
import * as React from "react";
import { chakra, ImageProps, forwardRef } from "@chakra-ui/react";
import logo from "./logo.svg";

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  return <chakra.img src={logo} ref={ref} {...props} />;
});
>>>>>>> 846f6cb141ed49dc7a2547f910356b8ffe19a2b7
