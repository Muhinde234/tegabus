export const chatConfig = {
  title: "AI Assistant",
  providers: {
    openai: {
      model: "gpt-4o-mini",
      maxTokens: 500,
      temperature: 0.7,
      name: "OpenAI GPT",
      description: "Fast and reliable AI assistant",
    },
    gemini: {
      model: "gemini-1.5-flash",
      maxTokens: 500,
      temperature: 0.7,
      name: "Google Gemini",
      description: "Google's advanced AI model",
    },
    claude: {
      model: "claude-3-sonnet-20240229",
      maxTokens: 500,
      temperature: 0.7,
      name: "Anthropic Claude",
      description: "Thoughtful and helpful AI assistant",
    },
  },
  defaultProvider: "openai" as const,
  inputPlaceholder: "Type your message...",
  welcomeMessage: {
    greeting: "Hello! I'm your AI assistant.",
    question: "How can I help you today?",
  },
  tooltips: {
    open: "Click for help",
    close: "Close chat",
  },
}

export type AIProvider = keyof typeof chatConfig.providers
