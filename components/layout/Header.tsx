"use client"

import React, { useState, useEffect, useRef } from "react"
// @ts-ignore
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines"

function LiveBTCChart() {
  const [prices, setPrices] = useState<number[]>([])
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [priceChange, setPriceChange] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  async function fetchPrice() {
    try {
      setIsLoading(true)
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      const data = await res.json()
      const price = data.bitcoin.usd

      setPrices((prev) => {
        const newArr = [...prev, price]
        if (newArr.length > 1) {
          const change = ((price - newArr[0]) / newArr[0]) * 100
          setPriceChange(change)
        }
        if (newArr.length > 20) newArr.shift()
        return newArr
      })
      setCurrentPrice(price)
    } catch (error) {
      console.error("Failed to fetch BTC price:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPrice()
    intervalRef.current = setInterval(fetchPrice, 10000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const getPriceColor = () => {
    if (priceChange > 0) return "text-green-400"
    if (priceChange < 0) return "text-red-400"
    return "text-gray-400"
  }

  const getChangeIcon = () => {
    if (priceChange > 0) return "▲"
    if (priceChange < 0) return "▼"
    return "➝"
  }

  return (
    <div className="flex items-center space-x-3 text-sm font-mono select-none">
      <div className="font-semibold text-white">BTC/USD</div>
      <div className={`flex items-center ${getPriceColor()}`}>
        {isLoading ? (
          <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
        ) : (
          <>
            <span>${currentPrice ? currentPrice.toLocaleString() : "—"}</span>
            {prices.length > 1 && (
              <span className="ml-1 text-xs flex items-center">
                {getChangeIcon()} {Math.abs(priceChange).toFixed(2)}%
              </span>
            )}
          </>
        )}
      </div>
      <div className="w-20 h-6">
        {prices.length > 1 ? (
          <Sparklines data={prices} svgWidth={80} svgHeight={24}>
            <SparklinesLine
              color={priceChange >= 0 ? "#34D399" : "#F87171"}
              style={{ strokeWidth: 2, strokeLinecap: "round", fill: "none" }}
            />
            <SparklinesSpots
              size={3}
              style={{ fill: priceChange >= 0 ? "#34D399" : "#F87171" }}
            />
          </Sparklines>
        ) : (
          <div className="h-full w-full bg-gray-700 rounded animate-pulse"></div>
        )}
      </div>
    </div>
  )
}

export default function Headerpage() {
  const [openMenu, setOpenMenu] = useState<null | "trade" | "institution">(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const tradeRef = useRef<HTMLDivElement>(null)
  const institutionRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tradeRef.current &&
        !tradeRef.current.contains(event.target as Node) &&
        institutionRef.current &&
        !institutionRef.current.contains(event.target as Node) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null)
        setMobileMenuOpen(false)
      }
    }

    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = (menu: "trade" | "institution") => {
    setOpenMenu(openMenu === menu ? null : menu)
  }

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  const handleKeyDown = (event: React.KeyboardEvent, menu: "trade" | "institution") => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      toggleMenu(menu)
    }
    if (event.key === "Escape") {
      setOpenMenu(null)
    }
  }

  return (
    <header
      className={`bg-gray-900 text-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-xl bg-opacity-95 backdrop-blur-sm" : "shadow-md"
      }`}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo + BTC Chart */}
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-extrabold tracking-tight cursor-pointer select-none bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Crescent
            </div>
            <LiveBTCChart />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8 font-medium text-gray-300 relative">
            <a
              href="#"
              className={`relative px-3 py-2 rounded-lg transition-all ${
                hoveredItem === "buy" ? "text-white" : "hover:text-white"
              }`}
              onMouseEnter={() => setHoveredItem("buy")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Buy Crypto
              {hoveredItem === "buy" && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-blue-400 rounded-full"></span>
              )}
            </a>
            <a
              href="#"
              className={`relative px-3 py-2 rounded-lg transition-all ${
                hoveredItem === "prices" ? "text-white" : "hover:text-white"
              }`}
              onMouseEnter={() => setHoveredItem("prices")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Prices
              {hoveredItem === "prices" && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-blue-400 rounded-full"></span>
              )}
            </a>

            {/* Trade dropdown */}
            <div className="relative" ref={tradeRef}>
              <button
                onClick={() => toggleMenu("trade")}
                onKeyDown={(e) => handleKeyDown(e, "trade")}
                aria-haspopup="true"
                aria-expanded={openMenu === "trade"}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all relative ${
                  openMenu === "trade" || hoveredItem === "trade"
                    ? "text-white"
                    : "hover:text-white text-gray-300"
                }`}
                onMouseEnter={() => setHoveredItem("trade")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span>Trade</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    openMenu === "trade" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {(openMenu === "trade" || hoveredItem === "trade") && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-blue-400 rounded-full"></span>
                )}
              </button>
              <div
                className={`absolute left-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-xl ring-1 ring-gray-700 transition-all duration-200 origin-top ${
                  openMenu === "trade"
                    ? "opacity-100 visible scale-y-100"
                    : "opacity-0 invisible scale-y-95 pointer-events-none"
                }`}
                role="menu"
                aria-label="Trade submenu"
              >
                <div className="py-1">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors rounded mx-1 my-1"
                    role="menuitem"
                    tabIndex={openMenu === "trade" ? 0 : -1}
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      ></path>
                    </svg>
                    Spot Trading
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors rounded mx-1 my-1"
                    role="menuitem"
                    tabIndex={openMenu === "trade" ? 0 : -1}
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Margin Trading
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors rounded mx-1 my-1"
                    role="menuitem"
                    tabIndex={openMenu === "trade" ? 0 : -1}
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      ></path>
                    </svg>
                    Futures
                  </a>
                </div>
              </div>
            </div>

            <a
              href="#"
              className={`relative px-3 py-2 rounded-lg transition-all ${
                hoveredItem === "staking" ? "text-white" : "hover:text-white"
              }`}
              onMouseEnter={() => setHoveredItem("staking")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              Staking
              {hoveredItem === "staking" && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-6 bg-blue-400 rounded-full"></span>
              )}
            </a>

            {/* Institution dropdown */}
            <div className="relative" ref={institutionRef}>
              <button
                onClick={() => toggleMenu("institution")}
                onKeyDown={(e) => handleKeyDown(e, "institution")}
                aria-haspopup="true"
                aria-expanded={openMenu === "institution"}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all relative ${
                  openMenu === "institution" || hoveredItem === "institution"
                    ? "text-white"
                    : "hover:text-white text-gray-300"
                }`}
                onMouseEnter={() => setHoveredItem("institution")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span>Institution</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    openMenu === "institution" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {(openMenu === "institution" || hoveredItem === "institution") && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-8 bg-blue-400 rounded-full"></span>
                )}
              </button>
              <div
                className={`absolute left-0 mt-1 w-56 bg-gray-800 rounded-lg shadow-xl ring-1 ring-gray-700 transition-all duration-200 origin-top ${
                  openMenu === "institution"
                    ? "opacity-100 visible scale-y-100"
                    : "opacity-0 invisible scale-y-95 pointer-events-none"
                }`}
                role="menu"
                aria-label="Institution submenu"
              >
                <div className="py-1">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors rounded mx-1 my-1"
                    role="menuitem"
                    tabIndex={openMenu === "institution" ? 0 : -1}
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                    Institutional Accounts
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors rounded mx-1 my-1"
                    role="menuitem"
                    tabIndex={openMenu === "institution" ? 0 : -1}
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      ></path>
                    </svg>
                    API Access
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors rounded mx-1 my-1"
                    role="menuitem"
                    tabIndex={openMenu === "institution" ? 0 : -1}
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    White Label
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Buttons */}
          <div className="hidden md:flex space-x-3 items-center">
            <button className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Log In
            </button>
            <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md hover:shadow-lg">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden" ref={mobileMenuRef}>
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-gray-900 shadow-xl rounded-b-lg mt-1 py-3 px-4 space-y-2 font-medium text-gray-300 z-50">
                <a
                  href="#"
                  className="block px-3 py-2 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
                >
                  Buy Crypto
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
                >
                  Prices
                </a>

                {/* Mobile dropdowns */}
                <MobileDropdown
                  title="Trade"
                  items={[
                    { label: "Spot Trading", href: "#", icon: "blue-400" },
                    { label: "Margin Trading", href: "#", icon: "purple-400" },
                    { label: "Futures", href: "#", icon: "green-400" },
                  ]}
                />

                <a
                  href="#"
                  className="block px-3 py-2 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
                >
                  Staking
                </a>

                <MobileDropdown
                  title="Institution"
                  items={[
                    { label: "Institutional Accounts", href: "#", icon: "indigo-400" },
                    { label: "API Access", href: "#", icon: "yellow-400" },
                    { label: "White Label", href: "#", icon: "pink-400" },
                  ]}
                />

                <div className="flex space-x-3 pt-3 border-t border-gray-700">
                  <button className="flex-1 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Log In
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileDropdown({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string; icon?: string }[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-3 py-2 rounded-lg hover:text-white hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pl-4 mt-1 space-y-1">
          {items.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              className="flex items-center px-3 py-2 rounded-lg hover:text-white hover:bg-gray-700 transition-all focus:outline-none focus:bg-gray-700"
            >
              {icon && (
                <span
                  className={`w-2 h-2 rounded-full bg-${icon} mr-2`}
                  aria-hidden="true"
                ></span>
              )}
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}