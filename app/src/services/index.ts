import { bookRepository, categoryRepository, chapterRepository, userRepository } from "@/repositories";
import { BookService } from "@/services/book";
import { CategoryService } from "@/services/category";
import { ChapterService } from "@/services/chapter";
import { UserService } from "@/services/user";

export const userService = new UserService(userRepository);

export const bookService = new BookService(bookRepository);

export const categoryService = new CategoryService(categoryRepository);

export const chapterService = new ChapterService(chapterRepository);
