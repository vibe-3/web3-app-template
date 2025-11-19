# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev          # Start dev server (webpack mode with polling for Docker/hot-reload)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
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
- `src/components/web3/` - Web3-specific components (ConnectWallet, AccountDisplay)
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
