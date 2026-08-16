import TeamSection from "../sections/TeamSection.jsx";
import SEO from "../../SEO/SEO";

function Team() {
  return (
    <div className="min-h-screen w-full bg-void text-white">
      <SEO
        title="Our Executive Board & Team | ISTE TIET"
        description="Meet the core executive board, faculty advisors, and student leads behind ISTE Students' Chapter at Thapar Institute of Engineering and Technology."
        canonicalPath="/team"
      />
      <TeamSection />
    </div>
  );
}

export default Team;

