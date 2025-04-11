import { auth } from "@clerk/nextjs/server";

import { ReadBookPageClient } from "@/features/book/clients/read-book-page-client";
import { bookService } from "@/services";

interface Props {
  slug: string;
}

export const ReadBookPage = async ({ slug }: Props) => {
  const { userId } = await auth();
  const book = await bookService.getBookDetail(userId, slug);

  return (
    <ReadBookPageClient
      title={book.title}
      content={book.content}
      slug={book.slug}
    />
  );
};
