"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
  SiJavascript,
  SiGit,
} from "react-icons/si";
import Image from "next/image";

type SocialLink = {
  icon: React.ReactNode;
  name: string;
  url: string;
};

type TechItem = {
  icon: React.ReactNode;
  name: string;
};

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [audioReady, setAudioReady] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const socialLinks: SocialLink[] = [
    {
      icon: <SiGithub className="w-4 h-4" />,
      name: "GitHub",
      url: "https://github.com",
    },
    // Add other social links here
  ];

  const roles = [
    "FRONTEND DEVELOPER",
    "REACT SPECIALIST",
    "WEB DEVELOPER",
    "CODE WHISPERER",
    "DESIGN-SAVVY CODER",
  ];
  

  const techStack: TechItem[] = [
    { icon: <SiReact className="w-5 h-5 sm:w-6 sm:h-6" />, name: "React" },
    {
      icon: <SiNextdotjs className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: "Next.js",
    },
    {
      icon: <SiJavascript className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: "JavaScript",
    },
    { icon: <SiHtml5 className="w-5 h-5 sm:w-6 sm:h-6" />, name: "HTML5" },
    { icon: <SiCss3 className="w-5 h-5 sm:w-6 sm:h-6" />, name: "CSS3" },
    {
      icon: <SiTailwindcss className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: "Tailwind",
    },
    { icon: <SiVuedotjs className="w-5 h-5 sm:w-6 sm:h-6" />, name: "Vue.js" },
    {
      icon: <SiBootstrap className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: "Bootstrap",
    },
    {
      icon: <SiFirebase className="w-5 h-5 sm:w-6 sm:h-6" />,
      name: "Firebase",
    },
    { icon: <SiGit className="w-5 h-5 sm:w-6 sm:h-6" />, name: "Git" },
    
  ];

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!mounted) return;

    let charIndex = 0;
    let typingInterval: NodeJS.Timeout;
    let roleTimeout: NodeJS.Timeout;

    const typeRole = () => {
      const currentRole = roles[currentRoleIndex];

      typingInterval = setInterval(() => {
        if (charIndex <= currentRole.length) {
          setTypingText(currentRole.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);

          // Wait 2s, then move to next role
          roleTimeout = setTimeout(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          }, 2000);
        }
      }, 100);
    };

    typeRole();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(roleTimeout);
    };
  }, [currentRoleIndex, mounted]);
  

  // Audio effects initialization
  useEffect(() => {
    if (!mounted) return;

    const initAudio = async () => {
      try {
        const audio = new Audio("/sound/click.wav");
        audio.volume = 0.3;
        audioRef.current = audio;
        await audio.load();
        setAudioReady(true);
      } catch (error) {
        console.error("Audio initialization failed:", error);
        setAudioReady(false);
      }
    };

    initAudio();
    return () => {
      audioRef.current = null;
    };
  }, [mounted]);

  // Background music initialization
  useEffect(() => {
    if (!mounted) return;

    const initMusic = async () => {
      try {
        const music = new Audio("/sound/mounika-oblii.mp3");
        music.loop = true;
        music.volume = 0.5;
        musicRef.current = music;
        await music.load();
      } catch (error) {
        console.error("Music initialization failed:", error);
      }
    };

    initMusic();
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, [mounted]);

  // Close on hover out
  useEffect(() => {
    if (!mounted) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (isOpen && contentRef.current && !contentRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [isOpen, mounted]);

  const toggleMusic = useCallback(async () => {
    if (!musicRef.current || !mounted) return;

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
  }, [musicPlaying, mounted]);

  const handleButtonClick = useCallback(async () => {
    if (!audioReady || !mounted) {
      console.log("Audio not ready yet");
      return;
    }

    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Audio play error:", error);
      setIsOpen(true);
    }
  }, [audioReady, mounted]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const duplicatedTechStack = [...techStack, ...techStack];


  if (!mounted) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden transition-colors duration-500">
      {/* Social Icons */}
      <div
        className={`fixed left-2 sm:left-4 bottom-4 z-50 flex flex-col space-y-3 sm:space-y-4 items-center transition-all duration-500 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-2 rounded-full backdrop-blur-sm hover:bg-blue-500/80 transition-all duration-300"
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
        className={`fixed bottom-4 right-2 sm:right-4 z-50 p-2 sm:p-3 rounded-full transition-all duration-300 ${
          musicPlaying
            ? "text-blue-500 backdrop-blur-sm"
            : "text-zinc-500 hover:text-blue-700 dark:hover:text-blue-300"
        }`}
        aria-label={musicPlaying ? "Turn music off" : "Turn music on"}
      >
        <FiMusic
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
            musicPlaying ? "animate-pulse" : ""
          }`}
        />
      </button>

      <div className="relative w-full h-full pt-12 sm:pt-16 md:pt-20">
        {/* Left Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-zinc-200/90 dark:bg-zinc-950/20 z-20 transition-transform duration-700 ease-in-out ${
            isOpen ? "-translate-x-full" : "translate-x-0"
          }`}
        />

        {/* Right Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-1/2 bg-zinc-200/90 dark:bg-zinc-950/20 flex items-center justify-start pl-4 sm:pl-6 md:pl-10 z-20 transition-transform duration-700 ease-in-out ${
            isOpen ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <h2
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-zinc-900 dark:text-white tracking-wide min-h-[2rem] sm:min-h-[2.5rem]"
            aria-live="polite"
          >
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
          className={`absolute inset-x-0 h-full flex items-center justify-center z-10 transition-opacity duration-700 delay-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative w-full max-w-6xl px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 z-50 p-1 sm:p-2 rounded-full bg-zinc-200/90 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors duration-300"
                aria-label="Close"
              >
                <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* About Me Content */}
              <div className="order-2 lg:order-1 space-y-3 sm:space-y-4 md:space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  About Me
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400">
                  Interactive Front-end Developer
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-zinc-700 dark:text-zinc-300">
                  I&apos;m Melvin Okievor, a freelance front-end developer
                  passionate about crafting clean, responsive interfaces and
                  building intuitive, high-performing web applications. I enjoy
                  solving design challenges and turning ideas into engaging
                  digital experiences through modern development practices.
                </p>

                {/* Tech Stack */}
                <div className="pt-1 sm:pt-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-1 sm:mb-2">
                    TECH STACK
                  </h3>
                  <div className="relative overflow-hidden py-2 sm:py-4">
                    {/* Top row - flows to the right */}
                    <div
                      className="flex w-full mb-2 sm:mb-4 group hover:[animation-play-state:paused]"
                      style={{
                        animation: "scrollRight 20s linear infinite",
                      }}
                    >
                      {duplicatedTechStack.map((tech, index) => (
                        <div
                          key={`top-${index}`}
                          className="flex-shrink-0 mx-1 sm:mx-2 flex items-center gap-1 sm:gap-2 p-1 sm:p-2 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg group-hover:bg-zinc-300/50 dark:group-hover:bg-zinc-700/50 transition-colors duration-200 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-blue-500/20"
                        >
                          <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 group-hover:scale-110 transition-all duration-200">
                            {tech.icon}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom row - flows to the left */}
                    <div
                      className="flex w-full group hover:[animation-play-state:paused]"
                      style={{
                        animation: "scrollLeft 20s linear infinite",
                      }}
                    >
                      {duplicatedTechStack.map((tech, index) => (
                        <div
                          key={`bottom-${index}`}
                          className="flex-shrink-0 mx-1 sm:mx-2 flex items-center gap-1 sm:gap-2 p-1 sm:p-2 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg group-hover:bg-zinc-300/50 dark:group-hover:bg-zinc-700/50 transition-colors duration-200 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-blue-500/20"
                        >
                          <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 group-hover:scale-110 transition-all duration-200">
                            {tech.icon}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
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
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden border-4 border-zinc-400/50 dark:border-zinc-600/50 shadow-lg group">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src="/images/mekhan2.jpg"
                      alt="Profile picture"
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reveal Button */}
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center z-40 transition-all duration-500 hover:scale-110 shadow-lg ${
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-label="Reveal content"
        >
          <div className="relative">
            <FiChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-bounce" />
            <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>
      </div>

      {/* Animation keyframes */}
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