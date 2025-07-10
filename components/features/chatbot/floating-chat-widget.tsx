"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { ChatWindow } from "./chat-window"
import { chatConfig, type AIProvider } from "@/utils/chat-config"
import type { SystemPromptType } from "@/utils/system-prompts"

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(chatConfig.defaultProvider)
  const [systemPromptType, setSystemPromptType] = useState<SystemPromptType>("default")

  const { messages, input, setInput, append, isLoading } = useChat({
    api: "/api/chat",
    body: {
      provider: selectedProvider,
      systemPromptType: systemPromptType,
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      void append({ content: input, role: "user" })
      setInput("")
    }
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onClose={() => setIsOpen(false)}
          selectedProvider={selectedProvider}
          onProviderChange={setSelectedProvider}
          systemPromptType={systemPromptType}
          onSystemPromptChange={setSystemPromptType}
        />
      )}

      {/* Floating Chat Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40",
                isOpen ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600",
              )}
            >
              {isOpen ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={8}>
            {isOpen ? chatConfig.tooltips.close : chatConfig.tooltips.open}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
