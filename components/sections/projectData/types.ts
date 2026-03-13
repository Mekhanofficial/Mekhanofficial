export type Project = {
  id: string;
  image: string;
  title: string;
  description: string;
  liveLink?: string;
  codeLink: string;
  mockup: string;
  projectDetails: {
    technologies: string[];
    builtWith: string;
    role: string;
  };
  bgChar: string;
  charColor: string;
  accentColor: string;
};
