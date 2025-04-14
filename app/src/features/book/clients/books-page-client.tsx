"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DesktopBookList } from "@/features/book/components/desktop-book-list";
import { MobileBookList } from "@/features/book/components/mobile-book-list";
import { Book } from "@/types/book";

interface Props {
  books: Book[];
  prevPage?: number;
  nextPage?: number;
  title?: string;
}

export const BooksPageClient = ({ books, prevPage, nextPage, title = "新作" }: Props) => {
  return (
    <div className="w-full lg:w-1/2 mx-auto md:pb-12 relative space-y-8">
      <h2 className="text-xl lg:text-2xl font-semibold">{title}</h2>
      {!books.length && <p>本はまだありません</p>}

      <MobileBookList books={books} />

      <DesktopBookList books={books} />

      <div className="flex items-center justify-center gap-4">
        {typeof prevPage === "number" && (
          <Button variant={"outline"} asChild>
            <Link href={`/explore?page=${prevPage}`}>前のページ</Link>
          </Button>
        )}
        {typeof nextPage === "number" && (
          <Button className="bg-teal-500 hover:bg-teal-600 transition-all" asChild>
            <Link href={`/explore?page=${nextPage}`}>次のページ</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
