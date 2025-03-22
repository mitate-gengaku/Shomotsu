import { SignIn } from "@clerk/nextjs";
import React from "react";

export const SignInPage = () => {
  return <SignIn routing="hash" forceRedirectUrl={"/home"} />;
};
