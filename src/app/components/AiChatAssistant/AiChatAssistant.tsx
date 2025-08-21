'use client'

import { ChatInput } from "./ChatInput";
import { UserMessage } from "./UserMessage";
import { AiMessage } from "./AiMessage";
import { useAiChat } from "@/app/context/AiChat/useAiChat";
import { ChatLoader } from "./ChatLoader";
import { useEffect, useRef } from "react";

export const AiChatAssistant = () => {

    const { chatIsOpen, toggleOpenAiChat, input, setInput, handleSend, messages, status } = useAiChat();
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=> {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    },[messages]);

    useEffect(() => {
        if(chatIsOpen){
            bottomRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
        }
    }, [chatIsOpen]);

    return (
        <div 
            className="fixed bottom-0 left-0 w-full ml-auto px-4 py-2 md:w-[55%] lg:w-[30%] md:right-0 drop-shadow-custom-2"
            style={{ filter: 'var(--drop-shadow-custom-hat)' }}
        >
            
            {!chatIsOpen && (
            <div className="cursor-pointer select-none relative"
                onClick={toggleOpenAiChat}
            >
                <div className="absolute -top-10 -left-2 md:-left-4">
                    <img src="/img/Hat.png" alt="Luffy's Hat" className="w-30 drop-shadow-custom-2" />
                </div>

                <div className="bg-red-800 p-2 rounded-lg">
                    <ChatInput input={input} setInput={setInput} onSend={handleSend} />
                </div>
            </div>
            )}
         
            {chatIsOpen && (
                <div className="mt-2 p-2 bg-[#1a1a1a] rounded-lg relative flex flex-col gap-2 justify-center  max-h-[70vh] min-h-[70vh]">
                    <img src="/img/Luffy.png" alt="Luffy" className="absolute w-[38%] md:w-[50%] md:-top-38 -top-30 drop-shadow-custom-3" />
                    <button
                        className="absolute -top-10 right-0 text-black cursor-pointer hover:rotate-20 transition-all ease-in-out"
                        onClick={toggleOpenAiChat}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                    <div className="mt-2 px-2 w-full overflow-y-auto flex-1 flex flex-col gap-5 custom-scrollbar">
                        {messages.map((message) => (
                            <div key={message.id} className="flex flex-col whitespace-pre-wrap text-white">
                            {message.role === 'user' ? 
                                <UserMessage parts={message.parts} />
                             : 
                                <AiMessage parts={message.parts} />
                            }
                            </div>
                        ))}

                        {(status === 'submitted') && <ChatLoader />}
                        <div ref={bottomRef} />
                    </div>
                    <ChatInput input={input} setInput={setInput} onSend={handleSend} />
                </div>
            )}
        </div>
    );
};