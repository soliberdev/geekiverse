'use client'

import { useAiChat } from '@/app/context/AiChat/useAiChat';
import { FormEvent } from 'react';

export const ChatInput = () => {
    const { input, setInput, handleSend, chatIsOpen, toggleOpenAiChat } = useAiChat();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSend();
        if (!chatIsOpen) {
            toggleOpenAiChat();
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-md border"
        >
            <input
                type="text"
                value={input}
                placeholder="Ask AI"
                className="p-2 w-full rounded-md focus:outline-0"
                onClick={(e) => e.stopPropagation()} 
                onChange={(e) => setInput(e.currentTarget.value)}
            />
            <button 
                type="submit"
                className="group cursor-pointer h-9 flex items-center justify-center rounded-full aspect-square m-1"
                onClick={(e) => e.stopPropagation()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-send-icon lucide-send group-hover:transform group-hover:rotate-45 transition-all ease-in-out text-black group-hover:text-brick-red-700">
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>
                    <path d="m21.854 2.147-10.94 10.939"/>
                </svg>
            </button>
        </form>
    );
};
