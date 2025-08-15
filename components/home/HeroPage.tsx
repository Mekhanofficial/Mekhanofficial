'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBitcoin, FaDownload, FaChrome, FaArrowRight } from 'react-icons/fa';

export default function HeroPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/vd1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-1"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/30 via-green-900/10 to-green-900/40 z-2"></div>

      {/* Content Section */}
      <motion.div
        className="relative z-10 w-full max-w-4xl px-6 py-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="bg-amber-400/10 p-5 rounded-full backdrop-blur-sm border border-amber-400/30 shadow-md shadow-amber-500/10">
            <FaBitcoin className="text-5xl text-amber-400" />
          </div>
        </motion.div>

        <motion.div
          className="w-full lg:w-4/5 space-y-8 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Brand Header - Now in single line */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center">
              <div className="relative h-12 w-12 mr-3">
                <svg 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 48 48"
                  className="drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]"
                >
                  <path 
                    d="M24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40Z" 
                    fill="url(#moonGradient)"
                  />
                  <path 
                    d="M30 12C36 14 40 19 40 24C40 29 36 34 30 36C24 38 18 36 14 30C10 24 12 18 18 14C22 12 26 12 30 12Z" 
                    fill="#111827"
                  />
                  <circle cx="30" cy="20" r="1.5" fill="#ffffff33" />
                  <circle cx="25" cy="28" r="2" fill="#ffffff22" />
                  <circle cx="32" cy="32" r="1" fill="#ffffff44" />
                  <defs>
                    <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#86efac" />
                      <stop offset="50%" stopColor="#a7f3d0" />
                      <stop offset="100%" stopColor="#6ee7b7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-4xl font-extrabold tracking-tight text-white">
                Crescent
              </span>
            </div>
            <span className="bg-green-500/20 text-green-300 text-sm font-semibold px-3 py-1 rounded-full border border-green-400/30">
              ONCHAIN
            </span>
          </div>
          
          {/* Main Heading with responsive line breaks */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white mt-4">
            The next generation
            <br className="hidden md:block" />
            <span className="block md:inline">
              <span className="hidden md:inline">of </span>
              <span className="md:hidden">Invest Smart, Invest Secure,</span>
              <span className="hidden md:inline">Invest Smart, Invest Secure,</span>
              <br className="md:hidden" />
              <span className="md:hidden">Invest in CRESCENT...</span>
              <span className="hidden md:inline">Invest in CRESCENT...</span>
            </span>
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-300 mt-2 inline-block">
              crypto experience
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-green-100 max-w-2xl mx-auto leading-relaxed mt-6">
            Take full control of your digital assets with our non-custodial multi-chain
            solution. Security meets simplicity in one powerful platform.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/get-started" passHref>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                <FaDownload className="text-lg" />
                Get Started
              </motion.button>
            </Link>
            
            <Link href="/extension" passHref>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-green-300 text-green-100 font-bold px-8 py-4 rounded-lg hover:bg-green-900/30 transition-all duration-300 flex items-center gap-3 group"
              >
                <FaChrome className="text-green-300 group-hover:text-white text-lg" />
                Chrome Extension
                <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}