import { useState } from "react";
import ExecutiveCard from "./ExecutiveCard.jsx";

/**
 * Renders the executive grid. Pure function of `data`.
 */
function ExecutiveGrid({ data }) {
  const [hoveredName, setHoveredName] = useState(null);

  if (!data?.length) {
    return (
      <p className="py-16 text-center text-sm text-white/40">
        No executive members to show yet.
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
            <ExecutiveCard executive={member} index={index} isBlurred={isBlurred} />
          </div>
        );
      })}
    </div>
  );
}

export default ExecutiveGrid;
