"use client"

import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

export default function SendPage() {
  const [step, setStep] = useState<"form" | "review" | "success">("form")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [token, setToken] = useState("SOL")

  if (step === "success") {
    return (
      <div className="flex flex-col gap-6 px-4 pt-6">
        <h1 className="text-lg font-semibold text-foreground">Send</h1>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <ArrowUpRight className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Sent!</h2>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Your transfer has been submitted.
          </p>
          <div className="mt-6 w-full max-w-sm rounded-xl border bg-card p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">To</span>
              <span className="text-foreground font-mono">{recipient}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-foreground font-semibold">
                {amount} {token}
              </span>
            </div>
          </div>
          <button
            onClick={() => { setStep("form"); setRecipient(""); setAmount("") }}
            className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Send Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 px-4 pt-6">
      <h1 className="text-lg font-semibold text-foreground">Send</h1>
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <ArrowUpRight className="h-8 w-8 text-black" />
        </div>
        <h2 className="text-base font-semibold text-foreground">
          Send Crypto & Naira
        </h2>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Send SOL, USDC, or Naira to any wallet or phone number instantly.
        </p>

        <div className="mt-8 w-full max-w-sm space-y-4">
          <div className="rounded-xl border bg-card p-4">
            <label className="text-xs font-medium text-muted-foreground">
              Token
            </label>
            <select
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm text-foreground outline-none"
            >
              <option value="SOL">SOL</option>
              <option value="USDC">USDC</option>
              <option value="NGN">NGN</option>
            </select>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <label className="text-xs font-medium text-muted-foreground">
              Recipient
            </label>
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Wallet address or phone"
              className="mt-1 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="rounded-xl border bg-card p-4">
            <label className="text-xs font-medium text-muted-foreground">
              Amount
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              type="number"
              className="mt-1 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
            />
          </div>

          <button
            onClick={() => setStep("review")}
            disabled={!recipient || !amount}
            className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
