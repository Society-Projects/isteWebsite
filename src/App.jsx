import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarFooter from "./Components/NavbarFooter";
import HomeGauri from "./Components/Home-Gauri";
import Team from "./Components/Teams-Vidyanshi/pages/Team";
import EventPage from "./Components/Events-Mohit/EventPage";
import Sponsors from "./Components/Sponsors/SponsorsPage";
import AlumniPage from "./Components/Alumni/AlumniPage";
import ProjectsPage from "./Components/Projects/ProjectsPage";
import { ContactPage } from "./Components/ContactPage";
import TimetablePage from "./Components/Timetable/TimetablePage";

export default function App() {
  return (
    <div className="bg-transparent min-h-screen text-gray-200 antialiased selection:bg-[#00F0FF]/20">
      <NavbarFooter>
        <Routes>
          {/* 🖥️ HOME PAGE */}
          <Route path="/" element={<HomeGauri />} />

          {/* 👥 TEAM PAGE */}
          <Route path="/team" element={<Team />} />

          {/* 📅 EVENTS PAGE */}
          <Route path="/events" element={<EventPage />} />

          {/* 🤝 SPONSORS PAGE */}
          <Route path="/sponsors" element={<Sponsors />} />

          {/* 💻 PROJECTS PAGE */}
          <Route path="/projects" element={<ProjectsPage />} />

          {/* 🎓 ALUMNI PAGE */}
          <Route path="/alumni" element={<AlumniPage />} />

          {/* 📅 TIMETABLE PAGE */}
          <Route path="/timetable" element={<TimetablePage />} />

          {/* 📞 CONTACT PAGE */}
          <Route path="/contact" element={<ContactPage />} /> 
        </Routes>
      </NavbarFooter>
    </div>
  );
}

// Force Vite HMR reload trigger - v2
