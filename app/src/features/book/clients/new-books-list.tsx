import Link from "next/link";

import { FormatDate } from "@/components/format/date";
import { Button } from "@/components/ui/button";
import { getExploreBooks } from "@/features/book/services/get-explore-books";

interface Props {
  page: number;
}

export const NewBooksList = async ({ page }: Props) => {
  const { books, nextPage, prevPage } = await getExploreBooks(page);

  return (
    <>
      <div className="w-full grid grid-cols-2 gap-4 md:hidden mb-8">
        {books.map((book) => (
          <div key={book.id} className="group" data-testid="book-card">
            <Link href={`/book/${book.slug}`}>
              <div
                className="relative aspect-[2/3] mb-2 rounded-lg overflow-hidden group-hover:shadow-md transition-shadow"
                style={{
                  boxShadow:
                    "10px 15px 15px -5px rgba(0, 0, 0, 0.2), 2px 4px 6px rgba(0, 0, 0, 0.15)",
                }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none rounded-lg"
                  style={{
                    background:
                      "linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0.4) 94%, rgba(255, 255, 255, 0.5) 96%, rgba(255, 255, 255, 0) 100%)",
                  }}
                />
              </div>
              <h4 className="font-medium text-sm leading-tight">
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

      {/* Tablet and desktop view */}
      <div className="w-full hidden md:grid grid-cols-4 gap-6 pb-2 mb-8">
        {books.map((book) => (
          <div key={book.id} className="min-w-36 group" data-testid="book-card">
            <Link href={`/book/${book.slug}`}>
              <div
                className="relative aspect-[2/3] mb-3 rounded-lg overflow-hidden group-hover:shadow-md transition-shadow"
                style={{
                  boxShadow:
                    "0px 15px 22px -5px rgba(0, 0, 0, 0.2), 0px 0px 2px rgba(0, 0, 0, 0.15)",
                }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
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
      <div className="flex items-center justify-center gap-4">
        {typeof prevPage === "number" && (
          <Button variant={"outline"} asChild>
            <Link href={`/explore?page=${prevPage}`}>前のページ</Link>
          </Button>
        )}
        {typeof nextPage === "number" && (
          <Button
            className="bg-teal-500 hover:bg-teal-600 transition-all"
            asChild
          >
            <Link href={`/explore?page=${nextPage}`}>次のページ</Link>
          </Button>
        )}
      </div>
    </>
  );
};
