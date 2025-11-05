"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const faqs = [
  {
    question: "What is PulsePredict?",
    answer:
      "PulsePredict is a social, gasless prediction market on BNB Chain with AI-assisted market resolution.",
  },
  {
    question: "How do I start predicting?",
    answer:
      "Simply log in via phone or Google — no crypto required. Place your bets with zero gas fees.",
  },
  {
    question: "How does AI resolution work?",
    answer:
      "Our AI oracle ingests verified sources and resolves markets quickly, reducing manual disputes.",
  },
  {
    question: "Can I follow other predictors?",
    answer:
      "Yes — copy top predictors, gain badges, and earn rewards for accuracy.",
  },
  {
    question: "How are rewards distributed?",
    answer:
      "Rewards include reputation points, NFTs, and badges, based on prediction accuracy.",
  },
  {
    question: "Is PulsePredict secure?",
    answer:
      "Dispute staking, bot detection, and transparent processes ensure market integrity.",
  },
  {
    question: "Which markets can I bet on?",
    answer:
      "Sports, elections, breaking news, and other real-world events supported by our AI oracle.",
  },
];

export default function FAQ() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <section className="w-full max-w-3xl mx-auto py-20 px-4 text-center">
      {/* Heading */}
      <h2 className="text-3xl font-medium tracking-tight dark:text-white">
        Frequently Asked Questions
      </h2>
      <p className="mt-2 text-gray-400">
        Your question not answered here?{" "}
        <a
          href="mailto:hello@drift.so"
          className="text-[#e3e2ec] hover:underline"
        >
          Email Us
        </a>
      </p>

      {/* Accordion */}
      <div className="mt-10 text-left">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
          onValueChange={(val) => setActiveItem(val)}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`rounded-xl border dark:bg-zinc-900 transition-colors ${
                activeItem === `item-${index}`
                  ? "border-[#e3e2ec]"
                  : "border-zinc-800"
              }`}
            >
              <AccordionTrigger className="px-4 py-3 dark:text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 dark:text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}