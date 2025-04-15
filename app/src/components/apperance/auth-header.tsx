import { auth } from "@clerk/nextjs/server";
import { CompassIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { Sidebar } from "@/components/apperance/sidebar";
import { Button } from "@/components/ui/button";
import { bookService } from "@/services";

export const AuthHeader = async ({ children }: { children?: Readonly<ReactNode> }) => {
  const { userId } = await auth();
  const books = await bookService.getMyBooks(userId);

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
        <Button
          variant={"outline"}
          size={"icon"}
          className="hidden md:flex ml-auto [&_svg]:size-5 text-gray-700"
          asChild
        >
          <Link href={"/explore"}>
            <CompassIcon />
          </Link>
        </Button>
        <div className={"flex items-center gap-2 ml-auto md:ml-0"}>{children}</div>
      </div>
    </header>
  );
};
