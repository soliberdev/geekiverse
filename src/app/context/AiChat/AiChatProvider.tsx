'use client'

import { ReactNode, useEffect, useMemo, useState } from "react";
import { AiChatContext } from "./AiChatContext";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";


type AiChatProviderProps = {
    children: ReactNode;
};

export const AiChatProvider = ({ children }: AiChatProviderProps) => {
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [input, setInput] = useState('');

  const greetingMessage = useMemo<UIMessage[]>(() => [
    {
      id: "0000000000000000000",
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text:
            "Hi there! 👋 I’m Geekibot, your anime shopping buddy at Geekiverse. Looking for merch? Let’s find something you’ll love! 💫",
        },
      ],
    },
  ], []);

  const getInitialMessages = (): UIMessage[] => {
    if (typeof window === "undefined") {
      return greetingMessage;
    }
    const savedMessages = sessionStorage.getItem("chatMessages");
    const parsedMessages = savedMessages ? JSON.parse(savedMessages) : [];
    return parsedMessages.length > 0 ? parsedMessages : greetingMessage;
  };

  const { messages, sendMessage, status } = useChat({
    messages: getInitialMessages(),
    
  });

  const toggleOpenAiChat = () => {
    setChatIsOpen(!chatIsOpen);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  return (
    <AiChatContext.Provider value={{ chatIsOpen, toggleOpenAiChat, input, setInput, handleSend, messages, status}}>
        {children}
    </AiChatContext.Provider>
  )
}