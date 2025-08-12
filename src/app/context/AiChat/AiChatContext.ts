'use client'

import { AiChatContextValue } from "@/app/types/context.types";
import { createContext } from "react";

export const AiChatContext = createContext<AiChatContextValue | undefined>(undefined);