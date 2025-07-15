"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { MessageCircle, X, ArrowUpIcon, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AutoResizeTextarea } from "./auto-resize-textarea"
import { LoadingIndicator } from "./loading-indicator"
import { chatConfig, type AIProvider } from "@/utils/chat-config"
import { systemPrompts, type SystemPromptType } from "@/utils/system-prompts"
import type { Message } from "ai"
import ReactMarkdown from "react-markdown";


interface ChatWindowProps {
  messages: Message[]
  input: string
  setInput: (value: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  onClose: () => void
  selectedProvider: AIProvider
  onProviderChange: (provider: AIProvider) => void
  systemPromptType: SystemPromptType
  onSystemPromptChange: (type: SystemPromptType) => void
}

export function ChatWindow({
  messages,
  input,
  setInput,
  onSubmit,
  isLoading,
  onClose,
  selectedProvider,
  onProviderChange,
  systemPromptType,
  onSystemPromptChange,
}: ChatWindowProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  return (
    <div className="fixed bottom-20 right-4 w-[440px] h-[640px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-green-500 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="font-semibold">{chatConfig.title}</span>
        </div>
        <div className="flex items-center space-x-2">
          {/* Settings Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-green-600 h-6 w-6 p-0">
                <Settings size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" side="left">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">AI Provider</label>
                  <Select value={selectedProvider} onValueChange={onProviderChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(chatConfig.providers).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Assistant Type</label>
                  <Select value={systemPromptType} onValueChange={onSystemPromptChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(systemPrompts).map((key) => (
                        <SelectItem key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-green-600 h-6 w-6 p-0">
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Provider Indicator */}
      <div className="px-4 py-2 bg-gray-50 border-b text-xs text-gray-600">
        Using: {chatConfig.providers[selectedProvider].name} • {systemPromptType.replace("_", " ")} mode
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">
            <div className="mb-2">👋</div>
            <p>{chatConfig.welcomeMessage.greeting}</p>
            <p>{chatConfig.welcomeMessage.question}</p>
          </div>
        ) : (
            messages.map((message, index) => (
                <div
                    key={index}
                    className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
                        message.role === "user"
                            ? "bg-green-500 text-white ml-auto"
                            : "bg-gray-100 text-gray-900"
                    )}
                >
                  {message.role === "assistant" ? (
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                      message.content
                  )}
                </div>
            ))
        )}
        {isLoading && <LoadingIndicator />}
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="border-t border-gray-200 p-3 relative">
        <div className="flex items-end space-x-2">
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={(v) => setInput(v)}
            value={input}
            placeholder={chatConfig.inputPlaceholder}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none min-h-[36px] max-h-20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <Button type="submit" size="sm" disabled={!input.trim() || isLoading} className="h-9 w-9 p-0 rounded-lg">
            <ArrowUpIcon size={16} />
          </Button>
        </div>
      </form>
    </div>
  )
}
