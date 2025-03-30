import { LibraryPage } from "@/features/book/pages/library-page";

interface Props {
  searchParams: Promise<{
    page: string
  }>
}

const Library = async ({ searchParams }: Props) => {
  const { page = "1" } = await searchParams

  return (
    <LibraryPage
      page={parseInt(page)}
    />
  )
}

export default Library;