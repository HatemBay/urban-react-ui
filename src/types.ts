export interface Post {
  id?: number;
  title: string;
  content: string;
  author_id?: number;
  author: User;
  published?: boolean;
  is_u_18?: boolean;
  email_verified?: boolean;
  likes_count?: number;
  dislikes_count?: number;
  created_at: string;
  updated_at?: string;
}

export interface User {
  id?: number;
  username: string;
  email: string;
  name?: string;
  country_id?: number;
  role?: string;
  is_u_18?: boolean;
  email_verified?: boolean;
  google_id?: string;
  created_at: string;
  updated_at?: string;
}
