import { type } from "os";

export type Post = {
  id?: number;
  title: string;
  content: string;
  authorId?: number;
  author: User;
  published?: boolean;
  isU18?: boolean;
  likesCount?: number;
  dislikesCount?: number;
  createdAt: string;
  updatedAt?: string;
};

export type PaginatedPosts = {
  posts: {
    pagination: {
      totalCount: number;
    };
    data: Post[];
  };
};

export interface User {
  id?: number;
  username: string;
  email: string;
  name?: string;
  countryId?: number;
  role?: string;
  isU18?: boolean;
  emailVerified?: boolean;
  googleId?: string;
  createdAt: string;
  updatedAt?: string;
}

export type LoginUserInput = {
  username: string;
  password: string;
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
  flag?: any;
  value?: string;
};
