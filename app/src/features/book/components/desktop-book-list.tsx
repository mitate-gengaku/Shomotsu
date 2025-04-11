import { BookCardLink } from "@/features/book/components/book-card";
import { Book } from "@/types/book";

interface Props {
  books: Book[];
}

export const DesktopBookList = ({ books }: Props) => {
  return (
    <div className="w-full hidden md:grid grid-cols-4 gap-4 pb-2 mb-8">
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
