import type { Project } from "../types";

export const anotherProject: Project = {
  id: "another",
  image: "/images/bgg3.jpeg",
  title: "Another",
  description:
    "Minimal blogging platform focused on readability, speed, and a lightweight content experience.",
  liveLink: "https://an-other.vercel.app/",
  codeLink: "https://github.com/Mekhanofficial/AnOther.git",
  mockup: "/images/anotherdark.png",
  projectDetails: {
    technologies: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "Git",
      "GitHub",
    ],
    builtWith:
      "Designed as a fast personal publishing platform with simple navigation and responsive layout.",
    role: "Frontend Developer",
  },
  bgChar: "A",
  charColor: "text-blue-500",
  accentColor: "bg-blue-500/20",
};
