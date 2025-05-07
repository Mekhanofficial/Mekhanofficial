"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { FiMusic, FiChevronDown, FiX } from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiFirebase,
  SiVuedotjs,
  SiGithub,
  SiLinkedin,
  SiX,
  SiJavascript, 
  SiGit ,
  SiInstagram,
} from "react-icons/si";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const audioRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const musicRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

const socialLinks = [
  {
    icon: <SiGithub className="w-5 h-5" />,
    name: "GitHub",
    url: "https://github.com",
  },
  {
    icon: <SiLinkedin className="w-5 h-5" />,
    name: "LinkedIn",
    url: "https://linkedin.com",
  },
  {
    icon: <SiX className="w-5 h-5" />,
    name: "X (Twitter)",
    url: "https://twitter.com",
  },
  {
    icon: <SiInstagram className="w-5 h-5" />,
    name: "Instagram",
    url: "https://instagram.com",
  },
];

  const roles = [
    "FRONTEND DEVELOPER",
    "UI/UX DESIGNER",
    "REACT SPECIALIST",
    "WEB DEVELOPER",
  ];

const techStack = [
  { icon: <SiReact className="w-6 h-6" />, name: "React" },
  { icon: <SiNextdotjs className="w-6 h-6" />, name: "Next.js" },
  { icon: <SiJavascript className="w-6 h-6" />, name: "JavaScript" },
  { icon: <SiHtml5 className="w-6 h-6" />, name: "HTML5" },
  { icon: <SiCss3 className="w-6 h-6" />, name: "CSS3" },
  { icon: <SiTailwindcss className="w-6 h-6" />, name: "Tailwind" },
  { icon: <SiVuedotjs className="w-6 h-6" />, name: "Vue.js" },
  { icon: <SiBootstrap className="w-6 h-6" />, name: "Bootstrap" },
  { icon: <SiFirebase className="w-6 h-6" />, name: "Firebase" },
  { icon: <SiGit className="w-6 h-6" />, name: "Git" },
];

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typing effect
  useEffect(() => {
    setMounted(true);
    let charIndex = 0;
    let currentRole = roles[currentRoleIndex];
    const typingInterval = setInterval(() => {
      if (charIndex <= currentRole.length) {
        setTypingText(currentRole.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentRoleIndex]);

  // Audio effects initialization
  useEffect(() => {
    const initAudio = async () => {
      try {
        const audio = new Audio("/sound/click.wav");
        audio.volume = 0.3;
        audioRef.current = audio;

        // Preload audio
        await audio.load();
        setAudioReady(true);

        // Cleanup
        return () => {
          audio.removeEventListener("canplaythrough", () => {});
        };
      } catch (error) {
        console.error("Audio initialization failed:", error);
        setAudioReady(false);
      }
    };

    initAudio();
  }, []);

  // Background music initialization
  useEffect(() => {
    const initMusic = async () => {
      try {
        const music = new Audio("/sound/Melvinho-imma be.mp3");
        music.loop = true;
        music.volume = 0.5;
        musicRef.current = music;

        // Preload music
        await music.load();
      } catch (error) {
        console.error("Music initialization failed:", error);
      }
    };

    initMusic();

    return () => {
      musicRef.current?.pause();
    };
  }, []);

  // Close on hover out
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (
        isOpen &&
        contentRef.current &&
        !contentRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [isOpen]);

  // Clone tech stack items for seamless looping
  const duplicatedTechStack = [...techStack, ...techStack];

  const toggleMusic = async () => {
    if (!musicRef.current) return;

    try {
      if (musicPlaying) {
        await musicRef.current.pause();
      } else {
        await musicRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    } catch (error) {
      console.error("Music toggle error:", error);
    }
  };

  const handleButtonClick = async () => {
    if (!audioReady) {
      console.log("Audio not ready yet");
      return;
    }

    try {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        await audio.play();
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Audio play error:", error);
      // Fallback - open content even if audio fails
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition-colors duration-500">
      {/* Social Icons */}
      <div
        className={`fixed left-4 bottom-4 z-50 flex flex-col space-y-4 items-center transition-all duration-500 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-2 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 backdrop-blur-sm hover:bg-blue-500/80 transition-all duration-300"
            aria-label={social.name}
          >
            <span className="text-zinc-700 dark:text-zinc-300 group-hover:text-white transition-colors duration-300">
              {social.icon}
            </span>
            <span className="absolute left-full ml-2 px-2 py-1 text-xs font-medium text-white bg-zinc-800 dark:bg-zinc-700 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {social.name}
            </span>
          </a>
        ))}
      </div>

      {/* Music toggle button */}
      <button
        onClick={toggleMusic}
        className={`fixed bottom-4 right-4 z-50 p-3 rounded-full transition-all duration-300 ${
          musicPlaying
            ? "text-green-500 bg-white/10 backdrop-blur-sm"
            : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        }`}
        aria-label={musicPlaying ? "Turn music off" : "Turn music on"}
      >
        <FiMusic
          className={`w-5 h-5 transition-transform ${
            musicPlaying ? "animate-pulse" : ""
          }`}
        />
      </button>

      <div className="relative w-full h-full pt-16 md:pt-20">
        {/* Left Panel - Empty */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-zinc-200/90 dark:bg-zinc-900/90 z-20 transition-transform duration-700 ease-in-out ${
            isOpen ? "-translate-x-full" : "translate-x-0"
          }`}
        />

        {/* Right Panel - Animated Title */}
        <div
          className={`absolute top-0 right-0 h-full w-1/2 bg-zinc-200/90 dark:bg-zinc-900/90 flex items-center justify-start pl-6 md:pl-10 z-20 transition-transform duration-700 ease-in-out ${
            isOpen ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-900 dark:text-white tracking-wide min-h-[2.5rem]">
            {typingText}
            <span className="animate-pulse">|</span>
          </h2>
        </div>

        {/* Divider Line */}
        <div
          className={`absolute bottom-8 left-1/2 h-[calc(100%-8rem)] w-0.5 bg-gradient-to-t from-zinc-400/50 to-transparent dark:from-zinc-600/50 dark:to-transparent z-30 transition-opacity duration-500 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
          style={{ transform: "translateX(-50%)" }}
        />

        {/* Main Content */}
        <div
          ref={contentRef}
          className={`absolute top-0 inset-x-0 h-full flex items-center justify-center z-10 transition-opacity duration-700 delay-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl px-4 sm:px-6 md:px-10 gap-8 md:gap-10 items-center">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute -top-4 right-0 md:-right-4 z-50 p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors duration-300"
              aria-label="Close"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* About Me Content */}
            <div className="order-2 lg:order-1 space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                About Me
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400">
                Interactive Front-end Developer
              </h2>

              <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300">
                I&apos;m Melvin Okievor, a 22-year-old Italian Freelance
                Front-end developer. I&apos;m a weird guy who likes making weird
                things with web technologies. I like to resolve design problems,
                create smart user interface and imagine useful interaction,
                developing rich web experiences & web applications. When not
                working or futzing around with code, I study how to escape from
                University. Actually for hire.
              </p>

              {/* Tech Stack */}
              <div className="pt-2">
                <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                  TECH STACK
                </h3>
                <div className="relative overflow-hidden py-4">
                  {/* Top row - flows to the right */}
                  <div
                    ref={topRowRef}
                    className="flex w-full mb-4 group hover:[animation-play-state:paused]"
                    style={{
                      animation: "scrollRight 20s linear infinite",
                    }}
                  >
                    {duplicatedTechStack.map((tech, index) => (
                      <div
                        key={`top-${index}`}
                        className="flex-shrink-0 mx-2 flex items-center gap-2 p-2 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg group-hover:bg-zinc-300/50 dark:group-hover:bg-zinc-700/50 transition-colors duration-200 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-blue-500/20"
                      >
                        <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 group-hover:scale-110 transition-all duration-200">
                          {tech.icon}
                        </span>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom row - flows to the left */}
                  <div
                    ref={bottomRowRef}
                    className="flex w-full group hover:[animation-play-state:paused]"
                    style={{
                      animation: "scrollLeft 20s linear infinite",
                    }}
                  >
                    {duplicatedTechStack.map((tech, index) => (
                      <div
                        key={`bottom-${index}`}
                        className="flex-shrink-0 mx-2 flex items-center gap-2 p-2 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg group-hover:bg-zinc-300/50 dark:group-hover:bg-zinc-700/50 transition-colors duration-200 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-blue-500/20"
                      >
                        <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 group-hover:scale-110 transition-all duration-200">
                          {tech.icon}
                        </span>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden border-4 border-zinc-400/50 dark:border-zinc-600/50 shadow-lg group">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-4xl md:text-5xl font-bold">
                    MO
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    View Profile
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reveal Button */}
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center z-40 transition-all duration-500 hover:scale-110 shadow-lg ${
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-label="Reveal content"
        >
          <div className="relative">
            <FiChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
            <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </button>
      </div>

      {/* Add the animation keyframes to the global styles */}
      <style jsx global>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollLeft {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
