import { motion } from "framer-motion";
import heroImage from "@/assets/hero-main.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
      <img
        src={heroImage}
        alt="Elegant gold necklace on model"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

      <div className="relative h-full flex items-end pb-20 md:pb-28 px-6 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="max-w-lg"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-body">
            New Collection
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-foreground">
            Timeless
            <br />
            <span className="italic text-primary">Elegance</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-8 leading-relaxed max-w-sm font-body">
            Discover handcrafted pieces designed to celebrate every moment of your journey.
          </p>
          <a
            href="#collections"
            className="inline-block bg-gold-gradient text-primary-foreground px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-body hover:opacity-90 transition-opacity"
          >
            Explore Collection
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
