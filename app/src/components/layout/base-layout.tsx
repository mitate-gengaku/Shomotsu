import { Footer } from "@/components/apperance/footer";
import { Header } from "@/components/apperance/header";
import { AuthMenu } from "@/features/auth/components/auth-menu";

export const PublicLayoutUI = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header>
        <AuthMenu />
      </Header>
      <main className="pt-[calc(4rem+60px)] pb-16 px-4">
        <div className="prose prose-sm md:prose-base max-w-[1280px] w-full lg:w-1/2 mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};
