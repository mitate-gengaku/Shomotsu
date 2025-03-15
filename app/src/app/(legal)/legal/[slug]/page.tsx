import { Header } from "@/components/layout/header";
import { legalSlug } from "@/config/legal-slug";
import { ComponentType } from "react";

const LegalPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const { default: Post } = (await import(`@/contents/${slug}.mdx`)) as {
    default: ComponentType;
  };

  return (
    <Post />
  );
};

export const generateStaticParams = () => legalSlug;

export const dynamicParams = false;

export default LegalPage;