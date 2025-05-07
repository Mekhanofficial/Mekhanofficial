import ProjectCard from "../ui/Card";

export default function Projects() {
  const projects = [
    {
      title: "Project 1",
      description: "A brief description of the project",
      tags: ["React", "Next.js", "Tailwind"],
      link: "#",
    },
    // More projects...
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
