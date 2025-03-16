import { IconKeyType } from "@/features/book/config/icons";

export interface IBook {
  id: string;
  title: string;
  user_id: string;
  user: {
    name: string;
    avatar: string;
  };
  cover: string;
  content: string;
  publish: boolean;
  categories: {
    title: string;
    icon: IconKeyType;
  }[];
  created_at: string;
  updated_at: string;
}
