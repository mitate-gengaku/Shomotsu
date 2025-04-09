import { ReadBookPage } from "@/features/book/pages/read-book-page";

interface Props {
  params: Promise<{ slug: string }>;
}

const ReadBook = async ({ params }: Props) => {
  const { slug } = await params;

  return <ReadBookPage slug={slug} />;
};

export default ReadBook;
