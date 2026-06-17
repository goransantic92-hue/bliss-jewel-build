import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useContent } from "@/context/ContentContext";

const NewsletterSection = () => {
  const { content } = useContent();
  const { newsletter } = content;
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Unesite e-mail adresu");
      return;
    }
    toast.success("Hvala na prijavi!", { description: "Uskoro ćete dobiti naše novosti." });
    setEmail("");
  };

  return (
    <section className="py-20 md:py-28 border-t border-primary bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto px-6 text-center"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">{newsletter.eyebrow}</p>
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">{newsletter.title}</h2>
        <p className="text-sm text-muted-foreground mb-8 font-body">{newsletter.description}</p>
        <form onSubmit={handleSubmit} className="flex gap-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={newsletter.placeholder}
            className="flex-1 bg-background border border-border px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-body"
          />
          <button
            type="submit"
            className="bg-gold-gradient text-primary-foreground px-8 py-3.5 text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity font-body"
          >
            {newsletter.buttonLabel}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
