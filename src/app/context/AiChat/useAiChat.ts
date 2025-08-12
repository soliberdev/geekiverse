import { useContext } from "react";
import { AiChatContext } from "./AiChatContext";
import { AiChatContextValue } from "@/app/types/context.types";

export const useAiChat = (): AiChatContextValue  => {
    const context = useContext(AiChatContext);
    if(!context) {
        throw new Error("useAiChat must be used within a AiChatProvider");
    }
    return context;
}