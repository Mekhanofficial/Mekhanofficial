"use client"; // Must be at the very top

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Projects = () => {
  const projects = [
    {
      image: "/images/dark.jpg",
      title: "The Mealsgraffiti",
      description: "Chawleen things",
      link: "https://www.themealsgraffiti.com",
      mockup: "/images/ft1.png",
      projectDetails: {
        technologies:
          "JavaScript, styles, optimization and frontend engineering",
        builtWith: "Built in H-ART for Elica",
      },
      bgColor: "bg-amber-100",
      darkBgColor: "dark:bg-amber-900",
      bgChar: "M",
    },
    {
      image: "/images/dark1.jpg",
      title: "Flowstate",
      description: "Chawleen things",
      link: "https://www.themealsgraffiti.com",
      mockup: "/images/ft2.png",
      projectDetails: {
        technologies:
          "JavaScript, styles, optimization and frontend engineering",
        builtWith: "Built in H-ART for Elica",
      },
      bgColor: "bg-blue-100",
      darkBgColor: "dark:bg-blue-900",
      bgChar: "F",
    },
    {
      image: "/images/dark4.jpg",
      title: "Flowstate",
      description: "Chawleen things",
      link: "https://www.themealsgraffiti.com",
      mockup: "/images/ft3.png",
      projectDetails: {
        technologies:
          "JavaScript, styles, optimization and frontend engineering",
        builtWith: "Built in H-ART for Elica",
      },
      bgColor: "bg-green-100",
      darkBgColor: "dark:bg-green-900",
      bgChar: "P",
    },
    {
      image: "/images/dark3.jpg",
      title: "Flowstate",
      description: "Chawleen things",
      link: "https://www.themealsgraffiti.com",
      mockup: "/images/ft4.png",
      projectDetails: {
        technologies:
          "JavaScript, styles, optimization and frontend engineering",
        builtWith: "Built in H-ART for Elica",
      },
      bgColor: "bg-purple-100",
      darkBgColor: "dark:bg-purple-900",
      bgChar: "W",
    },
  ];

  return (
    <section className="w-full pb-20 bg-white dark:bg-gray-900">
      <div className="space-y-0">
        {projects.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className="flex flex-col md:flex-row items-stretch overflow-hidden relative min-h-[400px] shadow-lg group"
            >
              {/* Image section - alternates sides based on index */}
              <div
                className={`w-full md:w-1/2 relative min-h-[400px] md:min-h-[500px] ${
                  isEven ? "md:order-1" : "md:order-2"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="relative z-10 flex justify-center items-center h-full p-4">
                  <Image
                    src={item.mockup}
                    alt="Mockup"
                    width={300}
                    height={300}
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* Details section - alternates sides based on index */}
              <div
                className={`hidden md:block w-full md:w-1/2 p-8 flex-col justify-center ${
                  item.bgColor
                } ${
                  item.darkBgColor
                } z-10 sticky top-0 h-[500px] overflow-hidden ${
                  isEven ? "md:order-2" : "md:order-1"
                }`}
              >
                {/* Background character */}
                <div className="absolute -right-20 -bottom-20">
                  <span className="text-[500px] font-bold opacity-10 dark:opacity-20 pointer-events-none select-none">
                    {item.bgChar}
                  </span>
                </div>

                <div className="max-w-md mx-auto relative z-20">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {item.description}
                  </p>
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold uppercase text-gray-600 dark:text-gray-400">
                      Technologies
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {item.projectDetails.technologies}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase text-gray-600 dark:text-gray-400">
                      Built With
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200">
                      {item.projectDetails.builtWith}
                    </p>
                  </div>
                  <Link
                    href={item.link}
                    className="mt-6 inline-block text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Project →
                  </Link>
                </div>
              </div>

              {/* Mobile: Simple link */}
              <Link
                href={item.link}
                className="md:hidden absolute inset-0 z-20 flex items-center justify-center bg-black/50"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-white text-xl font-bold">
                  {item.title}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
