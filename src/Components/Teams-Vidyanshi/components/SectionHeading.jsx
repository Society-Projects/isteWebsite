/**
 * Reusable section heading with eyebrow label, title, and optional subtitle.
 * Animates once when it enters the viewport.
 */
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

function SectionHeading({ eyebrow, title, subtitle, align = "left", titleClassName = "" }) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col gap-3 max-w-2xl ${alignment}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={twMerge(
          "font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/60 text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
