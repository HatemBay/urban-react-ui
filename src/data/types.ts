import { AnyVariables, UseQueryExecute, UseQueryState } from "urql";
import { Reason } from "./enums";

export type Post = {
  id: number;
  titleArabic: string;
  titleLatin: string;
  contentArabic: string;
  contentEnglish: string;
  contentFrench: string;
  authorId?: number;
  author: User;
  example: Example;
  published?: boolean;
  isU18?: boolean;
  likesCount: number;
  dislikesCount: number;
  createdAt: string;
  updatedAt?: string;
  likedBy: User[];
  dislikedBy: User[];
};

export type PaginatedPosts = {
  posts: {
    pagination: {
      totalCount: number;
    };
    data: Post[];
  };
};

export type GoogleInfo = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
};

export type User = {
  id?: number;
  username: string;
  email: string;
  name?: string;
  countryId?: number;
  role?: string;
  isU18?: boolean;
  profilePicture: string;
  emailVerified?: boolean;
  googleId?: string;
  googleProfile?: GoogleInfo;
  createdAt: string;
  updatedAt?: string;
};

export type AuthInfo = {
  sub: number;
  username: string;
  role: string;
  iat: number;
  exp: number;
};

export type UserInfo = User & AuthInfo;

export interface Example {
  id?: number;
  contentArabic: string;
  contentEnglish: string;
  contentFrench: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Flag {
  id?: number;
  reason: Reason;
  content: string;
  postId: number;
  userId: number;
  createdAt?: string;
}

export type FlagOptionsRadioGroup = {
  reason: Reason;
  content: string;
};

export type LoginUserInput = {
  username: string;
  password: string;
};

export type FindUserInput = {
  id?: number;
};

export type CreateFlagInput = {
  reason: Reason;
  content: string;
  postId: number;
  userId: number;
};

export type FindPostInput = {
  id: number;
};

export type Language = {
  arabic: string;
  english: string;
  french: string;
};

export type TermForm = {
  arabic: string;
  latin: string;
};

export type Dialect = {
  label: string;
  dialect: string;
  country: string;
  flag: JSX.Element | null;
};

export type ResultContextType = {
  posts: UseQueryState<PaginatedPosts, AnyVariables> | null;
};
export type ReexecuteContextType = {
  reexecutePostsQuery: UseQueryExecute | null;
};
