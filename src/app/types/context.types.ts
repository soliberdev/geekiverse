export type UserRole = 'User' | 'Admin';

export interface RoleContextValue {
    role: UserRole;
    toggleRole: () => void;
}

export interface AiChatContextValue {
    chatIsOpen: boolean;
    toggleOpenAiChat: () => void;
}
