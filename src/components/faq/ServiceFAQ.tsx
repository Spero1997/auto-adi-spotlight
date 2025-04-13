
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export type ServiceFAQItem = {
  question: string;
  answer: React.ReactNode;
};

interface ServiceFAQProps {
  title: string;
  description?: string;
  faqs: ServiceFAQItem[];
  showMoreLink?: boolean;
}

const ServiceFAQ = ({ 
  title, 
  description, 
  faqs, 
  showMoreLink = true 
}: ServiceFAQProps) => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.slice(0, 4).map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <Collapsible>
                <CollapsibleTrigger className="w-full flex justify-between items-center p-6 text-left font-medium hover:bg-gray-50 transition-colors">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 ease-in-out data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4">{faq.answer}</CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}

          {showMoreLink && (
            <div className="text-center mt-8">
              <Link 
                to="/faq" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                Voir toutes nos questions fréquentes
                <ChevronDown className="ml-2 h-4 w-4 rotate-270" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceFAQ;
