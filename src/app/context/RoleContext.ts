import { createContext } from "react";
import type { RoleContextValue } from "../types/context.types";

export const RoleContext = createContext<RoleContextValue | undefined>(undefined);