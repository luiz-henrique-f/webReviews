"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ThemeProviderProps } from "next-themes/dist/types"

const queryClient = new QueryClient({
    defaultOptions: {
        // queries: {
        //     refetchInterval: 5000
        // }
    }
});

export function QueryProvider({ children, ...props }: ThemeProviderProps) {
    return <QueryClientProvider client={queryClient} {...props}>{children}</QueryClientProvider>
}