import { NewBookSection } from "@/features/book/components/new-book-section";

export const ExplorePage = async () => {
  return (
    <div
      className="w-full lg:w-1/2 mx-auto md:pb-12 relative space-y-8"
      data-testid="explore-page"
    >
      <NewBookSection />
    </div>
  );
};
