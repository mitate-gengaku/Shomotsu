import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewBooksList } from "@/features/book/clients/new-books-list";

interface Props {
  page: number;
}

export const ExplorePage = async ({ page }: Props) => {
  return (
    <div
      className="w-full lg:w-1/2 mx-auto md:pb-12 relative space-y-4"
      data-testid="explore-page"
    >
      <h2 className="text-xl lg:text-2xl font-semibold">
        最近追加された本一覧
      </h2>
      <Tabs defaultValue="new" defaultChecked>
        <TabsList>
          <TabsTrigger value="new">新作</TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <NewBooksList page={page} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
