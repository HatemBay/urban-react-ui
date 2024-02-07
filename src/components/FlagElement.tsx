import Flags from "country-flag-icons/react/3x2";
import React from "react";
import { dialectCodesArray } from "../data/constants";

export type DialectCode = (typeof dialectCodesArray)[number];

export const FlagElement = (dialectCode: DialectCode) => {
  const flagComponent = Flags[dialectCode];
  if (!flagComponent) {
    console.error(`Flag component for ${dialectCode} not found.`);
    return null;
  }
  return React.createElement(flagComponent, { style: { width: "20px" } });
};
