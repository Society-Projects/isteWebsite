import TeamSection from "../sections/TeamSection.jsx";
import SEO from "../../SEO.jsx";

function Team() {
  return (
    <>
      <SEO
        title="Our Team"
        description="Meet the executive board, core team members, and faculty advisors behind ISTE Thapar Chapter (TIET), a leading college society at Thapar."
        keywords="tiet, iste, college society, thapar chapter, team, executive board, faculty, members"
      />
      <div className="min-h-screen w-full bg-void text-white">
        <TeamSection />
      </div>
    </>
  );
}

export default Team;
