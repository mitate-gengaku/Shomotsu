import { SignUp } from "@clerk/nextjs";
import React from "react";

export const SignUpPage = () => {
  return (
    <SignUp routing="hash" />
  );
};