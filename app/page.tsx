"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { MicButton } from "@/components/mic-button"
import { AccessibilityPanel } from "@/components/accessibility-panel"
import { Heart } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)

  const handleStartRecording = useCallback(() => {
    setIsRecording(true)
  }, [])

  const handleStopRecording = useCallback(
    async (audioBlob: Blob) => {
      setIsRecording(false)
      const reader = new FileReader()
      reader.onload = () => {
        sessionStorage.setItem("voicecare-audio", reader.result as string)
        router.push("/listening")
      }
      reader.readAsDataURL(audioBlob)
    },
    [router],
  )

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-8">
      {/* Accessibility toggle in top right with safe area */}
      <div className="fixed top-4 right-4 pt-[env(safe-area-inset-top)] z-40">
        <AccessibilityPanel />
      </div>

      <div className="w-full max-w-md flex flex-col items-center gap-10 text-center">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto animate-pulse-ring">
            <Heart className="w-10 h-10 text-primary" fill="currentColor" />
          </div>
        </div>

        {/* Main CTA - larger and more prominent */}
        <div className="flex flex-col items-center gap-8">
          <p className="text-xl text-foreground font-medium">{isRecording ? "Listening to you..." : "Tap to speak"}</p>

          <MicButton
            isRecording={isRecording}
            isDisabled={false}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />

          <p className="text-muted-foreground max-w-xs leading-relaxed">
            {isRecording ? "Tap again when you're done speaking" : "Ask any health question in your own words"}
          </p>
        </div>

        {/* Footer disclaimer */}
        <footer className="mt-auto">
          <div className="glass-subtle rounded-2xl p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              VoiceCare AI provides general health information only. Always consult a healthcare professional for
              medical advice.
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
