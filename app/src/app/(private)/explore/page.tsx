import { ExplorePage } from "@/features/book/pages/explore-page";

interface Props {
  searchParams: Promise<{
    page: string;
  }>;
}

const Explore = async ({ searchParams }: Props) => {
  const { page = "1" } = await searchParams;

  return <ExplorePage page={parseInt(page)} />;
};
export default Explore;
