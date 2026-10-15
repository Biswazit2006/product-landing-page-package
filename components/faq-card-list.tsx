import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Cambo } from "next/font/google";

const cambo = Cambo({ subsets: ["latin"], weight: "400" });

const FAQDATA = [
  {
    question: "Are your watches waterproof?",
    answer:
      "Yes, our watches are waterproof and can withstand water exposure without damage.",
  },
  {
    question: "How long is the warranty?",
    answer:
      "The warranty period for our watches is two years from the date of purchase.",
  },
  {
    question: "Can I replace the watch strap?",
    answer:
      "Yes, you can replace the watch strap with a new one.",
  },
  {
    question: "Do you offer ongoing support after purchase?",
    answer:
      "Yes, we provide ongoing support to our customers after purchase. You can reach out to our customer service team for any assistance or inquiries regarding your watch.",
  },
];

export default function FaqCardList() {
  return (
       <Accordion defaultValue={["shipping"]} className={`${cambo.className} lg:w-1/2 border-none bg-white`}>
      {
        FAQDATA.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`} >
            <AccordionTrigger className="text-md lg:text-2xl font-medium ">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-sm lg:text-xl">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))
      }
    </Accordion>
  )
}
