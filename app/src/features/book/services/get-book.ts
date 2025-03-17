"use server";

import { redirect } from "next/navigation";

import { IBook } from "@/types/book";

export const getBook = async (bookId: string) => {
  const res = await fetch(`http://localhost:3000/api/books/${bookId}`);
  const book: IBook = await res.json();

  if (!book) {
    redirect("/not-found");
  }

  return book;
};
