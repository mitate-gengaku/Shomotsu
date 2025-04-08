import { ReadBookPageClient } from "@/features/book/clients/read-book-page-client";
import { getBook } from "@/features/book/services/get-book";

interface Props {
  slug: string;
}

export const ReadBookPage = async ({ slug }: Props) => {
  const { book } = await getBook(slug);

  return (
    <ReadBookPageClient
      title={book.title}
      content={book.content}
      slug={book.slug}
    />
  );
};
