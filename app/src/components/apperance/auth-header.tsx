import Link from "next/link";
import { ReactNode } from "react";

import { Sidebar } from "@/components/apperance/sidebar";
import { getBooks } from "@/features/book/services/get-books";

export const AuthHeader = async ({
  children,
}: {
  children?: Readonly<ReactNode>;
}) => {
  const {books} = await getBooks();

  return (
    <header
      className="w-full fixed top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
      data-testid="auth-header"
    >
      <div className="w-full mx-auto px-4 py-3 flex items-center justify-start gap-3">
        <Sidebar books={books} />
        <h1 className="text-sm font-manrope font-semibold">
          <Link href={"/home"}>Shomotsu</Link>
        </h1>
        <div className="flex items-center gap-2 ml-auto">{children}</div>
      </div>
    </header>
  );
};
