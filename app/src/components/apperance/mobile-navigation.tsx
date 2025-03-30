"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"
import { HomeIcon, LibraryBigIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 md:hidden flex items-center justify-center py-2 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400"
        asChild
      >
        <Link 
          href={"/home"}
          className={cn(
            pathname === "/home" && "bg-slate-300/20 [&>svg]:stroke-2 [&>svg]:stroke-gray-800",
          )}
          >
          <HomeIcon 
            size={18}
            />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400"
      >
        <Link 
          href={"/library"}
          className={cn(
            pathname === "/library" && "bg-slate-300/20 [&>svg]:stroke-2 [&>svg]:stroke-gray-800",
          )}
          >
          <LibraryBigIcon size={18} />
        </Link>
      </Button>
    </nav>
  )
}