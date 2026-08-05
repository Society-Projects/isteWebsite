import CoreCard from "./CoreCard.jsx";

const ASPECTS = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/5]",
];

/**
 * Renders the core team masonry. Pure function of `data`.
 */
function CoreMasonry({ data }) {
  if (!data?.length) {
    return (
      <p className="py-16 text-center text-sm text-white/40">
        No core team members to show yet.
      </p>
    );
  }

  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
      {data.map((member, index) => (
        <CoreCard
          key={member.name}
          core={member}
          index={index}
          aspect={ASPECTS[index % ASPECTS.length]}
        />
      ))}
    </div>
  );
}

export default CoreMasonry;
