import { FAQ } from "@/features/public/components/faq";
import { Pricing } from "@/features/public/components/price";
import Image from "next/image";

export const LandingPage = () => (
  <div className="w-full space-y-8 relative">
    <Pricing />
    <FAQ />
  </div>
);
