import React from "react";

import { NewBookForm } from "@/features/book/components/new-book-form";

export const NewBookPage = () => {
  return (
    <div 
      className="w-full lg:w-1/2 mx-auto md:pb-12 relative space-y-4 flex flex-col"
      data-testid="new-book-page"
      >
      <NewBookForm />
    </div>
  );
};
