const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

export interface VoiceResponse {
  transcript: string
  ai_text: string
  audio_base64?: string
}

// Upload audio blob to backend for transcription and AI response
export async function uploadAudio(blob: Blob): Promise<VoiceResponse> {
  const formData = new FormData()
  formData.append("audio", blob, "recording.webm")

  const response = await fetch(`${API_BASE_URL}/voice-to-text`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to process audio")
  }

  return response.json()
}

// Get AI response for a text query
export async function getAIResponse(text: string): Promise<{ ai_text: string }> {
  const response = await fetch(`${API_BASE_URL}/ai-response`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })

  if (!response.ok) {
    throw new Error("Failed to get AI response")
  }

  return response.json()
}

// Convert text to speech
export async function getVoiceOutput(text: string): Promise<{ audio_base64: string }> {
  const response = await fetch(`${API_BASE_URL}/text-to-voice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })

  if (!response.ok) {
    throw new Error("Failed to generate voice")
  }

  return response.json()
}

// Combined endpoint for demo purposes
export async function processVoiceQuery(blob: Blob): Promise<VoiceResponse> {
  const formData = new FormData()
  formData.append("audio", blob, "recording.webm")

  const response = await fetch(`${API_BASE_URL}/process-audio`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    // Return demo response if backend not connected
    return {
      transcript: "What should I do if I have a headache?",
      ai_text: `**What it means:**
A headache is pain in your head. It's very common and usually not serious.

**Simple steps you can try:**
• Drink a glass of water - you might be thirsty
• Rest in a quiet, dark room
• Take a break from screens
• Try a cold or warm compress on your forehead

**When to see a doctor:**
If your headache is very strong, doesn't go away, or comes with other symptoms like fever or vision changes.

**Questions to ask your doctor:**
• How often should I worry about headaches?
• What pain relief is safe for me?
• Could my headaches be related to stress?`,
      audio_base64: undefined,
    }
  }

  return response.json()
}

// Health Guide API endpoint
export interface GuideResponse {
  explanation: string
  nextSteps: string[]
  audioBase64?: string
}

export async function getGuideExplanation(term: string): Promise<GuideResponse> {
  const response = await fetch(`${API_BASE_URL}/ai-guide`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ term }),
  })

  if (!response.ok) {
    // Demo fallback response
    return {
      explanation: `**What is ${term}?**\n\n${term} is a common health topic. Here's what you should know:\n\n• This is general health information\n• It's not a diagnosis or medical advice\n• Always talk to your doctor for personalized guidance\n\n**In simple terms:**\nThis relates to your overall health and wellness. Understanding it helps you have better conversations with your healthcare team.`,
      nextSteps: [
        "Write down any questions you have",
        "Talk to your doctor at your next visit",
        "Keep track of any related symptoms",
      ],
    }
  }

  return response.json()
}

// Next Steps Navigator API endpoint
export interface NavigatorResponse {
  whatToExpect: string[]
  thingsToBring: string[]
  questionsToAsk: string[]
  notes: string
  audioBase64?: string
}

export async function getNextSteps(query: string): Promise<NavigatorResponse> {
  const response = await fetch(`${API_BASE_URL}/ai-navigator`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    // Demo fallback response
    return {
      whatToExpect: [
        "The doctor will review your symptoms and history",
        "You may have a physical examination",
        "They might order tests if needed",
        "You'll discuss a care plan together",
      ],
      thingsToBring: [
        "Your ID and insurance card",
        "List of current medications",
        "Notes about your symptoms",
        "Any recent test results",
      ],
      questionsToAsk: [
        "What could be causing my symptoms?",
        "What tests do I need?",
        "What are my treatment options?",
        "When should I follow up?",
      ],
      notes:
        "Remember: You can always ask your doctor to explain things in simpler terms. It's okay to take notes or bring someone with you for support.",
    }
  }

  return response.json()
}
