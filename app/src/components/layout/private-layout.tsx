import { AuthHeader } from "@/components/apperance/auth-header";
import { MobileNav } from "@/components/apperance/mobile-navigation";
import { UserDropdown } from "@/features/auth/components/user-dropdown";

export const PrivateLayoutUI = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col min-h-max bg-white dark:bg-slate-950" data-testid="auth-layout">
      <AuthHeader>
        <UserDropdown />
      </AuthHeader>

      <main className="flex flex-col px-4 pt-[calc(4rem+60px)] h-full pb-20 lg:pb-0" data-testid="main">
        {children}
      </main>

      <MobileNav />
    </div>
  );
};
