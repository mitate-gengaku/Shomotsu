import { LibraryPageClient } from "@/features/book/clients/library-page-client"
import { getBooks } from "@/features/book/services/get-books"

interface Props {
  page: number;
}

export const LibraryPage = async ({ page }: Props) => {
  const {books, nextPage, prevPage} = await getBooks(page)

  return (
    <LibraryPageClient 
      books={books}
      nextPage={nextPage}
      prevPage={prevPage}
      />
  )
}