import React, { useEffect } from "react";
import SEO from "../SEO";

export default function TimetablePage() {
  useEffect(() => {
    window.location.href = "https://timetable.istetiet.com";
  }, []);

  return (
    <>
      <SEO
        title="Timetable"
        description="Official academic timetable for Thapar Institute of Engineering and Technology (TIET) by ISTE Thapar Chapter college society."
        keywords="tiet, iste, college society, thapar chapter, timetable, schedule, tiet timetable"
      />
      <div className="w-full min-h-[calc(100vh-88px)] pt-28 pb-16 bg-[#070D19] flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-sky-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Redirecting to Timetable Portal</h1>
          <p className="text-sm text-slate-400 mb-6">
            Connecting to official ISTE TIET timetable portal at <span className="text-sky-400 font-medium">timetable.istetiet.com</span>
          </p>
          <a
            href="https://timetable.istetiet.com"
            className="inline-block px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Click here if not redirected automatically
          </a>
        </div>
      </div>
    </>
  );
}
