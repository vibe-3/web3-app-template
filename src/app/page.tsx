import { ConnectWallet } from "@/components/web3/connect-wallet"
import { AccountDisplay } from "@/components/web3/account-display"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Web3 App</h1>
          <ConnectWallet />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome to your Web3 dApp
            </h2>
            <p className="text-muted-foreground">
              Connect your wallet to interact with Base Sepolia testnet. This template includes wagmi, viem, and shadcn/ui components.
            </p>
          </div>

          <AccountDisplay />

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">Next Steps</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use <code className="rounded bg-muted px-1 py-0.5">useReadContract()</code> to read from smart contracts</li>
              <li>• Use <code className="rounded bg-muted px-1 py-0.5">useWriteContract()</code> to write to smart contracts</li>
              <li>• Use <code className="rounded bg-muted px-1 py-0.5">useWatchContractEvent()</code> to listen to contract events</li>
              <li>• Configure additional chains in <code className="rounded bg-muted px-1 py-0.5">src/config/wagmi.ts</code></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
