import { Metadata, ResolvingMetadata } from "next";
import { ComponentType } from "react";

import { legalSlug } from "@/config/legal-slug";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { slug } = await params;

  // タイトルの生成
  const findMatchSlugItem = legalSlug.find((value) => value.slug === slug);
  const title = findMatchSlugItem
    ? `${findMatchSlugItem.ja} | Shomotsu`
    : (await parent).title || "";

  return {
    title: title,
    openGraph: {
      title: title,
    },
    twitter: {
      title: title,
    },
  };
};

const LegalPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const { default: Post } = (await import(`@/contents/${slug}.mdx`)) as {
    default: ComponentType;
  };

  return <Post />;
};

export const generateStaticParams = () => legalSlug;

export const dynamicParams = false;

export default LegalPage;
