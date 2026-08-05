import { motion } from "framer-motion";

/**
 * Premium faculty card. Lays out image + copy side-by-side on desktop,
 * stacked on mobile. Glassmorphism panel with a darkblue-to-blue glow on hover.
 */
function FacultyCard({ faculty, index = 0 }) {
  const { image, name, position, description } = faculty;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="glass-panel glow-border group relative flex flex-col overflow-hidden rounded-2xl md:flex-row"
    >
      {/* Hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--x,50%) var(--y,50%), rgba(11,61,145,0.2), transparent 60%)",
        }}
      />

      <div className="relative w-full shrink-0 md:w-72">
        <div className="aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-darkblue-900/40 to-surface md:aspect-auto md:h-full">
          {image ? (
            <img
              src={image}
              alt={`Portrait of ${name}`}
              loading="lazy"
              className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
          ) : (
            <div
              role="img"
              aria-label={`Portrait placeholder for ${name}`}
              className="flex h-full w-full items-center justify-center font-display text-4xl text-white/20"
            >
              {name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>
          )}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col justify-center gap-3 p-7 sm:p-9">
        <span className="eyebrow">Faculty</span>
        <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          {name}
        </h3>
        <p className="font-mono text-sm text-neon-blue/90">{position}</p>
        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
          {description}
        </p>
      </div>
    </motion.article>
  );
}

export default FacultyCard;
