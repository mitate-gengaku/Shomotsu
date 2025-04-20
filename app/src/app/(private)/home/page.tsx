import { Suspense } from "react";

import { LoadingIconSkeleton } from "@/components/loading/loading-icon-skeleton";
import { HomePage } from "@/features/book/pages/home-page";

const Home = () => {
  return (
    <Suspense fallback={<LoadingIconSkeleton />}>
      <HomePage />
    </Suspense>
  );
};

export default Home;
