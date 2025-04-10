import Link from "next/link";

import { FormatDate } from "@/components/format/date";
import { Book } from "@/types/book";

interface Props {
  books: Book[];
}

export const DesktopBookList = ({ books }: Props) => {
  return (
    <div className="w-full hidden md:grid grid-cols-4 gap-4 pb-2 mb-8">
      {books.map((book) => (
        <div key={book.id} className="min-w-36 group" data-testid="book-card">
          <Link href={`/book/${book.slug}`} className="space-y-2">
            <div
              className="w-full lg:mx-0 rounded-lg shadow-lg relative"
              style={{
                boxShadow:
                  "10px 15px 22px -5px rgba(0, 0, 0, 0.2), 2px 4px 6px rgba(0, 0, 0, 0.15)",
              }}
            >
              {book.cover ? (
                <img
                  src={"https://placehold.co/100x150"}
                  alt={`${book.title}の表紙`}
                  className="w-full rounded-lg"
                  data-testid="book-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-300 dark:bg-gray-400 rounded-lg flex flex-row-reverse justify-between p-3 select-none">
                  <h3 className="font-bold dark:text-gray-800 text-2xl lg:text-3xl [writing-mode:vertical-rl]">
                    {book.title}
                  </h3>
                </div>
              )}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  background:
                    "linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0.4) 94%, rgba(255, 255, 255, 0.5) 96%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
            </div>
            <h4 className="font-medium text-sm md:text-base leading-tight">
              {book.title}
            </h4>
            <FormatDate
              date={book.createdAt}
              className="text-xs text-muted-foreground"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
