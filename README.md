# VoiceCare AI 🎤💙

A modern, voice-first health assistant built with Next.js that helps users understand health information through natural conversation.

## ✨ Features

- **Voice Recording**: Tap-to-speak interface for natural health questions
- **Timeline**: Track your health conversations and progress over time
- **Guide**: Browse health topics and get reliable information
- **Navigator**: Explore health resources and find what you need
- **Journal**: Keep personal health notes and reflections
- **Accessibility**: Built-in accessibility features for inclusive design
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Modern UI**: Glass morphism design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd voicecare-ai
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Usage

1. **Ask Questions**: Tap the microphone button and ask any health question in your own words
2. **Listen**: The app processes your voice input and provides helpful responses
3. **Track**: Use the Timeline to see your conversation history
4. **Explore**: Browse the Guide for health topics and use Navigator to find resources
5. **Journal**: Keep personal notes about your health journey

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glass morphism effects
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Fonts**: Geist & Geist Mono

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── analytics/         # Analytics pages
│   ├── doctor-prep/       # Doctor preparation features
│   ├── guide/            # Health guide pages
│   ├── history/          # Conversation history
│   ├── journal/          # Personal health journal
│   ├── listening/        # Voice processing pages
│   ├── navigator/        # Health resource navigation
│   ├── response/         # AI response handling
│   ├── settings/         # App settings
│   └── timeline/         # Timeline features
├── components/           # Reusable React components
│   ├── ui/              # Base UI components
│   └── ...              # Feature-specific components
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── public/              # Static assets
├── styles/              # Global styles
└── utils/               # Helper functions
```

## 🎨 Design Features

- **Glass Morphism**: Modern frosted glass effects throughout the UI
- **Responsive Layout**: Mobile-first design that scales beautifully
- **Accessibility**: Built-in accessibility panel and ARIA compliance
- **Smooth Animations**: Subtle animations for better user experience
- **Dark/Light Mode**: Automatic theme detection and switching

## ⚠️ Important Notice

VoiceCare AI provides general health information only. Always consult a healthcare professional for medical advice, diagnosis, or treatment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.dev) for rapid prototyping
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
