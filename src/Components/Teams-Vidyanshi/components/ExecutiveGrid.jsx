import ExecutiveCard from "./ExecutiveCard.jsx";

/**
 * Renders the executive grid with centered alignment.
 */
function ExecutiveGrid({ data }) {
  if (!data?.length) {
    return (
      <p className="py-16 text-center text-sm text-white/40">
        No executive members to show yet.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto items-stretch">
      {data.map((member, index) => (
        <div key={member.name} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex justify-center">
          <ExecutiveCard executive={member} index={index} />
        </div>
      ))}
    </div>
  );
}

export default ExecutiveGrid;
