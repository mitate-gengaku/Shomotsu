import { redis } from "@/lib/redis";

export const checkBookMarked = async (userId: string | null, bookId: string) => {
  const key = `user:${userId}:bookmarks`;

  return await redis.sismember(key, bookId);
};
