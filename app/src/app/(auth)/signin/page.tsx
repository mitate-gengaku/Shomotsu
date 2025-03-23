import React from "react";

import { SignInPage } from "@/features/auth/pages/signin-page";

const SignIn = () => {
  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center min-h-screen">
      <SignInPage />
    </div>
  );
};

export default SignIn;
