import { UserType } from "@/lib/db/type";

export type User = Required<UserType>;
export type UpdateUserValues = Partial<Pick<UserType, "username" | "imageUrl">>;
