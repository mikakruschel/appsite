import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { buildFaqPageSchema, type FaqItem } from "@/lib/structured-data";

export type { FaqItem };

type FaqSectionProps = {
  items: FaqItem[];
};

export function FaqSection({ items }: FaqSectionProps) {
  const faqPageSchema = buildFaqPageSchema(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <Accordion className="gap-2 overflow-visible rounded-none border-0 shadow-none">
        {items.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`faq-${index}`}
            className="border-0 not-last:border-b-0 data-open:bg-transparent"
          >
            <Card>
              <AccordionTrigger className="text-base leading-snug font-bold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-label-secondary px-3 pt-0 pb-3 text-base leading-relaxed">
                {item.answer}
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
