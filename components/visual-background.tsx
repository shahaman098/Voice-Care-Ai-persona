"use client"

import { useEffect, useState } from "react"
import { Heart, Activity, Pill, Cross, Sparkles } from "lucide-react"

export function VisualBackground() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Large soft blobs */}
            <div
                className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float"
                style={{ animationDuration: "15s" }}
            />
            <div
                className="absolute top-[40%] right-[10%] w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float"
                style={{ animationDuration: "20s", animationDelay: "2s" }}
            />
            <div
                className="absolute bottom-[10%] left-[20%] w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float"
                style={{ animationDuration: "18s", animationDelay: "5s" }}
            />

            {/* Floating Icons */}
            <div
                className="absolute top-[15%] left-[10%] text-primary/10 animate-float-sway"
                style={{ animationDuration: "12s" }}
            >
                <Heart className="w-12 h-12" />
            </div>

            <div
                className="absolute top-[25%] right-[15%] text-accent/10 animate-float-sway"
                style={{ animationDuration: "14s", animationDelay: "1s" }}
            >
                <Activity className="w-16 h-16" />
            </div>

            <div
                className="absolute bottom-[30%] left-[8%] text-primary/10 animate-float-sway"
                style={{ animationDuration: "16s", animationDelay: "3s" }}
            >
                <Pill className="w-10 h-10" />
            </div>

            <div
                className="absolute bottom-[15%] right-[20%] text-accent/10 animate-float-sway"
                style={{ animationDuration: "13s", animationDelay: "2s" }}
            >
                <Sparkles className="w-14 h-14" />
            </div>

            {/* Small particles */}
            <div
                className="absolute top-[50%] left-[50%] w-4 h-4 rounded-full bg-primary/10 animate-float"
                style={{ animationDuration: "8s", animationDelay: "4s" }}
            />
            <div
                className="absolute top-[20%] right-[30%] w-3 h-3 rounded-full bg-accent/10 animate-float"
                style={{ animationDuration: "10s", animationDelay: "1s" }}
            />
        </div>
    )
}
