import CoreCard from "./CoreCard.jsx";

/**
 * Renders the core team grid with centered alignment and uniform portrait frames.
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
    <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto items-stretch">
      {data.map((member, index) => (
        <div key={member.name} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex justify-center">
          <CoreCard
            core={member}
            index={index}
            aspect="aspect-[3/4]"
          />
        </div>
      ))}
    </div>
  );
}

export default CoreMasonry;
