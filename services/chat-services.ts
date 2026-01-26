import { type CreateMessage, AIStream } from "ai"
import { openai } from "@ai-sdk/openai"
import { google } from "@ai-sdk/google"
import { anthropic } from "@ai-sdk/anthropic"
import { chatConfig, type AIProvider } from "../utils/chat-config"
import { systemPrompts, type SystemPromptType } from "../utils/system-prompts"

export const chatService = {
  getModel(provider: AIProvider) {
    switch (provider) {
      case "openai":
        return openai(chatConfig.providers.openai.model)
      case "gemini":
        return google(chatConfig.providers.gemini.model)
      case "claude":
        return anthropic(chatConfig.providers.claude.model)
      default:
        return openai(chatConfig.providers.openai.model)
    }
  },

  async handleChatRequest(req: Request) {
    try {
      const {
        messages,
        provider = chatConfig.defaultProvider,
        systemPromptType = "default",
      }: {
        messages: CreateMessage[]
        provider?: AIProvider
        systemPromptType?: SystemPromptType
      } = await req.json()

      const providerConfig = chatConfig.providers[provider]
      const systemPrompt = systemPrompts[systemPromptType]

      // ✅ AIStream returns a ReadableStream<Uint8Array>
      const stream = AIStream({
        model: this.getModel(provider),
        system: systemPrompt,
        messages,
        maxTokens: providerConfig.maxTokens,
        temperature: providerConfig.temperature,
      })

      // ✅ Pass the stream to the Response constructor
      return new Response(stream, {
        headers: { "Content-Type": "text/event-stream" },
      })
    } catch (error) {
      console.error("Chat service error:", error)
      return new Response("Internal Server Error", { status: 500 })
    }
  },

  validateMessage(message: string): boolean {
    return message.trim().length > 0 && message.length <= 1000
  },

  formatMessage(content: string, role: "user" | "assistant"): CreateMessage {
    return {
      role,
      content: content.trim(),
    }
  },

  getAvailableProviders() {
    return Object.entries(chatConfig.providers).map(([key, config]) => ({
      id: key as AIProvider,
      name: config.name,
      description: config.description,
    }))
  },
}
