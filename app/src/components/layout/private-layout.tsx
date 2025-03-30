import { HomeIcon, LibraryBigIcon } from "lucide-react";

import { AuthHeader } from "@/components/apperance/auth-header";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/features/auth/components/user-dropdown";
import Link from "next/link";
import { MobileNav } from "@/components/apperance/mobile-navigation";

export const PrivateLayoutUI = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div
      className="flex flex-col min-h-screen bg-white dark:bg-slate-950"
      data-testid="auth-layout"
    >
      <AuthHeader>
        <UserDropdown />
      </AuthHeader>

      <main
        className="flex flex-col px-4 pt-[calc(4rem+60px)] h-full pb-20 lg:pb-0"
        data-testid="main"
      >
        {children}
      </main>

      <MobileNav />
    </div>
  );
};
