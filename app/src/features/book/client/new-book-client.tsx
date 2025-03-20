"use client";

import React from "react";

import { NewBookForm } from "@/features/book/components/new-book-form";

export const NewBookClient = () => {
  return (
    <section
      className="w-full lg:w-1/2 mx-auto h-full mb-8 md:pb-12 lg:mb-0 flex flex-col gap-4 md:gap-8"
      data-testid="new-book-page"
    >
      <NewBookForm />
    </section>
  );
};
