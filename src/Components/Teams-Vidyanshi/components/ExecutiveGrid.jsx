import ExecutiveCard from "./ExecutiveCard.jsx";

/**
 * Renders the executive grid. Pure function of `data`.
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((member, index) => (
        <ExecutiveCard key={member.name} executive={member} index={index} />
      ))}
    </div>
  );
}

export default ExecutiveGrid;
