import { ExploreNewPage } from "@/features/book/pages/explore-new-page";

interface Props {
  searchParams: Promise<{
    page: string;
  }>;
}

const ExploreNew = async ({ searchParams }: Props) => {
  const { page = "1" } = await searchParams;

  return <ExploreNewPage page={parseInt(page)} />;
};

export default ExploreNew;
