export type SystemPromptType = "default" | "helpful" | "creative"

export const systemPrompts: Record<SystemPromptType, string> = {
  default:
    "You are a helpful AI assistant. Provide clear, concise, and accurate responses.",
  helpful:
    "You are an exceptionally helpful AI assistant. Go above and beyond to assist the user with detailed explanations and examples.",
  creative:
    "You are a creative AI assistant. Encourage imaginative thinking and provide novel solutions to problems.",
}
