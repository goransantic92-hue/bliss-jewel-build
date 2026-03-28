import { motion } from "framer-motion";
import ringsImg from "@/assets/collection-rings.jpg";
import necklacesImg from "@/assets/collection-necklaces.jpg";
import earringsImg from "@/assets/collection-earrings.jpg";
import braceletsImg from "@/assets/collection-bracelets.jpg";

const collections = [
  { name: "Rings", image: ringsImg, count: "24 Pieces" },
  { name: "Necklaces", image: necklacesImg, count: "18 Pieces" },
  { name: "Earrings", image: earringsImg, count: "32 Pieces" },
  { name: "Bracelets", image: braceletsImg, count: "15 Pieces" },
];

const CollectionsGrid = () => {
  return (
    <section id="collections" className="py-20 md:py-28 px-6 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">Shop By Category</p>
        <h2 className="font-display text-3xl md:text-4xl text-foreground">Our Collections</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {collections.map((col, i) => (
          <motion.a
            key={col.name}
            href="#"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
          >
            <img
              src={col.image}
              alt={col.name}
              loading="lazy"
              width={800}
              height={1000}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-1">{col.name}</h3>
              <p className="text-xs tracking-[0.15em] text-muted-foreground font-body">{col.count}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default CollectionsGrid;
