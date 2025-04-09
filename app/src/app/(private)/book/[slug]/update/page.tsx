import React from "react";

import { UpdateBookPage } from "@/features/book/pages/update-book-page";

interface Props {
  params: Promise<{ slug: string }>;
}

const UpdateBook = async ({ params }: Props) => {
  const { slug } = await params;

  return <UpdateBookPage slug={slug} />;
};

export default UpdateBook;
