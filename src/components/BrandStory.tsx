import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContent } from "@/context/ContentContext";

const BrandStory = () => {
  const { content } = useContent();
  const { brandStory } = content;

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] md:aspect-auto"
          >
            <img src={brandStory.image} alt="" loading="lazy" width={1920} height={1080} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card flex items-center p-10 md:p-16 lg:p-20"
          >
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-body">{brandStory.eyebrow}</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                {brandStory.title}
                <br />
                <span className="italic text-primary">{brandStory.titleAccent}</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-body">{brandStory.paragraph1}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-body">{brandStory.paragraph2}</p>
              <Link
                to={brandStory.ctaLink}
                className="inline-block text-xs tracking-[0.2em] uppercase text-primary border border-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 font-body"
              >
                {brandStory.ctaLabel}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
