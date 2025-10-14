"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Project {
  image: string;
  title: string;
  description: string;
  link: string;
  mockup: string;
  projectDetails: {
    technologies: string;
    builtWith: string;
    role: string;
  };
  bgChar: string;
  charColor: string;
  accentColor: string;
}

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const projects: Project[] = [
    {
      image: "/images/bgg2.jpeg",
      title: "MatchFit Wardrobe",
      description:
        "An e-commerce clothing site with gender-based filtering, cart, and wishlist functionality.",
      link: "https://matchfit.vercel.app", // Replace with live site if available
      mockup: "/images/px1.png",
      projectDetails: {
        technologies: "React, Tailwind CSS, JavaScript",
        builtWith: "Developed for fashion commerce with product filtering",
        role: "Frontend Developer",
      },
      bgChar: "W",
      charColor: "text-green-500",
      accentColor: "bg-green-500/20",
    },
    {
      image: "/images/bgg3.jpg",
      title: "Another",
      description:
        "A minimal blog platform for sharing thoughts, updates, and articles with a clean reading experience.",
      link: "https://an-other.vercel.app",
      mockup: "/images/px2.png",
      projectDetails: {
        technologies: "React, Tailwind CSS, JavaScript",
        builtWith: "Designed as a personal blog for showcasing writing",
        role: "Frontend Developer",
      },
      bgChar: "A",
      charColor: "text-blue-500",
      accentColor: "bg-blue-500/20",
    },
    {
      image: "/images/bgg4.jpg",
      title: "The Mealsgraffiti",
      description:
        "A sleek restaurant website where users can explore meals and place orders directly through WhatsApp.",
      link: "https://www.themealsgraffiti.com",
      mockup: "/images/px3.png",
      projectDetails: {
        technologies: "React, Tailwind CSS, JavaScript",
        builtWith: "Personal branding project for food service engagement",
        role: "Frontend Developer",
      },
      bgChar: "M",
      charColor: "text-red-500",
      accentColor: "bg-red-500/20",
    },

    {
      image: "/images/bgg3.jpg",
      title: "Koin Fu",
      description:
        "A crypto trading dashboard for tracking market prices, trading pairs, and portfolio stats.",
      link: "https://koin-fu.vercel.app", // Replace with live site if available
      mockup: "/images/px4.png",
      projectDetails: {
        technologies: "React, Tailwind CSS, JavaScript",
        builtWith: "Built as a crypto trading platform UI prototype",
        role: "Frontend Developer",
      },
      bgChar: "K",
      charColor: "text-purple-500",
      accentColor: "bg-purple-500/20",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    }),
  };

  return (
    <section
      id="projects"
      className="w-full pb-20 bg-white dark:bg-zinc-950"
      ref={ref}
    >
      <div className="mx-auto">
        <motion.div initial="hidden" animate={controls} className="space-y-0">
          {projects.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                className="flex flex-col md:flex-row items-stretch overflow-hidden relative min-h-[400px] shadow-lg group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image section */}
                <div
                  className={`w-full md:w-1/2 relative min-h-[400px] md:min-h-[500px] ${
                    isEven ? "md:order-1" : "md:order-2"
                  } ${item.accentColor} transition-all duration-700`}
                >
                  <div
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0 transition-all duration-1000 grayscale ${
                      hoveredIndex === index ? "grayscale-0 scale-105" : ""
                    }`}
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="relative z-10 flex justify-center items-center h-full p-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Image
                        src={item.mockup}
                        alt={`${item.title} mockup`}
                        width={450}
                        height={450}
                        className={`object-contain transition-all duration-700 grayscale ${
                          hoveredIndex === index ? "grayscale-0" : ""
                        }`}
                        priority={index === 0}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Details section */}
                <div
                  className={`hidden md:block w-full md:w-1/2 p-8 flex-col justify-center bg-gray-50 dark:bg-zinc-900 z-10 sticky top-0 h-[500px] overflow-hidden ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {/* Background character */}
                  <motion.div
                    className="absolute -right-20 -bottom-20"
                    animate={{
                      opacity: hoveredIndex === index ? 0.2 : 0.1,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span
                      className={`text-[500px] font-bold pointer-events-none select-none ${item.charColor}`}
                    >
                      {item.bgChar}
                    </span>
                  </motion.div>

                  <div className="max-w-md mx-auto relative z-20">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.3 },
                      }}
                    >
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        {item.title}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                        {item.description}
                      </p>

                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                            My Role
                          </h4>
                          <p className="text-gray-800 dark:text-gray-200">
                            {item.projectDetails.role}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                            Technologies
                          </h4>
                          <p className="text-gray-800 dark:text-gray-200">
                            {item.projectDetails.technologies}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                            Context
                          </h4>
                          <p className="text-gray-800 dark:text-gray-200">
                            {item.projectDetails.builtWith}
                          </p>
                        </div>
                      </div>

                      <motion.div whileHover={{ x: 5 }}>
                        <Link
                          href={item.link}
                          className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full border ${
                            hoveredIndex === index
                              ? `${item.charColor} border-current`
                              : "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700"
                          } transition-colors duration-300`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>View Project</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Mobile version */}
                <Link
                  href={item.link}
                  className="md:hidden absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">
                      {item.title}
                    </h2>
                    <p className="text-gray-300">{item.description}</p>
                    <div className="flex items-center gap-2 text-white/80">
                      <span>View Project</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
