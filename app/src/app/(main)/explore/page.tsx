import { ChevronRightIcon } from "lucide-react";
import React from "react";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { userData } from "@/config/user-data";
import { ExploreBook } from "@/features/book/pages/explore-book";

const ExplorePage = () => {
  return (
    <ExploreBook />
  );
};

export default ExplorePage;