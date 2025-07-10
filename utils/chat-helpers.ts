    import type { Message } from "ai"

export const chatHelpers = {
  formatTimestamp(date: Date): string {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  },

  getMessageCount(messages: Message[]): number {
    return messages.length
  },

  getLastUserMessage(messages: Message[]): Message | null {
    const userMessages = messages.filter((m) => m.role === "user")
    return userMessages.length > 0 ? userMessages[userMessages.length - 1] : null
  },

  truncateMessage(content: string, maxLength = 100): string {
    return content.length > maxLength ? content.substring(0, maxLength) + "..." : content
  },
}
