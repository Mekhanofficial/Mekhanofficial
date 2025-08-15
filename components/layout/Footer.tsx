"use client"

import { useState } from "react"
import {
  FaTrophy,
  FaTimes,
  FaYoutube,
  FaLinkedin,
  FaTelegram,
  FaDiscord,
} from "react-icons/fa"

const footerData = [
  {
    title: "Services",
    items: [
      "Exchange",
      "Affiliates",
      "Staking",
      "Corporate & Professional",
      "Lending",
      "Security & Protection",
      "Deposits & Withdrawals",
      "Credit/Debit On-ramp",
    ],
  },
  {
    title: "Products",
    items: [
      "Exchange",
      "Margin Trading",
      "Mobile App",
      "Crescent Borrow",
      "Reporting App",
      "UNUS SED LEO",
      "OTC",
      "Derivatives",
      "Thalex Derivatives",
    ],
  },
  {
    title: "Company",
    items: [
      "About",
      "Announcements",
      "Careers",
      "Fees",
      "Market Statistics",
      "Manifesto",
      "Utilities",
      "Securities",
      "Crescent Securities",
    ],
  },
  {
    title: "Support",
    items: [
      "Crescent Channels",
      "Contact Us",
      "Help Center",
      "Status",
      "For Developers",
      "API & Web Sockets",
      "Bug Bounty",
    ],
  },
  {
    title: "Learn",
    items: [
      "Bitcoin Halving",
      "Crescent Alpha",
      "Blog",
      "Knowledge Base",
      "Paper Trading",
      "Press",
    ],
  },
  {
    title: "Legal & Privacy",
    items: [
      "Privacy",
      "Cookies Policy",
      "Cookies Preferences",
      "Derivative Terms",
      "Exchange Terms",
      "General Notices & Terms",
      "Token Specific Terms",
      "Trading Rulebook",
    ],
  },
]

export default function Footer() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const toggleIndex = (i: number) => {
    if (openIndexes.includes(i)) {
      setOpenIndexes(openIndexes.filter((idx) => idx !== i))
    } else {
      setOpenIndexes([...openIndexes, i])
    }
  }

  return (
    <footer
      className="bg-gradient-to-r from-gray-900 via-green-900 to-gray-800 text-gray-300 select-none shadow-inner"
      aria-label="Site Footer"
    >
      <div className="container mx-auto px-6 py-12 max-w-7xl">
{/* Logo */}
<div className="flex items-center mb-10">
  <div 
    tabIndex={0}
    role="heading"
    aria-level={1}
    className="flex items-center cursor-pointer select-none group"
  >
    {/* Moon styled as a 'c' */}
    <div className="relative h-12 w-12 mr-1">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 48 48" 
        className="drop-shadow-lg transition-all duration-500 group-hover:rotate-[-15deg]"
        aria-hidden="true"
      >
        {/* Main moon body */}
        <path 
          d="M24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40Z" 
          fill="url(#moonGradient)"
        />
        {/* Crescent cutout shaped like a 'c' */}
        <path 
          d="M30 12C36 14 40 19 40 24C40 29 36 34 30 36C24 38 18 36 14 30C10 24 12 18 18 14C22 12 26 12 30 12Z" 
          fill="#111827"
          className="transition-all duration-300 group-hover:translate-x-[-2px]"
        />
        {/* Moon craters */}
        <circle cx="30" cy="20" r="1.5" fill="#ffffff33" />
        <circle cx="25" cy="28" r="2" fill="#ffffff22" />
        <circle cx="32" cy="32" r="1" fill="#ffffff44" />
        
        <defs>
          <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    
    {/* Rest of the word "rescent" */}
    <span className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg transition-all duration-300 group-hover:text-blue-200">
      rescent
    </span>
    
    {/* BTC symbol positioned after the 't' */}
    <div className="relative ml-2 h-8 w-8">
      <div className="absolute inset-0 rounded-full bg-gray-900/30 blur-sm w-full h-full"></div>
      <div className="w-full h-full flex items-center justify-center bg-yellow-400/90 rounded-full p-1 shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-[15deg]">
        <span className="text-gray-900 font-bold text-sm">₿</span>
      </div>
    </div>
  </div>
</div>
        {/* Desktop Grid */}
        <nav
          className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-10"
          aria-label="Footer Navigation"
        >
          {footerData.map(({ title, items }) => (
            <section key={title} aria-labelledby={`${title}-footer-title`}>
              <h3
                id={`${title}-footer-title`}
                className="text-white font-semibold mb-5 text-lg tracking-wide"
              >
                {title}
              </h3>
              <ul className="space-y-3 text-sm">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="block hover:text-white transition-colors duration-300 relative group focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                      tabIndex={0}
                    >
                      {item}
                      <span
                        className="absolute left-0 -bottom-1 w-0 group-hover:w-full transition-all duration-300 h-[2px] bg-green-400"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        {/* Mobile Dropdowns */}
        <nav className="md:hidden" aria-label="Footer Navigation Mobile">
          {footerData.map(({ title, items }, i) => {
            const isOpen = openIndexes.includes(i)
            return (
              <section
                key={title}
                className="border-b border-gray-700 py-4"
                aria-expanded={isOpen}
              >
                <button
                  onClick={() => toggleIndex(i)}
                  aria-controls={`footer-section-${i}`}
                  className="w-full flex justify-between items-center text-left text-white font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                  aria-haspopup="true"
                >
                  {title}
                  {isOpen ? (
                    <FaTimes
                      className="w-5 h-5 transition-transform duration-300 hover:text-green-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
                <ul
                  id={`footer-section-${i}`}
                  className={`mt-3 pl-5 space-y-2 overflow-hidden transition-[max-height] duration-400 ease-in-out ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                  aria-label={`${title} submenu`}
                >
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="block hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-green-400 rounded px-1"
                        tabIndex={isOpen ? 0 : -1}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </nav>

        {/* Social Icons and Copyright */}
        <div className="mt-14 border-t border-gray-700 pt-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
          <div className="flex space-x-8 justify-center md:justify-start text-gray-400">
            {[{
              Icon: FaYoutube,
              label: "YouTube",
              href: "#",
            }, {
              Icon: FaLinkedin,
              label: "LinkedIn",
              href: "#",
            }, {
              Icon: FaTelegram,
              label: "Telegram",
              href: "#",
            }, {
              Icon: FaDiscord,
              label: "Discord",
              href: "#",
            }].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-green-400 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                tabIndex={0}
              >
                <Icon size={26} />
              </a>
            ))}
          </div>

          <div className="text-center text-xs text-gray-500 select-text">
            &copy; {new Date().getFullYear()} iFinex Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
