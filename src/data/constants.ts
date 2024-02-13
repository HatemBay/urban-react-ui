import { GlobalColors } from "../utils/interfaces/globalColors";
import { DialectCode, FlagElement } from "../components/FlagElement";
import { Dialect, FlagOptionsRadioGroup, GenderOptions } from "./types";
import { Gender, Reason } from "./enums";

// TODO: rename the colors
export const SHARED_COLORS: GlobalColors = {
  PrimaryBgColor: { light: "white", dark: "gray.800" },
  SecondaryBgColor: { light: "gray.300", dark: "gray.600" },
  TextColor: { light: "gray.800", dark: "white" },
  ButtonPrimary: { light: "#758BFD", dark: "#758BFD" },
  ButtonSecondary: { light: "#4361FC", dark: "#4361FC" },
  // LikeButtonHover: { light: "#758BFD" , dark: "#758BFD" },
};

// TODO: complete with all arabic dialects
export const dialectCodesArray = ["TN", "EG"] as const;

const dialectCodes: DialectCode[] = dialectCodesArray.flatMap((code) => [code]);

export const DIALECT_ITEMS: Array<Dialect> = dialectCodes.map((code) => ({
  label: code,
  dialect: `${code} Dialect`, // TODO: add from db after dialects table is created
  country: `${code} Country`, // TODO: add from db after dialects table is created
  flag: FlagElement(code),
}));

export const FLAG_OPTIONS: Array<FlagOptionsRadioGroup> = [
  {
    reason: Reason.PRIVATE,
    content: "It includes someone's full name or other personal information",
  },
  {
    reason: Reason.OFFENSIVE,
    content: "It includes hate speech, bullying, or other hurtful comments",
  },
  {
    reason: Reason.TABOO,
    content: "It conveys sensitive or inappropriate information",
  },
  {
    reason: Reason.OTHER,
    content: "Other",
  },
];

export const GENDER_OPTIONS: Array<GenderOptions> = [
  {
    gender: Gender.NONE,
    content: "",
  },
  {
    gender: Gender.MALE,
    content: Gender.MALE,
  },
  {
    gender: Gender.FEMALE,
    content: Gender.FEMALE,
  },
];

export const BACKEND_URL = "http://localhost:3001/graphql";
