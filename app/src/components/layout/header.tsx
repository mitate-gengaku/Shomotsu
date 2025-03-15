import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => (
  <header
    className="w-full fixed top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
    data-testid="header"
  >
    <div className="w-full mx-auto px-4 sm:px-6 py-3 flex items-center justify-start gap-3">
      <h1 className="font-manrope font-semibold">
        <Link href={"/home"}>Shomotsu</Link>
      </h1>
      <div className="flex items-center gap-4 ml-auto">
        <Button
          variant={"outline"}
          className="transition-all"
          >
          ログイン
        </Button>
        <Button
          variant={"default"}
          className="bg-teal-500 hover:bg-teal-600 transition-all"
          >
          利用を開始する
        </Button>
      </div>
    </div>
  </header>
)