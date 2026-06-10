import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface Token {
  symbol: string
  name: string
  balance: string
  usdValue: string
  icon: string
  change24h?: number
}

const tokens: Token[] = [
  {
    symbol: "SOL",
    name: "Solana",
    balance: "0.00",
    usdValue: "$0.00",
    icon: "S",
    change24h: 0,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "0.00",
    usdValue: "$0.00",
    icon: "U",
    change24h: 0,
  },
  {
    symbol: "USDT",
    name: "Tether",
    balance: "0.00",
    usdValue: "$0.00",
    icon: "T",
    change24h: 0,
  },
  {
    symbol: "NGN",
    name: "Nigerian Naira",
    balance: "0.00",
    usdValue: "$0.00",
    icon: "₦",
    change24h: 0,
  },
]

interface Transaction {
  type: "sent" | "received" | "swapped"
  title: string
  amount: string
  usdValue: string
  timestamp: string
  status: "completed" | "pending" | "failed"
}

const transactions: Transaction[] = [
  {
    type: "received",
    title: "From: 7xKX...p2aB",
    amount: "+0.5 SOL",
    usdValue: "$75.00",
    timestamp: "2 min ago",
    status: "completed",
  },
  {
    type: "sent",
    title: "To: 3yUq...m9cD",
    amount: "-25 USDC",
    usdValue: "$25.00",
    timestamp: "1 hr ago",
    status: "completed",
  },
  {
    type: "swapped",
    title: "SOL → USDC",
    amount: "+100 USDC",
    usdValue: "$100.00",
    timestamp: "3 hrs ago",
    status: "completed",
  },
]

const statusColors = {
  completed: "text-emerald-400",
  pending: "text-amber-400",
  failed: "text-red-400",
}

const typeIcons = {
  sent: ArrowUpRight,
  received: ArrowDownLeft,
  swapped: ArrowDownLeft,
}

export function TokenList() {
  return (
    <div className="mt-2 space-y-1">
      {tokens.map((token) => (
        <button
          key={token.symbol}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 font-mono text-sm font-bold text-white">
            {token.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {token.symbol}
              </span>
              {token.change24h !== 0 && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    token.change24h && token.change24h > 0
                      ? "text-emerald-400"
                      : "text-red-400",
                  )}
                >
                  {token.change24h && token.change24h > 0 ? "+" : ""}
                  {token.change24h}%
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{token.name}</span>
          </div>
          <div className="text-right">
            <div className="font-mono text-sm font-semibold tabular-nums text-foreground">
              {token.balance}
            </div>
            <div className="font-mono text-xs tabular-nums text-muted-foreground">
              {token.usdValue}
            </div>
          </div>
        </button>
      ))}

      <div className="pt-4">
        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Recent Activity
        </h3>
        {transactions.map((tx, i) => {
          const Icon = typeIcons[tx.type]
          return (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  tx.type === "received"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : tx.type === "sent"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-blue-500/10 text-blue-400",
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {tx.title}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      statusColors[tx.status],
                    )}
                  >
                    {tx.status}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {tx.timestamp}
                </span>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm tabular-nums text-foreground">
                  {tx.amount}
                </div>
                <div className="font-mono text-xs tabular-nums text-muted-foreground">
                  {tx.usdValue}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center py-4">
        <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          <ExternalLink className="h-3 w-3" />
          View all on explorer
        </button>
      </div>
    </div>
  )
}
