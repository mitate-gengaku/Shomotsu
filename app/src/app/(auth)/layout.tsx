import { HomeIcon } from "lucide-react";

import { AuthHeader } from "@/components/layout/auth-header";
import { Button } from "@/components/ui/button";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div
      className="flex flex-col min-h-screen bg-white dark:bg-slate-950"
      data-testid="auth-layout"
    >
      <AuthHeader />

      <main className="flex-1 w-full lg:w-1/2 mx-auto px-4 pt-[calc(4rem+60px)] pb-20 lg:pb-0">
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

export default AuthLayout;
