import { BoltIcon, LogOutIcon, SparklesIcon, UserIcon, X } from "lucide-react";
import Link from "next/link";
import React from "react";

import { NewBookClient } from "@/features/book/client/new-book-client";

const NewBookPage = () => {
  return (
    <NewBookClient />
  );
};

export default NewBookPage;