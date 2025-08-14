import { useChat } from "@ai-sdk/react";

export type UserRole = 'User' | 'Admin';

export interface RoleContextValue {
    role: UserRole;
    toggleRole: () => void;
}

type Messages = ReturnType<typeof useChat>["messages"];
type Status = ReturnType<typeof useChat>["status"];
export interface AiChatContextValue {
    chatIsOpen: boolean;
    toggleOpenAiChat: () => void;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleSend: () => void;
    messages: Messages;
    status: Status;
}
