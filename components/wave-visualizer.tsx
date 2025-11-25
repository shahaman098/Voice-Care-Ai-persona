"use client"

import { useEffect, useRef } from "react"

interface WaveVisualizerProps {
  isActive: boolean
  barCount?: number
}

export function WaveVisualizer({ isActive, barCount = 12 }: WaveVisualizerProps) {
  const barsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !barsRef.current) return

    const bars = barsRef.current.children
    const interval = setInterval(() => {
      Array.from(bars).forEach((bar) => {
        const height = Math.random() * 100
        ;(bar as HTMLElement).style.height = `${20 + height * 0.6}%`
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div
      ref={barsRef}
      className="flex items-end justify-center gap-1 h-24 w-full max-w-xs mx-auto"
      role="status"
      aria-label={isActive ? "Recording in progress" : "Ready to record"}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={`w-2 rounded-full transition-all duration-100 ${
            isActive ? "bg-foreground/60 dark:bg-foreground/50" : "bg-foreground/20 dark:bg-foreground/15"
          }`}
          style={{
            height: isActive ? "50%" : "20%",
            transitionDelay: `${i * 30}ms`,
          }}
        />
      ))}
    </div>
  )
}
