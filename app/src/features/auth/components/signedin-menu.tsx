import { SignedIn, UserButton } from "@clerk/nextjs";
import {} from "react-device-detect";

export const SignedInMenu = () => (
  <SignedIn>
    <UserButton />
  </SignedIn>
);
