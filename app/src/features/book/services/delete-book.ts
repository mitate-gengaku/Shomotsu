"use server";

export const deleteBook = async (bookId: string) => {
  const res = await fetch(`http://localhost:3000/api/books/${bookId}`, {
    method: "DELETE",
  });
  const response: { message: string } = await res.json();

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return response;
};
