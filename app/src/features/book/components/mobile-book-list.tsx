import { BookCardLink } from "@/features/book/components/book-card";
import { Book } from "@/types/book";

interface Props {
  books: Book[];
}

export const MobileBookList = ({ books }: Props) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4 md:hidden mb-8">
      {books.map((book) => (
        <BookCardLink
          key={book.id}
          bookId={book.id}
          bookTitle={book.title}
          bookSlug={book.slug}
          bookCover={book.cover}
          bookCreatedAt={book.createdAt}
        />
      ))}
    </div>
  );
};
