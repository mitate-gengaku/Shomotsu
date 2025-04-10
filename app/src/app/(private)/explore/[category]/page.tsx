import { ExploreCategoryPage } from "@/features/book/pages/explore-category-page";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    page: string;
  }>;
}

const ExploreCategory = async ({ params, searchParams }: Props) => {
  const { page = "1" } = await searchParams;
  const { category } = await params;

  return <ExploreCategoryPage page={parseInt(page)} categoryName={category} />;
};

export default ExploreCategory;
