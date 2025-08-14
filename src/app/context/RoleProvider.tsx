'use client';

import { useState, useEffect, type ReactNode } from "react";
import { RoleContext } from "./RoleContext";
import { useRouter } from 'next/navigation';
import type { UserRole } from "../types/context.types";

type RoleProviderProps = {
    children: ReactNode;
};

export const RoleProvider = ({ children }: RoleProviderProps) => {
    const [role, setRole] = useState<UserRole>('User');
    const router = useRouter();

    useEffect(() => {
    const storedRole = sessionStorage.getItem('role') as UserRole | null;
    if (storedRole === 'User' || storedRole === 'Admin') {
        setRole(storedRole);
    }
    }, []);

    const toggleRole = () => {
        const newRole: UserRole = role === 'User' ? 'Admin' : 'User';
        setRole(newRole);
        sessionStorage.setItem('role', newRole);
        router.replace(newRole === 'Admin' ? '/admin' : '/');
    };

    return (
    <RoleContext.Provider value={{ role, toggleRole }}>
        {children}
    </RoleContext.Provider>
    );
};
