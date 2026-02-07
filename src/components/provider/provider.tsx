"use client"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

export default function Provider({children}: {children: React.ReactNode}) {

const [queryClient ]= useState(()=> new QueryClient)
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            {children}
        </QueryClientProvider>
    )
}
