import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MOCK_COLLECTIONS, LOREM_PARA } from "@/data/site";
import ringsImg from "@/assets/collection-rings.jpg";
import necklacesImg from "@/assets/collection-necklaces.jpg";
import earringsImg from "@/assets/collection-earrings.jpg";

const collectionImages: Record<string, string> = {
  essentials: ringsImg,
  evening: necklacesImg,
  bridal: earringsImg,
};

const CollectionsPage = () => {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-card/30">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">Collections</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">Lorem collections</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed font-body">{LOREM_PARA}</p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {MOCK_COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/collections/${col.slug}`}
                className="group block relative aspect-[4/5] overflow-hidden border border-border"
              >
                <img
                  src={collectionImages[col.slug] ?? ringsImg}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={800}
                  height={1000}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-display text-2xl text-primary-foreground">{col.title}</h2>
                  <p className="text-xs text-primary-foreground/80 mt-1 font-body">Lorem ipsum →</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;
