import React, { useEffect } from "react";
import SEO from "./SEO/SEO";

export default function TimetableRedirect() {
  const targetUrl = "https://timetable.istetiet.com";

  useEffect(() => {
    window.location.replace(targetUrl);
  }, []);

  return (
    <>
      <SEO
        title="ISTE Timetable - Thapar University"
        description="Access the official TIET Timetable portal for Thapar Institute of Engineering and Technology."
        canonicalPath="/timetable"
      />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Redirecting to ISTE Timetable...</h1>
        <p className="text-gray-400">
          If you are not redirected automatically,{" "}
          <a href={targetUrl} className="text-cyan-400 underline hover:text-cyan-300">
            click here to access timetable.istetiet.com
          </a>
          .
        </p>
      </div>
    </>
  );
}
