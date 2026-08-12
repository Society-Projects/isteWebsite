export const CATEGORIES = ["All", "Web Platforms", "Management Portals", "Utility Apps", "FinTech"];

export const projects = [
  {
    id: "society-tracker",
    title: "Society Tracker",
    category: "Management Portals",
    tag: "MANAGEMENT PORTAL",
    featured: true,
    description: "Streamlined web platform built to empower student societies by simplifying event workflows, recruitment pipelines, venue booking approvals, and announcement dispatches.",
    tech: ["React.js", "PostgreSQL", "TailwindCSS", "Node.js"],
    website: "https://society-tracker-nine.vercel.app",
    github: "https://github.com/Armaan-debug-1/society-tracker",
    testId: "test@test.com",
    password: "test123",
    metrics: "Active in 15+ Campus Societies"
  },
  {
    id: "fairfare",
    title: "Fairfare",
    category: "Web Platforms",
    tag: "WEB PLATFORM",
    featured: true,
    description: "Fair-fare is a real-time cab fare aggregator enabling campus students to instantly calculate and compare ride rates across Uber, Ola, and local taxi services.",
    tech: ["React", "Node.js", "TailwindCSS", "REST API"],
    website: "https://github.com/ISTE-Thapar-Chapter",
    github: "https://github.com/ISTE-Thapar-Chapter",
    testId: "",
    password: "",
    metrics: "Real-time Fare Comparison API"
  },
  {
    id: "time-capsule",
    title: "Time Capsule",
    category: "Utility Apps",
    featured: false,
    tag: "UTILITY APP",
    description: "Encrypted memory vault application enabling users to write digital messages and memories to themselves or peers that remain securely locked until a specified future date.",
    tech: ["React", "Express", "MongoDB", "Framer Motion"],
    website: "https://github.com/ISTE-Thapar-Chapter",
    github: "https://github.com/ISTE-Thapar-Chapter",
    testId: "",
    password: "",
    metrics: "Time-locked Encryption Vault"
  },
  {
    id: "fintech",
    title: "FinTech Dashboard",
    category: "FinTech",
    featured: false,
    tag: "FINANCE SYSTEM",
    description: "Personal financial telemetry system giving students tools to monitor budgets, analyze spending habits, track recurring expenses, and receive personalized money advice.",
    tech: ["React", "TypeScript", "Chart.js", "Firebase"],
    website: "https://github.com/ISTE-Thapar-Chapter",
    github: "https://github.com/ISTE-Thapar-Chapter",
    testId: "",
    password: "",
    metrics: "Interactive Analytics Telemetry"
  }
];

export default projects;
