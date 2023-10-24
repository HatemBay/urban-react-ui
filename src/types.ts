export interface Post {
  id?: number;
  title: string;
  content: string;
  author_id?: number;
  published?: boolean;
  is_u_18?: boolean;
  email_verified?: boolean;
  likes_count?: number;
  dislikes_count?: number;
  created_at: string;
  updated_at?: string;
}
