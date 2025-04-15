"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { redis } from "@/lib/redis";

export const add = async (bookId: string, bookMarked: boolean, slug: string) => {
  const { userId } = await auth();
  const key = `user:${userId}:bookmarks`;

  try {
    if (bookMarked) {
      await redis.srem(key, bookId);
    } else {
      await redis.sadd(key, bookId);
    }

    revalidatePath(`/book/${slug}`);

    return;
  } catch (e) {
    throw e;
  }
};
