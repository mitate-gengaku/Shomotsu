import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export const Header = () => (
  <header
    className="w-full fixed top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
    data-testid="header"
  >
    <div className="w-full max-w-[1280px] max-h-[60px] h-[60px] mx-auto px-4 py-3 flex items-center justify-start gap-3">
      <h1 className="font-manrope font-semibold">
        <Link href={"/"}>Shomotsu</Link>
      </h1>
      <div className="flex items-center gap-4 ml-auto">
        <Button variant={"outline"} className="transition-all" asChild>
          <SignInButton>
            ログイン
          </SignInButton>
        </Button>
        <Button
          variant={"default"}
          className="bg-teal-500 hover:bg-teal-600 transition-all"
          asChild
          >
          <SignUpButton>
            今すぐ始める
          </SignUpButton>
        </Button>
      </div>
    </div>
  </header>
);
