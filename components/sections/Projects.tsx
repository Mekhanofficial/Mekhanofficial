"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "./projectData";

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
      className="relative w-full pb-24 bg-gradient-to-b from-white via-sky-50/40 to-zinc-100/40 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900"
      ref={ref}
    >
      <div className="pointer-events-none absolute top-16 left-10 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 right-10 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="mx-auto relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="flex justify-center">
            <span className="inline-flex items-center px-4 py-1 rounded-full border border-sky-300/60 dark:border-sky-500/40 text-xs tracking-[0.2em] text-sky-700 dark:text-sky-300 bg-sky-100/60 dark:bg-sky-900/20 mb-5">
              PORTFOLIO HIGHLIGHTS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100">
            Selected Projects
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto">
            Five polished project showcases with dedicated stack chips, context,
            and direct live/code access.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          className="space-y-0"
        >
          {projects.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                className="w-full flex flex-col md:flex-row items-stretch overflow-hidden relative isolate min-h-[420px] border-y border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 group"
                style={{ contain: "paint" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image section */}
                <div
                  className={`w-full md:w-1/2 relative overflow-hidden min-h-[360px] md:min-h-[500px] ${
                    isEven ? "md:order-1" : "md:order-2"
                  } ${item.accentColor} transition-all duration-700`}
                >
                  <div
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-all duration-1000 grayscale transform-gpu ${
                      hoveredIndex === index ? "grayscale-0 scale-105" : ""
                    }`}
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-0" />
                  <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-8 min-w-8 px-2 rounded-full bg-white/90 text-zinc-900 text-xs font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs md:text-sm tracking-wider font-medium text-white/90">
                      FEATURED PROJECT
                    </span>
                  </div>
                  <div className="relative z-10 flex justify-center items-center h-full p-2 sm:p-3">
                    <motion.div
                      className="w-[92%] max-w-[760px]"
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Image
                        src={item.mockup}
                        alt={`${item.title} mockup`}
                        width={900}
                        height={900}
                        className={`w-full h-auto object-contain transition-all duration-700 grayscale ${
                          hoveredIndex === index ? "grayscale-0" : ""
                        }`}
                        priority={index === 0}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Details section */}
                <div
                  className={`hidden md:flex w-full md:w-1/2 p-8 lg:p-10 flex-col justify-center bg-white dark:bg-zinc-900 z-10 overflow-hidden ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {/* Background character */}
                  <motion.div
                    className="absolute -right-4 -bottom-10"
                    animate={{
                      opacity: 0.24,
                      scale: 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      className="text-[340px] lg:text-[380px] font-black pointer-events-none select-none text-zinc-400/80 dark:text-zinc-700/90 drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)]"
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
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        {item.title}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
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
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.projectDetails.technologies.map((tech) => (
                              <span
                                key={`${item.id}-${tech}`}
                                className="text-xs px-3 py-1.5 rounded-full border border-zinc-300/70 dark:border-zinc-700/80 bg-white/85 text-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
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

                      <div className="mt-6 flex flex-wrap gap-3">
                        {item.liveLink && (
                          <motion.div whileHover={{ x: 5 }}>
                            <Link
                              href={item.liveLink}
                              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border shadow-md ${
                                hoveredIndex === index
                                  ? `${item.charColor} border-current bg-white/90 dark:bg-zinc-900/90`
                                  : "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-zinc-900/90"
                              } transition-colors duration-300`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span>View Live</span>
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
                        )}

                        <Link
                          href={item.codeLink}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-zinc-900/90 hover:text-blue-600 dark:hover:text-blue-400 hover:border-current transition-colors duration-300 shadow-md"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>View Code</span>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Mobile version */}
                <div className="md:hidden absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black/95 via-black/75 to-transparent">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">
                      {item.title}
                    </h2>
                    <p className="text-gray-300">{item.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.projectDetails.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={`${item.id}-mobile-${tech}`}
                          className="text-[11px] px-2 py-1 rounded-full bg-white/20 text-white/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {item.liveLink && (
                        <Link
                          href={item.liveLink}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/15 text-white text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Live
                        </Link>
                      )}
                      <Link
                        href={item.codeLink}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/15 text-white text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Code
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
