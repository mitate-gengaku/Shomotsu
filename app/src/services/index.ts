import { userRepository } from "@/repositories";
import { UserService } from "@/services/user";

export const userService = new UserService(userRepository);
