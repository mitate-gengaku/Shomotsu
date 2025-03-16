export const getBook = async (bookId: string) => {
  const res = await fetch(`http://localhost:3000/api/books/${bookId}`);
  const book = await res.json();

  return book;
};
