"use client"

import { useRef, useCallback } from "react"
import { Mic, Square } from "lucide-react"

interface MicButtonProps {
  isRecording: boolean
  isDisabled: boolean
  onStartRecording: () => void
  onStopRecording: (audioBlob: Blob) => void
}

export function MicButton({ isRecording, isDisabled, onStartRecording, onStopRecording }: MicButtonProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      })

      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" })
        stream.getTracks().forEach((track) => track.stop())
        onStopRecording(audioBlob)
      }

      mediaRecorder.start()
      onStartRecording()
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Could not access microphone. Please check permissions.")
    }
  }, [onStartRecording, onStopRecording])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }
  }, [])

  const handleClick = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        relative w-28 h-28 rounded-full flex items-center justify-center
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-white/30
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isRecording
          ? "glass-heavy scale-110 text-foreground"
          : "glass hover:scale-105 hover:shadow-xl text-foreground animate-breathing"
        }
      `}
      aria-label={isRecording ? "Stop recording" : "Start recording"}
    >
      {/* Pulse rings when recording */}
      {isRecording && (
        <>
          <span className="absolute inset-0 rounded-full bg-white/20 dark:bg-white/10 animate-pulse-ring" />
          <span
            className="absolute inset-0 rounded-full bg-white/15 dark:bg-white/8 animate-pulse-ring"
            style={{ animationDelay: "0.5s" }}
          />
        </>
      )}

      {isRecording ? (
        <Square className="w-10 h-10 relative z-10" fill="currentColor" />
      ) : (
        <Mic className="w-12 h-12 relative z-10" />
      )}
    </button>
  )
}
