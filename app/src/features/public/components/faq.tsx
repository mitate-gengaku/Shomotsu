import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/utils/cn";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "無料で利用できますか？",
    answer: "無料で利用できます",
    value: "item-1",
  },
  {
    question: "どのような機能がありますか？",
    answer:
      "小説の執筆、読書機能等など",
    value: "item-2",
  },
  {
    question: "小説は何冊まで執筆できますか？",
    answer: "今のところ制限はありません",
    value: "item-3",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className={cn("py-16 font-noto-sans")}>
      <h2 className="mb-4 text-center text-3xl font-bold text-fushikane md:text-4xl">
        よくある質問
      </h2>

      <Accordion type="single" collapsible className="AccordionRoot w-full">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left text-fushikane">
              {question}
            </AccordionTrigger>

            <AccordionContent className="cursor-default text-fushikane text-opacity-80">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};