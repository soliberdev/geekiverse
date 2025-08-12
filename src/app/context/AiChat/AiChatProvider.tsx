'use client'

import { ReactNode, useState } from "react";
import { AiChatContext } from "./AiChatContext";

type AiChatProviderProps = {
    children: ReactNode;
};

export const AiChatProvider = ({ children }: AiChatProviderProps) => {

  const [chatIsOpen, setChatIsOpen] = useState(false);

  const toggleOpenAiChat = () => {
        setChatIsOpen(!chatIsOpen);
    };

  return (
    <AiChatContext.Provider value={{ chatIsOpen, toggleOpenAiChat}}>
        {children}
    </AiChatContext.Provider>
  )
}