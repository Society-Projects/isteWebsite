import React from "react";

export default function TimetablePage() {
  return (
    <div className="w-full min-h-[calc(100vh-88px)] pt-22 bg-[#070D19] flex flex-col items-center justify-center">
      <div className="w-full h-[calc(100vh-100px)] border-none bg-slate-950 relative">
        <iframe
          src="/timetable/index.html"
          title="ISTE Timetable"
          className="w-full h-full border-none outline-none"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
