import { UserType } from "@/lib/db/type";
import { UserRepository } from "@/repositories/user";
import { UpdateUserValues } from "@/types/user";

export class UserService {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(values: UserType) {
    return this.userRepository.create(values);
  }

  async update(id: string, values: UpdateUserValues) {
    return this.userRepository.update(id, values);
  }
}
