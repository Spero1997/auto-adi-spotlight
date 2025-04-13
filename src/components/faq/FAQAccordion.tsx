
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

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
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {sections.map((section, sectionIndex) => (
        <motion.div key={sectionIndex} className="mb-8" variants={item}>
          {section.title && (
            <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-3 font-playfair">
              {section.title}
            </h2>
          )}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {section.faqs.map((faq, faqIndex) => (
              <AccordionItem 
                key={faqIndex} 
                value={`section-${sectionIndex}-item-${faqIndex}`}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 font-medium text-left hover:no-underline data-[state=open]:text-brand-blue data-[state=open]:bg-blue-50/50">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2 text-gray-600 bg-white">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FAQAccordion;
