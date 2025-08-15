"use client"

import { useEffect, useState, useRef } from "react"
import { Sparklines, SparklinesLine } from "react-sparklines"

export default function LiveBTCChart() {
  const [prices, setPrices] = useState<number[]>([])
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  async function fetchPrice() {
    try {
      // CoinGecko simple price API
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      const data = await res.json()
      const price = data.bitcoin.usd

      setCurrentPrice(price)
      setPrices((prev) => {
        const newArr = [...prev, price]
        if (newArr.length > 20) newArr.shift() // keep last 20 points
        return newArr
      })
    } catch (error) {
      console.error("Failed to fetch BTC price:", error)
    }
  }

  useEffect(() => {
    fetchPrice() // initial fetch
    intervalRef.current = setInterval(fetchPrice, 10000) // every 10s

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="flex items-center space-x-3 text-sm font-mono text-green-400 select-none">
      <div className="font-semibold">BTC/USD</div>
      <div>${currentPrice ? currentPrice.toLocaleString() : "Loading..."}</div>
      <div className="w-20 h-6">
        {prices.length > 1 ? (
          <Sparklines data={prices} svgWidth={80} svgHeight={24}>
            <SparklinesLine color="#34D399" style={{ strokeWidth: 3, strokeLinecap: "round" }} />
          </Sparklines>
        ) : (
          <div className="text-gray-500">Loading chart...</div>
        )}
      </div>
    </div>
  )
}
