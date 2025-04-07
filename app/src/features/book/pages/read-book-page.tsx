import { getBook } from "@/features/book/services/get-book";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import rehypeSanitize from "rehype-sanitize"
import { ReadBookPageClient } from "@/features/book/clients/read-book-page-client";


interface Props {
  slug: string;
}

export const ReadBookPage = async ({ slug }: Props) => {
  const { book } = await getBook(slug);

  return (
    <ReadBookPageClient 
      content={book.content}
      />
  )
}