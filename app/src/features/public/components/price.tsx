import { CheckIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/utils/cn";

interface PricingProps {
  title: string;
  price: number;
  description: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "無料枠",
    price: 0,
    description:
      "基本的な機能が使用できます。(小説の執筆など)",
    benefitList: ["基本的な機能"],
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className={cn("py-16")}>
      <h2 className="text-center text-3xl font-bold md:text-4xl">プラン内容</h2>
      <h3 className="pb-8 pt-4 text-center font-noto-sans text-xl text-muted-foreground">
        無料プランのみご利用いただけます
      </h3>
      <div className="grid md:grid-cols-7 md:gap-12">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={cn(
              "drop-shadow-xl shadow-black/10 dark:shadow-white/10 md:col-start-3 md:col-span-3",
            )}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between font-bold">
                {pricing.title}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">{pricing.price}円</span>
                <span className="text-muted-foreground"> /1ヶ月</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              {pricing.benefitList.map((benefit: string) => (
                <div key={benefit} className="flex items-center gap-4">
                  <CheckIcon className="text-green-500 size-4" />
                  <p className="text-base font-medium">{benefit}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};