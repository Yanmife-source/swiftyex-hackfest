import { TrendingDown } from "lucide-react"

export default function SellPage() {
  return (
    <div className="flex flex-col gap-6 px-4 pt-6">
      <h1 className="text-lg font-semibold text-foreground">Sell</h1>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
          <TrendingDown className="h-8 w-8 text-amber-400" />
        </div>
        <h2 className="text-base font-semibold text-foreground">
          Sell Crypto for Naira
        </h2>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Convert your crypto to Naira and withdraw to your bank account.
        </p>
        <div className="mt-8 w-full max-w-sm space-y-3">
          <div className="rounded-xl border bg-card p-4">
            <label className="text-xs font-medium text-muted-foreground">
              You Sell
            </label>
            <div className="mt-1 text-sm text-foreground">Coming soon</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <label className="text-xs font-medium text-muted-foreground">
              You Receive
            </label>
            <div className="mt-1 text-sm text-foreground">Coming soon</div>
          </div>
        </div>
      </div>
    </div>
  )
}
