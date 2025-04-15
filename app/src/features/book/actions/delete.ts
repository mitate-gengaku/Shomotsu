"use server";

import { auth } from "@clerk/nextjs/server";

import { bookService } from "@/services";

export const deleteBook = async (bookId: string): Promise<string> => {
  const { userId } = await auth();

  return await bookService.delete(userId, bookId);
};
