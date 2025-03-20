import { Metadata, ResolvingMetadata } from "next";
import { ComponentType } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const legalSlug = [
  {
    slug: "terms",
    ja: "利用規約",
  },
  {
    slug: "privacy",
    ja: "プライバシーポリシー",
  },
];

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { slug } = await params;

  // タイトルの生成
  const findMatchSlugItem = legalSlug.find((value) => value.slug === slug);
  const title = findMatchSlugItem
    ? `${findMatchSlugItem.ja} | Shomotsu`
    : (await parent).title || "Shomotsu";

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
