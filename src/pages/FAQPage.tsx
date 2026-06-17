import { Link } from "react-router-dom";
import { useContent } from "@/context/ContentContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQPage() {
  const { content } = useContent();
  const { faq } = content.pages;

  return (
    <div className="bg-background min-h-[50vh]">
      <div className="max-w-[720px] mx-auto px-6 py-16 md:py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">{faq.eyebrow}</p>
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-10">{faq.title}</h1>
        <Accordion type="single" collapsible className="w-full">
          {faq.items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-body text-sm">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground font-body leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Link to="/" className="inline-block mt-10 text-xs uppercase tracking-[0.2em] text-primary border-b border-primary font-body">
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
}
