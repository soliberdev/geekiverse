'use client'

import { ReactNode, useEffect, useMemo, useState } from "react";
import { AiChatContext } from "./AiChatContext";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { useLocale, useTranslations } from "next-intl";


type AiChatProviderProps = {
    children: ReactNode;
};

export const AiChatProvider = ({ children }: AiChatProviderProps) => {
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const locale = useLocale();
  const t = useTranslations('AiAssistant');

  const storageKey = useMemo(() => `chatMessages:${locale}`, [locale]);

  const greetingMessage = useMemo<UIMessage[]>(() => [
    {
      id: "0000000000000000000",
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: t('initialMessageDefault'),
        },
      ],
    },
  ], [t]);

  const getInitialMessages = (): UIMessage[] => {
    if (typeof window === "undefined") {
      return greetingMessage;
    }
    const savedMessages = sessionStorage.getItem(storageKey);
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
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  return (
    <AiChatContext.Provider value={{ chatIsOpen, toggleOpenAiChat, input, setInput, handleSend, messages, status}}>
        {children}
    </AiChatContext.Provider>
  )
}