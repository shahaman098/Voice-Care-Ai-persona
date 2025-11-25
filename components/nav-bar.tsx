"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Clock, BookOpen, Compass, Search, Settings } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/timeline", icon: Clock, label: "Timeline" },
  { href: "/guide", icon: Search, label: "Guide" },
  { href: "/navigator", icon: Compass, label: "Navigator" },
  { href: "/journal", icon: BookOpen, label: "Journal" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-heavy z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="w-full px-2">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 py-4 px-2 transition-all rounded-xl mx-1",
                    isActive
                      ? "text-primary bg-primary/10 scale-105 font-semibold"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5 active:scale-95",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon className={cn("w-6 h-6 transition-transform", isActive && "scale-110")} />
                  <span className="text-[10px] font-medium truncate">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav >
  )
}
