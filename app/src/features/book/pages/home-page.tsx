import { ContentTitleForm } from "@/features/book/components/content-title-form";

export const HomePage = () => {
  return (
    <div
      className="w-full lg:w-1/2 mx-auto h-full mb-8 lg:mb-0"
      data-testid="home-page"
    >
      <div className="flex flex-col mb-8 gap-8">
        <div className="flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl font-semibold">
            新しい本を作成する
          </h3>
        </div>
        <ContentTitleForm />
      </div>
    </div>
  );
};
