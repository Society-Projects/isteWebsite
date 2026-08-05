import { alumniData } from "./alumniData.js";
import AlumniCard from "./AlumniCard.jsx";

export default function AlumniPage() {
  return (
    <section className="relative w-full min-h-screen bg-transparent text-white pt-32 pb-24 px-6 md:px-16 lg:px-24">
      {/* Background Glows */}
      <div className="absolute top-[10%] left-[10%] w-[25rem] h-[25rem] bg-[#0B3D91]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] right-[10%] w-[30rem] h-[30rem] bg-[#00F0FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-display px-3.5 py-1 text-[10px] font-black uppercase tracking-widest bg-[#0D1524] text-[#00F0FF] rounded-full border border-[#00F0FF]/20 shadow-sm">
            Our Legacy
          </span>
          <h1 className="page-heading text-4xl sm:text-5xl md:text-6xl tracking-tight">
            OUR ALUMNI
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00F0FF] via-[#0B3D91] to-[#041C4A] rounded-full" />
          <p className="text-slate-400 font-normal text-base md:text-lg leading-relaxed">
            Honoring our former core leaders and members who built the foundation of ISTE TIET and continue to excel across global tech leaders, research, and ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {alumniData.map((alumnus, index) => (
            <AlumniCard key={alumnus.id} alumnus={alumnus} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
