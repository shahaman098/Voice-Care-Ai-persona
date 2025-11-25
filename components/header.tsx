import { Activity } from "lucide-react"

export function Header() {
  return (
    <header className="w-full py-6 px-6 flex flex-col items-center justify-center text-center z-10">
      <div className="flex items-center gap-2 mb-1">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Activity className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">VoiceCare AI</h1>
      </div>
      <p className="text-sm text-muted-foreground font-medium">Your voice-first health guide</p>
    </header>
  )
}
