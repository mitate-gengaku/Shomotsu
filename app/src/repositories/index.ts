import { BookRepository } from "@/repositories/book";
import { CategoryRepository } from "@/repositories/category";
import { ChapterRepository } from "@/repositories/chapters";
import { UserRepository } from "@/repositories/user";

export const userRepository = new UserRepository();

export const bookRepository = new BookRepository();

export const categoryRepository = new CategoryRepository();

export const chapterRepository = new ChapterRepository();
