'use client'

import { useAccount, useBalance, useChainId } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function AccountDisplay() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { data: balance } = useBalance({
    address: address,
  })

  if (!isConnected || !address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
          <CardDescription>Connect your wallet to see account details</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const getChainName = (id: number) => {
    if (id === baseSepolia.id) return baseSepolia.name
    return `Chain ${id}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription>Your connected wallet information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Address</p>
          <p className="text-sm font-mono break-all">{address}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Balance</p>
          <p className="text-sm">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Network</p>
          <p className="text-sm">
            {getChainName(chainId)} (Chain ID: {chainId})
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
