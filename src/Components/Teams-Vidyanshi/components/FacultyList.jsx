import FacultyCard from "./FacultyCard.jsx";

/**
 * Renders a faculty list. Pure function of `data` — no imports of
 * placeholder data here, so this only ever renders what it's handed.
 */
function FacultyList({ data }) {
  if (!data?.length) {
    return (
      <p className="py-16 text-center text-sm text-white/40">
        No faculty members to show yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {data.map((member, index) => (
        <FacultyCard key={member.name} faculty={member} index={index} />
      ))}
    </div>
  );
}

export default FacultyList;
