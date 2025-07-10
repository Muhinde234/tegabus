"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { MessageCircle, X, ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "./autoresize-textarea"

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, setInput, append, isLoading } = useChat({
    api: "/api/chat",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      void append({ content: input, role: "user" })
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-green-200 rounded-lg shadow-2xl border border-green-200 flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-green-700 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} className="text-lime-400" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white bg-lime-500 hover:bg-green-600 h-6 w-6 p-0"
            >
              <X size={16} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm">
                <div className="mb-2">👋</div>
                <p>Hello! I'm your AI assistant.</p>
                <p>How can I help you today?</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    message.role === "user" ? "bg-green-500 text-white ml-auto" : "bg-gray-100 text-gray-900",
                  )}
                >
                  {message.content}
                </div>
              ))
            )}
            {isLoading && (
              <div className="bg-gray-100 text-green-800 max-w-[80%] rounded-lg px-3 py-2 text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-green-700 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 relative">
            <div className="flex items-end space-x-2">
              <AutoResizeTextarea
                onKeyDown={handleKeyDown}
                onChange={(v) => setInput(v)}
                value={input}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none min-h-[36px] max-h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button type="submit" size="sm" disabled={!input.trim() || isLoading} className="h-9 w-9 p-0 rounded-lg">
                <ArrowUpIcon size={16} />
              </Button>
            </div>
          </form>
        </div>
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
            {isOpen ? "Close chat" : "Click for help"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
