# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
bun run dev          # Start dev server (webpack mode with polling for Docker/hot-reload)
bun run build        # Production build
bun run start        # Start production server
bun run lint         # Run ESLint
```

The dev script uses `--webpack` flag to enable polling-based hot reload, required for Docker/Daytona environments.

## Architecture Overview

This is a Next.js 16 Web3 dApp template using the App Router with the following stack:
- **Wagmi + Viem** for Ethereum interactions (configured for Base Sepolia testnet)
- **TanStack Query** for async state management
- **shadcn/ui** (New York style) with Tailwind CSS v4
- **React 19** with React Server Components enabled

### Provider Hierarchy

The app wraps all content in `Web3Provider` (src/components/providers/web3-provider.tsx), which sets up:
1. `WagmiProvider` - Ethereum wallet connectivity
2. `QueryClientProvider` - TanStack Query for data fetching

### Key Directories

- `src/config/wagmi.ts` - Wagmi configuration (chains, connectors, transports)
- `src/components/ui/` - shadcn/ui primitives (installed via `npx shadcn@latest add`)
- `src/lib/utils.ts` - Utility functions including `cn()` for className merging
- `src/hooks/` - Custom React hooks

### Wallet Configuration

Default setup uses Base Sepolia testnet with injected connector (MetaMask, etc.). To add chains:
1. Import from `wagmi/chains`
2. Add to `chains` array in `src/config/wagmi.ts`
3. Configure transport for each chain

### shadcn/ui Component Usage

Components are installed from the shadcn/ui registry. 

Use the `cn()` utility from `@/lib/utils` for conditional class merging.

### Path Aliases

TypeScript configured with `@/*` mapping to `./src/*` for clean imports.

## Critical: Preventing Hydration Errors

**⚠️ IMPORTANT: When working with Web3 components, you MUST prevent hydration mismatches.**

### The Problem
Next.js performs SSR even for `'use client'` components. Wagmi hooks (`useAccount`, `useBalance`, etc.) have different values during SSR vs client hydration, causing React hydration errors.

### Required Pattern
**ANY component that uses wagmi hooks or renders conditionally based on wallet state MUST use this pattern:**

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function MyComponent() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch - render static content until mounted
  if (!mounted) {
    return <div>Loading...</div>;
  }

  // Now safe to render based on wallet state
  if (!isConnected) {
    return <div>Please connect wallet</div>;
  }

  return <div>Connected: {address}</div>;
}
```

### Rules
1. **Never conditionally render** based on `isConnected`, `address`, or any wagmi hook data without a mounted check first
2. **Always add mounted state** to any component using `useAccount`, `useBalance`, `useContractRead`, etc.
3. **The initial return** (when `!mounted`) should render a simple, static loading state
4. **After mounted**, you can safely render dynamic Web3 content

### Why This Works
- Server renders the static loading state
- Client also renders the static loading state on first pass (hydration matches!)
- After `useEffect` runs (client-only), `mounted` becomes `true` and dynamic content appears
- No hydration mismatch because server and client HTML are identical initially
