import { HomeIcon } from "lucide-react";

import { AuthHeader } from "@/components/apperance/auth-header";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/features/auth/components/user-dropdown";

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
        className="flex flex-col px-4 pt-[calc(4rem+60px)] pb-20 lg:pb-0"
        data-testid="main"
      >
        {children}
      </main>

      <nav className="fixed bottom-0 inset-x-0 md:hidden flex items-center justify-around py-2 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <HomeIcon size={18} />
        </Button>
      </nav>
    </div>
  );
};
