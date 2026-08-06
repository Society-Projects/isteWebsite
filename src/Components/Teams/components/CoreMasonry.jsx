import { useState } from "react";
import CoreCard from "./CoreCard.jsx";

/**
 * Renders the core team grid. Pure function of `data`.
 */
function CoreMasonry({ data }) {
  const [hoveredName, setHoveredName] = useState(null);

  if (!data?.length) {
    return (
      <p className="py-16 text-center text-sm text-white/40">
        No core team members to show yet.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {data.map((member, index) => {
        const isBlurred = hoveredName !== null && member.name !== hoveredName;
        return (
          <div
            key={member.name}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] max-w-[280px] flex"
            onMouseEnter={() => setHoveredName(member.name)}
            onMouseLeave={() => setHoveredName(null)}
          >
            <CoreCard
              core={member}
              index={index}
              aspect="aspect-[3/4]"
              isBlurred={isBlurred}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CoreMasonry;
