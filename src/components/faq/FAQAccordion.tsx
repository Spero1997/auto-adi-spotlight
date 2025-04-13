
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

export type FAQSection = {
  title: string;
  faqs: FAQItem[];
};

interface FAQAccordionProps {
  sections: FAQSection[];
}

const FAQAccordion = ({ sections }: FAQAccordionProps) => {
  return (
    <div className="space-y-12">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          {section.title && (
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              {section.title}
            </h2>
          )}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {section.faqs.map((faq, faqIndex) => (
              <AccordionItem 
                key={faqIndex} 
                value={`section-${sectionIndex}-item-${faqIndex}`}
                className="bg-white rounded-lg shadow-sm"
              >
                <AccordionTrigger className="px-4 font-medium text-left hover:no-underline data-[state=open]:text-blue-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
