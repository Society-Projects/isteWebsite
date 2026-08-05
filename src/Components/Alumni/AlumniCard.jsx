import { motion } from "framer-motion";

/**
 * NFT-collectible-styled Alumni card: square portrait, thin gradient
 * border, holographic hover glow, corner ticks — WITHOUT LinkedIn option.
 */
function AlumniCard({ alumnus, index = 0 }) {
  const { image, name, role, batch, bio } = alumnus;

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: "easeOut" }}
      className="group relative rounded-2xl p-[1px] transition-transform duration-300 hover:-translate-y-1.5"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,180,216,0.5), rgba(0,240,255,0.3))",
      }}
    >
      <div className="glass-panel relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#0D1524]/90 backdrop-blur-xl border border-white/10">
        {/* corner ticks, collectible framing */}
        <span
          aria-hidden="true"
          className="absolute left-3 top-3 h-3 w-3 border-l border-t border-[#00F0FF]/50"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 h-3 w-3 border-r border-t border-[#00F0FF]/50"
        />

        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[#02040A] to-[#0D1524]">
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
              className="flex h-full w-full items-center justify-center font-display text-4xl font-extrabold text-[#00F0FF]/30 bg-gradient-to-tr from-[#02040A] via-[#072A63] to-[#0D1524]"
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

        <div className="flex flex-1 flex-col gap-1.5 p-6">
          <h3 className="font-display text-xl font-bold text-white tracking-wide">
            {name}
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
            {batch}
          </p>
          <p className="text-xs font-semibold text-slate-300 mt-0.5">
            {role}
          </p>
          {bio && (
            <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-3">
              {bio}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default AlumniCard;
