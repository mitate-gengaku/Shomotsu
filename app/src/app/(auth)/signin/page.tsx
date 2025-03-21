
import { SignInPage } from "@/features/auth/pages/signin-page";
import { SignUpPage } from "@/features/auth/pages/signup-page";
import React from "react";

const SignIn = () => {
  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center min-h-screen">
      <SignInPage />
    </div>
  );
};

export default SignIn;