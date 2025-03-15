import { Header } from "@/components/layout/header";
import { legalSlug } from "@/config/legal/slug";
import { ComponentType } from "react";

const LegalPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const { default: Post } = (await import(`@/contents/${slug}.mdx`)) as {
    default: ComponentType;
  };

  return (
    <>
      <Header />
      <main className="pt-[calc(4rem+60px)] pb-16 px-4">
        <div className="prose prose-sm md:prose-base max-w-none w-full lg:w-1/2 mx-auto">
          <Post />
        </div>
      </main>
    </>
  );
};

export const generateStaticParams = () => legalSlug;

export const dynamicParams = false;

export default LegalPage;