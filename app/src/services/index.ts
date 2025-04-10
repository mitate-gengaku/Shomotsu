import { bookRepository, userRepository } from "@/repositories";
import { BookService } from "@/services/book";
import { UserService } from "@/services/user";

export const userService = new UserService(userRepository);

export const bookService = new BookService(bookRepository);
