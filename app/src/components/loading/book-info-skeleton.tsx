"use client";

import React from "react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const BookInfoPageSkeleton = () => (
  <div className="w-full lg:w-1/2 mx-auto md:pb-12 relative" data-testid="book-detail-page-skeleton">
    <Skeleton className="w-64 h-5 mb-8" />
    <div className="flex flex-col lg:flex-row items-ceter gap-8 lg:gap-2 mb-6 relative">
      <div className="lg:w-1/3">
        <div
          className="w-2/5 mx-auto lg:w-4/5 lg:mx-0 rounded-lg shadow-lg relative"
          style={{
            boxShadow: "10px 15px 22px -5px rgba(0, 0, 0, 0.2), 2px 4px 6px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Skeleton className="w-full h-[230px] sm:h-96 xl:h-72 bg-gray-300 dark:bg-gray-400 rounded-lg flex flex-row-reverse justify-between p-3 md:p-4 select-none" />
          <div
            className="absolute inset-0 pointer-events-none rounded-lg"
            style={{
              background:
                "linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0.4) 94%, rgba(255, 255, 255, 0.5) 96%, rgba(255, 255, 255, 0) 100%)",
            }}
          />
        </div>
      </div>
      <div className="lg:w-2/3 flex flex-1 gap-4 flex-col items-center lg:items-start">
        <Skeleton className="w-72 h-9" />
        <div className="flex items-center gap-4">
          <Skeleton className="rounded-full size-10" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-48 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="hidden md:block space-y-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-32 h-9 rounded-full" />
          </div>
          <div className="hidden md:block space-y-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-48 h-4" />
          </div>
          <div className="w-full flex items-center gap-2">
            <Skeleton className="w-full h-9 rounded" />
          </div>
        </div>
      </div>
    </div>
    <Card className="mb-6 p-6">
      <div className="h-9 p-0.5 rounded flex items-center gap-2">
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-4/5 h-2" />
        <Skeleton className="w-4/6 h-2" />
        <Skeleton className="w-3/5 h-2" />
        <Skeleton className="w-2/5 h-2" />
      </div>
    </Card>
  </div>
);
