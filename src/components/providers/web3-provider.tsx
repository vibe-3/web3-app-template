'use client'

import { type ReactNode, useState } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/config/wagmi'

export function Web3Provider({ children }: { children: ReactNode }) {
  // Create a client instance per component instance
  // This ensures the client is created once and persists across renders
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Prevent automatic refetching during SSR
        staleTime: 60 * 1000,
      },
    },
  }))

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
