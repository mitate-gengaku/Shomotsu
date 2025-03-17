import { Spinner } from "@/components/loading/spinner"
import { ExploreClientPage } from "@/features/book/client/explore-page"
import { getExploreBooks } from "@/features/book/services/explore-books"
import { IBook } from "@/types/book"

export const ExploreBook = async () => {
  const books: IBook[] = await getExploreBooks()

  return (
    <ExploreClientPage books={books} />
  )
}