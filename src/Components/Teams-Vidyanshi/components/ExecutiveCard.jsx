import { motion } from "framer-motion";

/**
 * NFT-collectible-styled executive card: square portrait, thin gradient
 * border, holographic hover glow, LinkedIn as the card's primary action.
 */
function ExecutiveCard({ executive, index = 0 }) {
  const { image, name, position, linkedin } = executive;

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: "easeOut" }}
      className="group relative rounded-2xl p-[1px] transition-transform duration-300 hover:-translate-y-1.5"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,180,216,0.5), rgba(0,240,255,0.3))",
      }}
    >
      <div className="glass-panel relative flex h-full flex-col overflow-hidden rounded-2xl">
        {/* corner ticks, collectible framing */}
        <span
          aria-hidden="true"
          className="absolute left-3 top-3 h-3 w-3 border-l border-t border-neon-blue/50"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 h-3 w-3 border-r border-t border-neon-blue/50"
        />

        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-darkblue-900/40 to-surface">
          {image ? (
            <img
              src={image}
              alt={`Portrait of ${name}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div
              role="img"
              aria-label={`Portrait placeholder for ${name}`}
              className="flex h-full w-full items-center justify-center font-display text-3xl text-white/20"
            >
              {name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(120deg, rgba(11,61,145,0.5), rgba(0,240,255,0.4))",
            }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-1 p-5">
          <h3 className="font-display text-lg font-semibold text-white">
            {name}
          </h3>
          <p className="font-mono text-xs uppercase tracking-wide text-neon-blue/80">
            {position}
          </p>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${name}'s LinkedIn profile`}
            className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors duration-300 hover:border-neon-blue/60 hover:text-neon-blue focus-visible:border-neon-blue/60 focus-visible:text-neon-blue"
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default ExecutiveCard;
