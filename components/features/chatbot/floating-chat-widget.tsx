"use client"

import type React from "react"
import {useState} from "react"
import {cn} from "@/lib/utils"
import {MessageCircle, X} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {ChatWindow} from "./chat-window"
import {type AIProvider, chatConfig} from "@/utils/chat-config"
import type {SystemPromptType} from "@/utils/system-prompts"
import {Message} from "ai";
import {useTegaBusChat} from "@/hooks/useChat";

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(chatConfig.defaultProvider)
  const [systemPromptType, setSystemPromptType] = useState<SystemPromptType>("default")

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { mutate: sendMessage, isPending } = useTegaBusChat();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newMessage]);

    sendMessage(
        { message: input },
        {
          onSuccess: (data) => {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString() + "-bot",
                role: "assistant",
                content: data.reply,
              },
            ]);
          },
        }
    );

    setInput("");
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          isLoading={isPending}
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
                "fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40",
                isOpen ? "bg-gray-500 hover:bg-gray-600" : "bg-green-700 hover:bg-green-600",
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
