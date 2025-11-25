"use client"

import type React from "react"

import { useState } from "react"
import { Search, Heart, Activity, Pill, Scan, Bone, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatBubble } from "@/components/chat-bubble"
import { AudioPlayer } from "@/components/audio-player"
import { TopicTile } from "@/components/topic-tile"
import { getGuideExplanation, type GuideResponse } from "@/utils/api"
import { saveTimelineEntry } from "@/utils/storage"

const quickTopics = [
  { label: "Blood Pressure", icon: Activity },
  { label: "Cholesterol", icon: Heart },
  { label: "Diabetes", icon: Pill },
  { label: "CT Scan", icon: Scan },
  { label: "X-Ray", icon: Bone },
  { label: "Medications", icon: Pill },
]

export default function GuidePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<GuideResponse | null>(null)
  const [currentQuery, setCurrentQuery] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSearch = async (term: string) => {
    if (!term.trim()) return

    setIsLoading(true)
    setCurrentQuery(term)
    setResponse(null)
    setSaved(false)

    try {
      const result = await getGuideExplanation(term)
      setResponse(result)
    } catch (error) {
      console.error("Failed to get guide explanation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchTerm)
  }

  const handleTopicClick = (topic: string) => {
    setSearchTerm(topic)
    handleSearch(topic)
  }

  const handleAddToTimeline = () => {
    if (!response || !currentQuery) return

    saveTimelineEntry({
      type: "guide",
      title: `Health Guide: ${currentQuery}`,
      content: response.explanation,
      audioBase64: response.audioBase64,
      metadata: { nextSteps: response.nextSteps.join("; ") },
    })
    setSaved(true)
  }

  return (
    <main className="min-h-screen pb-24 bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Health Guide</h1>
              <p className="text-sm text-muted-foreground">Learn about health topics</p>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search health topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isLoading || !searchTerm.trim()}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
            </Button>
          </form>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Quick Topics */}
        {!response && !isLoading && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Quick Topics</h2>
            <div className="grid grid-cols-3 gap-3">
              {quickTopics.map((topic) => (
                <TopicTile
                  key={topic.label}
                  label={topic.label}
                  icon={topic.icon}
                  onClick={() => handleTopicClick(topic.label)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Looking up "{currentQuery}"...</p>
          </div>
        )}

        {/* Response */}
        {response && !isLoading && (
          <div className="space-y-4">
            {/* User Query */}
            <ChatBubble message={currentQuery} isAI={false} />

            {/* AI Response */}
            <ChatBubble message={response.explanation} isAI />

            {/* Audio Player */}
            {response.audioBase64 && <AudioPlayer audioBase64={response.audioBase64} label="Listen to explanation" />}

            {/* Next Steps */}
            {response.nextSteps.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-3">Next Steps</h3>
                <ul className="space-y-2">
                  {response.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleAddToTimeline}
                disabled={saved}
                className="flex-1"
                variant={saved ? "secondary" : "default"}
              >
                <Plus className="w-4 h-4 mr-2" />
                {saved ? "Saved to Timeline" : "Add to Timeline"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setResponse(null)
                  setSearchTerm("")
                  setCurrentQuery("")
                }}
              >
                New Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
