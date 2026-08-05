import { motion } from "framer-motion";

/**
 * Portfolio-style masonry card for the core team. `aspect` varies the
 * image's height so the CSS-columns masonry grid reads as hand-curated
 * rather than uniform.
 */
function CoreCard({ core, index = 0, aspect = "aspect-[3/4]" }) {
  const { image, name, linkedin } = core;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: "easeOut" }}
      className="glow-border group mb-5 break-inside-avoid overflow-hidden rounded-xl bg-surface"
    >
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        {image ? (
          <img
            src={image}
            alt={`Portrait of ${name}`}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div
            role="img"
            aria-label={`Portrait placeholder for ${name}`}
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-darkblue-700/40 to-surface font-display text-2xl text-white/20"
          >
            {name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </div>
        )}

        {/* bottom gradient + info, revealed on hover */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 pt-10">
          <h3 className="font-display text-sm font-semibold text-white sm:text-base">
            {name}
          </h3>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${name}'s LinkedIn profile`}
            className="mt-1 inline-flex items-center gap-1 text-xs text-white/50 opacity-0 transition-opacity duration-300 hover:text-neon-blue focus-visible:text-neon-blue group-hover:opacity-100"
          >
            View LinkedIn ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default CoreCard;
