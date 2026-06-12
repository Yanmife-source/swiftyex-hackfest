"use client"

import { TrendingDown } from "lucide-react"
import { useState } from "react"

export default function SellPage() {
  const [step, setStep] = useState<"form" | "review" | "success">("form")
  const [sellAmount, setSellAmount] = useState("")
  const [sellToken, setSellToken] = useState("SOL")

  if (step === "success") {
    return (
      <div className="flex flex-col gap-6 px-4 pt-6">
        <h1 className="text-lg font-semibold text-foreground">Sell</h1>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <TrendingDown className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Sold!</h2>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Your crypto has been converted.
          </p>
          <div className="mt-6 w-full max-w-sm rounded-xl border bg-card p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sold</span>
              <span className="text-foreground font-semibold">
                {sellAmount} {sellToken}
              </span>
            </div>
          </div>
          <button
            onClick={() => { setStep("form"); setSellAmount("") }}
            className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Sell Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 px-4 pt-6">
      <h1 className="text-lg font-semibold text-foreground">Sell</h1>
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <TrendingDown className="h-8 w-8 text-black" />
        </div>
        <h2 className="text-base font-semibold text-foreground">
          Sell Crypto for Naira
        </h2>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Convert your crypto to Naira and withdraw to your bank account.
        </p>

        <div className="mt-8 w-full max-w-sm space-y-4">
          <div className="rounded-xl border bg-card p-4">
            <label className="text-xs font-medium text-muted-foreground">
              Token
            </label>
            <select
              value={sellToken}
              onChange={(e) => setSellToken(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm text-foreground outline-none"
            >
              <option value="SOL">SOL</option>
              <option value="USDC">USDC</option>
            </select>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <label className="text-xs font-medium text-muted-foreground">
              You Sell
            </label>
            <input
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              placeholder="0.00"
              type="number"
              className="mt-1 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="rounded-xl border bg-card p-4">
            <label className="text-xs font-medium text-muted-foreground">
              You Receive
            </label>
            <div className="mt-1 text-sm text-foreground">
              {sellAmount ? `₦${(Number(sellAmount) * 1500).toLocaleString()}` : "—"}
            </div>
          </div>

          <button
            onClick={() => setStep("review")}
            disabled={!sellAmount}
            className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
