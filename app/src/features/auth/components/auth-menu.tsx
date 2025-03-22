"use client";

import { isMobile } from "react-device-detect";

import { SignedInMenu } from "@/features/auth/components/signedin-menu";
import { SignedOutMenu } from "@/features/auth/components/signedout-menu";

export const AuthMenu = () => {
  return (
    <>
      <SignedInMenu />
      <SignedOutMenu isMobile={isMobile} />
    </>
  );
};
