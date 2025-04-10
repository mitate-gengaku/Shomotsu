import { BookRepository } from "@/repositories/book";
import { UserRepository } from "@/repositories/user";

export const userRepository = new UserRepository();

export const bookRepository = new BookRepository();
