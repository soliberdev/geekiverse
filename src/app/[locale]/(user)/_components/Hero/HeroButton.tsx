'use client'

import { useAiChat } from "@/app/context/AiChat/useAiChat"

export const HeroButton = ({ label }: { label: string }) => {
  const { chatIsOpen, toggleOpenAiChat} = useAiChat();

  return (
    <button 
      className="group relative text-lg bg-brick-red-500 hover:bg-brick-red-600 w-3xs p-4  text-white border-2 border-woodsmoke-500 rounded-lg shadow-custom-woodsmoke cursor-pointer active:translate-1.5 active:shadow-none transition-all duration-200 ease-in-out"
      aria-label="Open chatbot and discover products"
      onClick={toggleOpenAiChat}
    >
      <div className="relative overflow-hidden flex flex-col items-center">
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-8">
            {label}
          </span>
                
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="absolute inline-block translate-y-8 group-hover:translate-y-0 lucide lucide-shopping-cart-icon lucide-shopping-cart transition-transform duration-300" 
            aria-hidden="true" 
            focusable="false">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
      </div>
    </button>
  )
}