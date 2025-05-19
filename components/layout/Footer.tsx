// components/layout/Footer.client.tsx
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const ScrollToTopButton = dynamic(() => import("../ui/ScrollToTop"), {
  ssr: false,
});

export default function Footer() {
  return (
    <footer className="relative min-h-[50vh] py-8 px-4 md:px-8 text-center bg-gradient-to-b from-primary-light to-gray-300 text-gray-800 dark:from-primary-dark dark:to-black dark:text-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-2xl md:text-3xl font-bold mb-6">
          That's <span className="line-through">not</span> all folks!
        </p>

        <div className="mb-6">
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            You can see more awesome projects on LinkedIn.
          </p>
          <Link
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Visit My LinkedIn
          </Link>
        </div>

        <p className="text-gray-600 dark:text-gray-300">
          Send me a message if you want to chat.
        </p>
      </div>

      <ScrollToTopButton />
    </footer>
  );
}
