"use client";

import "cropperjs/dist/cropper.css";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export const UpdateBookPageSkeleton = () => (
  <div className="w-full lg:w-1/2 mx-auto relative md:pb-12" data-testid="update-book-page">
    <div className="space-y-2">
      <div className="h-9 p-0.5 rounded flex items-center gap-2">
        <Skeleton className="w-24 h-full" />
        <Skeleton className="w-24 h-full" />
      </div>
      <Skeleton className="w-20 h-4" />
      <Skeleton className="w-full h-96" />
    </div>
  </div>
);
