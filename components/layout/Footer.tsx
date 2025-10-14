"use client"

import dynamic from "next/dynamic";
import Link from "next/link";
import { FaLinkedinIn, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { SiDevdotto, SiVercel } from "react-icons/si";

const ScrollToTopButton = dynamic(() => import("../ui/ScrollToTop"), {
  ssr: false,
});

export default function Footer() {
  return (
    <footer className="relative flex flex-col md:flex-row justify-between items-start min-h-[40vh] px-6 py-10 bg-gray-100 text-gray-900 dark:bg-neutral-950 dark:text-white">
      {/* Left Side Content */}
      <div className="flex flex-col justify-between max-w-xl space-y-6">
        <div>
          <button className="border border-gray-700 dark:border-gray-900 p-1 mb-2 items-center ">
            <p className="text-lg font-semibold mb-3">
              That&apos;s <span className="line-through">not</span> all folks!
            </p>
          </button>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            You can see more awesome projects on{" "}
            <Link
              href="https://www.linkedin.com/in/mekhano"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600 dark:hover:text-blue-400"
            >
              LinkedIn
            </Link>
            .
          </p>
          <p className="text-sm underline text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            <Link href="mailto:melvinokievor@gmail.com">
              Send me a message if you want to chat.
            </Link>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5 text-2xl mt-2 text-gray-800 dark:text-white">
          <a
            href="https://linkedin.com/in/mekhano"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://twitter.com/mekhanofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/mekhanofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/mekhanofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://vercel.com/mekhanofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiVercel />
          </a>
        </div>
      </div>

      {/* Scroll To Top Button Container */}
      <div className="mt-10 md:mt-0 w-full md:w-auto md:h-full flex justify-center items-center">
        <div className="bg-gray-300 dark:bg-gray-800 p-4 rounded-md">
          <ScrollToTopButton />
        </div>
      </div>
    </footer>
  );
}
