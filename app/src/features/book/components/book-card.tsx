import Link from "next/link";

import { FormatDate } from "@/components/format/date";
import { cn } from "@/utils/cn";

interface Props {
  bookId: string;
  bookTitle: string;
  bookSlug: string;
  bookCover: string | null;
  bookCreatedAt: Date;
}

export const BookCardLink = ({
  bookId,
  bookTitle,
  bookSlug,
  bookCover,
  bookCreatedAt,
}: Props) => {
  return (
    <div
      key={bookId}
      className={cn("group lg:min-w-36")}
      data-testid="book-card"
    >
      <Link href={`/book/${bookSlug}`} className={"space-y-4"}>
        <div
          className="w-full lg:mx-0 rounded-lg shadow-lg relative"
          style={{
            boxShadow:
              "10px 15px 22px -5px rgba(0, 0, 0, 0.2), 2px 4px 6px rgba(0, 0, 0, 0.15)",
          }}
        >
          {bookCover ? (
            <img
              src={"https://placehold.co/100x150"}
              alt={`${bookTitle}の表紙`}
              className="w-full rounded-lg"
              data-testid="book-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 dark:bg-gray-400 rounded-lg flex flex-row-reverse justify-between p-3 select-none">
              <h3
                className={cn(
                  "font-bold dark:text-gray-800 text-3xl [writing-mode:vertical-rl]",
                )}
              >
                {bookTitle}
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
        <h4 className={cn("font-medium text-sm leading-tight md:text-base")}>
          {bookTitle}
        </h4>
        <FormatDate
          date={bookCreatedAt}
          className="text-xs text-muted-foreground"
        />
      </Link>
    </div>
  );
};
