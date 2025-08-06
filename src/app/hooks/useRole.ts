import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import type { RoleContextValue } from "../types/context.types";

export const useRole = (): RoleContextValue  => {
    const context = useContext(RoleContext);
    if(!context) {
        throw new Error("useRole must be used within a RoleProvider");
    }
    return context;
}
