"use client"

import type React from "react"

import { useState } from "react"
import { Compass, Loader2, Save, RotateCcw, ClipboardList, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StepsCard } from "@/components/steps-card"
import { QuestionsList } from "@/components/questions-list"
import { SimpleNoteBox } from "@/components/simple-note-box"
import { AudioPlayer } from "@/components/audio-player"
import { getNextSteps, type NavigatorResponse } from "@/utils/api"
import { saveTimelineEntry } from "@/utils/storage"

export default function NavigatorPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<NavigatorResponse | null>(null)
  const [currentQuery, setCurrentQuery] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setCurrentQuery(query)
    setResponse(null)
    setSaved(false)

    try {
      const result = await getNextSteps(query)
      setResponse(result)
    } catch (error) {
      console.error("Failed to get next steps:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveToTimeline = () => {
    if (!response || !currentQuery) return

    const content = `What to expect:\n${response.whatToExpect.join("\n")}\n\nThings to bring:\n${response.thingsToBring.join("\n")}\n\nQuestions to ask:\n${response.questionsToAsk.join("\n")}\n\nNotes:\n${response.notes}`

    saveTimelineEntry({
      type: "navigator",
      title: `Next Steps: ${currentQuery.slice(0, 40)}${currentQuery.length > 40 ? "..." : ""}`,
      content,
      audioBase64: response.audioBase64,
    })
    setSaved(true)
  }

  const handleReset = () => {
    setQuery("")
    setResponse(null)
    setCurrentQuery("")
    setSaved(false)
  }

  return (
    <main className="min-h-screen pb-24 bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Next-Step Navigator</h1>
              <p className="text-sm text-muted-foreground">What should I do next?</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Input Form */}
        {!response && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                What's happening with your health?
              </label>
              <Textarea
                placeholder="Example: I just got blood test results and I'm not sure what they mean..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button type="submit" disabled={isLoading || !query.trim()} className="w-full" size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Getting guidance...
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4 mr-2" />
                  Get Next Steps
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              This provides general guidance only, not medical advice. Always consult your doctor.
            </p>
          </form>
        )}

        {/* Response */}
        {response && !isLoading && (
          <div className="space-y-4">
            {/* Original Query */}
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Your question:</p>
              <p className="text-foreground font-medium">{currentQuery}</p>
            </div>

            {/* Audio Player */}
            {response.audioBase64 && <AudioPlayer audioBase64={response.audioBase64} label="Listen to guidance" />}

            {/* What to Expect */}
            <StepsCard
              title="What to Expect"
              steps={response.whatToExpect}
              icon={<ClipboardList className="w-5 h-5 text-primary" />}
            />

            {/* Things to Bring */}
            <StepsCard
              title="Things to Bring"
              steps={response.thingsToBring}
              icon={<Briefcase className="w-5 h-5 text-chart-2" />}
            />

            {/* Questions to Ask */}
            <QuestionsList questions={response.questionsToAsk} />

            {/* Notes */}
            <SimpleNoteBox note={response.notes} title="Remember" />

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleSaveToTimeline}
                disabled={saved}
                className="flex-1"
                variant={saved ? "secondary" : "default"}
              >
                <Save className="w-4 h-4 mr-2" />
                {saved ? "Saved!" : "Save to Timeline"}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
