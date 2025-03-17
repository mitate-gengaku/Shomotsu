"use server";

import { redirect } from "next/navigation";

import { IBook } from "@/types/book";

export const getExploreBooks = async () => {
  const res = await fetch(`http://localhost:3000/api/explore`);
  const books: {books: IBook[]} = await res.json();

  return books.books;
};
