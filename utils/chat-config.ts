export type AIProvider = "openai" | "gemini" | "claude"

export type SystemPromptType = "default" | "helpful" | "creative"

export interface ProviderConfig {
  name: string
  description: string
  model: string
  maxTokens: number
  temperature: number
}

export const chatConfig = {
  title: "AI Assistant",
  defaultProvider: "openai" as AIProvider,
  inputPlaceholder: "Type your message...",
  welcomeMessage: {
    greeting: "Hello! I'm your AI assistant.",
    question: "How can I help you today?",
  },
  tooltips: {
    open: "Click for help",
    close: "Close chat",
  },
  providers: {
    openai: {
      name: "OpenAI GPT",
      description: "Fast and reliable AI assistant",
      model: "gpt-4o-mini",
      maxTokens: 500,
      temperature: 0.7,
    },
    gemini: {
      name: "Google Gemini",
      description: "Google's advanced AI model",
      model: "gemini-1.5-flash",
      maxTokens: 500,
      temperature: 0.7,
    },
    claude: {
      name: "Anthropic Claude",
      description: "Thoughtful and helpful AI assistant",
      model: "claude-3-sonnet-20240229",
      maxTokens: 500,
      temperature: 0.7,
    },
  },
}
