"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const audio = new Audio("/sound/click.wav");
      audio.volume = 0.3;
      audio.load();
      audioRef.current = audio;

      // Close dropdown when clicking outside
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setContactDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        audioRef.current = null;
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  const handleThemeToggle = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.error("Audio error:", e));
    }
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleContactDropdown = () => {
    setContactDropdownOpen(!contactDropdownOpen);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${text.substring(0, 100)}...`);
      }

      const data = (await response.json()) as
        | { success: boolean }
        | { message: string; error?: string };

      if (!response.ok) {
        throw new Error(
          "message" in data ? data.message : "Failed to send message"
        );
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (error) {
      console.error("Form submission error:", error);

      // Type-safe error handling
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 lg:px-8 bg-zinc-200/90 dark:bg-zinc-950/10 backdrop-blur-sm transition-colors duration-200 h-16 border-b border-zinc-300/50 dark:border-zinc-800/50">
        <div className="container mx-auto flex justify-between items-center h-full">
          <Link
            href="/"
            className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="block"
            >
              Mekhano
            </motion.span>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 items-center">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleContactDropdown}
                  className="relative text-zinc-600 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors group flex items-center gap-1"
                >
                  Contact
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-200 ${
                      contactDropdownOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {contactDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-[19.5rem] sm:w-[21rem] max-h-[calc(100vh-5.5rem)] overflow-hidden rounded-2xl border border-sky-200/70 dark:border-zinc-700/80 bg-white/95 dark:bg-zinc-900/95 shadow-[0_28px_80px_-30px_rgba(14,116,144,0.55)] backdrop-blur-xl"
                    >
                      <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
                      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

                      <div className="relative max-h-[calc(100vh-5.5rem)] overflow-y-auto p-4 sm:p-5">
                        <div className="mb-4">
                          <h3 className="font-semibold text-xl text-zinc-900 dark:text-zinc-100">
                            Let&apos;s Build Something
                          </h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Send a message and I&apos;ll reply as soon as I can.
                          </p>
                        </div>

                        {formStatus === "success" ? (
                          <div className="p-3 rounded-xl bg-emerald-100/90 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border border-emerald-300/70 dark:border-emerald-700/60">
                            Message sent successfully!
                          </div>
                        ) : formStatus === "error" ? (
                          <div className="p-3 rounded-xl bg-red-100/90 dark:bg-red-900/40 text-red-800 dark:text-red-200 border border-red-300/70 dark:border-red-700/60">
                            Error sending message. Please try again.
                          </div>
                        ) : (
                          <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-[11px] font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 mb-1.5"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2.5 text-sm rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-950/70 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500 transition-colors"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="email"
                                className="block text-[11px] font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 mb-1.5"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2.5 text-sm rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-950/70 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500 transition-colors"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="message"
                                className="block text-[11px] font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 mb-1.5"
                              >
                                Message
                              </label>
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={3}
                                className="w-full px-3 py-2.5 text-sm rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-950/70 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500 transition-colors resize-none"
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={formStatus === "submitting"}
                              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_10px_24px_-12px_rgba(37,99,235,0.9)]"
                            >
                              {formStatus === "submitting"
                                ? "Sending..."
                                : "Send Message"}
                            </button>
                          </form>
                        )}

                        <div className="mt-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-700/70">
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                            Messages are delivered directly to my inbox.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-zinc-700 dark:text-zinc-300 p-1 relative z-50"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={mobileMenuOpen ? "open" : "closed"}
                variants={{
                  closed: { rotate: 0 },
                  open: { rotate: 180 },
                }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.div>
            </button>

            {/* Light Bulb Pendulum */}
            <button
              onClick={handleThemeToggle}
              className="relative h-[180px] w-10 -mt-2 flex items-start justify-center group"
              aria-label="Toggle theme"
            >
              <motion.div
                className="relative h-full w-full origin-top will-change-transform"
                animate={{ rotate: [-7, 7, -7] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Extended Rope */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[calc(100%-1.5rem)] bg-gradient-to-b from-blue-600 to-blue-500/60" />

                {/* Light Bulb */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                  <motion.div
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md bg-amber-50 dark:bg-zinc-800"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-all duration-300 ${
                        theme === "light"
                          ? "text-blue-500 rotate-180"
                          : "text-zinc-500 rotate-180 opacity-80"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          x: mobileMenuOpen ? 0 : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed inset-0 z-40 bg-zinc-100/95 dark:bg-zinc-950/95 backdrop-blur-lg pt-20 px-6 overflow-y-auto ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="relative flex flex-col items-center pb-10">
          <div className="pointer-events-none absolute top-8 -right-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 -left-12 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative w-full max-w-md rounded-2xl border border-sky-200/70 dark:border-zinc-700/80 bg-white/95 dark:bg-zinc-900/95 shadow-[0_28px_80px_-30px_rgba(14,116,144,0.55)] backdrop-blur-xl p-5">
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              Let&apos;s Build Something
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 mb-4">
              Drop your message and I&apos;ll get back to you.
            </p>

            {formStatus === "success" ? (
              <div className="p-3 rounded-xl bg-emerald-100/90 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border border-emerald-300/70 dark:border-emerald-700/60">
                Message sent successfully!
              </div>
            ) : formStatus === "error" ? (
              <div className="p-3 rounded-xl bg-red-100/90 dark:bg-red-900/40 text-red-800 dark:text-red-200 border border-red-300/70 dark:border-red-700/60">
                Error sending message. Please try again.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label
                    htmlFor="mobile-name"
                    className="block text-[11px] font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="mobile-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-950/70 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile-email"
                    className="block text-[11px] font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="mobile-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-950/70 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile-message"
                    className="block text-[11px] font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="mobile-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-zinc-300/80 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-950/70 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_10px_24px_-12px_rgba(37,99,235,0.9)]"
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}

            <div className="mt-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-700/70">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                Messages are delivered directly to my inbox.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
