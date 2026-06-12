"use client"

import { useState } from "react"
import { PiggyBank, Wifi, Droplets, Zap, Smartphone, Tv, CreditCard, ChevronLeft, Check } from "lucide-react"

type BillCategory = "airtime" | "data" | "electricity" | "water" | "tv" | "cards"
type Step = "select" | "form" | "review" | "processing" | "success"

interface BillOption {
  id: BillCategory
  label: string
  icon: typeof Smartphone
  placeholder: string
  labelField: string
}

const billOptions: BillOption[] = [
  { id: "airtime", label: "Airtime", icon: Smartphone, placeholder: "08012345678", labelField: "Phone Number" },
  { id: "data", label: "Data", icon: Wifi, placeholder: "08012345678", labelField: "Phone Number" },
  { id: "electricity", label: "Electricity", icon: Zap, placeholder: "12345678901", labelField: "Meter Number" },
  { id: "water", label: "Water", icon: Droplets, placeholder: "Account number", labelField: "Account Number" },
  { id: "tv", label: "TV", icon: Tv, placeholder: "1234567890", labelField: "Smart Card Number" },
  { id: "cards", label: "Cards", icon: CreditCard, placeholder: "Card number", labelField: "Card Number" },
]

export default function BillsPage() {
  const [step, setStep] = useState<Step>("select")
  const [category, setCategory] = useState<BillCategory | null>(null)
  const [identifier, setIdentifier] = useState("")
  const [amount, setAmount] = useState("")

  const selected = billOptions.find((b) => b.id === category)

  const handleSelect = (id: BillCategory) => {
    setCategory(id)
    setIdentifier("")
    setAmount("")
    setStep("form")
  }

  const handleBack = () => {
    if (step === "form") {
      setStep("select")
      setCategory(null)
    } else if (step === "review") {
      setStep("form")
    }
  }

  const handleSubmit = () => {
    setStep("processing")
    setTimeout(() => setStep("success"), 2000)
  }

  if (step === "success") {
    return (
      <div className="flex flex-col gap-6 px-4 pt-6">
        <h1 className="text-lg font-semibold text-foreground">Pay Bills</h1>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <Check className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Payment Successful</h2>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Your {selected?.label.toLowerCase()} payment has been processed.
          </p>
          <div className="mt-6 w-full max-w-sm space-y-2 rounded-xl border bg-card p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service</span>
              <span className="text-foreground font-medium">{selected?.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{selected?.labelField}</span>
              <span className="text-foreground font-mono">{identifier}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-foreground font-semibold">₦{Number(amount).toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={() => { setStep("select"); setCategory(null); setIdentifier(""); setAmount("") }}
            className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Pay Another Bill
          </button>
        </div>
      </div>
    )
  }

  if (step === "processing") {
    return (
      <div className="flex flex-col gap-6 px-4 pt-6">
        <h1 className="text-lg font-semibold text-foreground">Pay Bills</h1>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-card">
            <div className="h-8 w-8 animate-pulse rounded-full bg-white/30" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Processing</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Please wait...
          </p>
        </div>
      </div>
    )
  }

  if (step === "review" && selected) {
    return (
      <div className="flex flex-col gap-6 px-4 pt-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="rounded-full p-1 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Review</h1>
        </div>
        <div className="flex flex-col items-center py-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <selected.icon className="h-8 w-8 text-black" />
          </div>
          <div className="w-full max-w-sm space-y-3 rounded-xl border bg-card p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service</span>
              <span className="text-foreground font-medium">{selected.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{selected.labelField}</span>
              <span className="text-foreground font-mono">{identifier}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-foreground font-semibold">₦{Number(amount).toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 w-full max-w-sm rounded-xl bg-white py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    )
  }

  if (step === "form" && selected) {
    return (
      <div className="flex flex-col gap-6 px-4 pt-6">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="rounded-full p-1 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">{selected.label}</h1>
        </div>
        <div className="flex flex-col items-center py-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <selected.icon className="h-8 w-8 text-black" />
          </div>
          <div className="w-full max-w-sm space-y-4">
            <div className="rounded-xl border bg-card p-4">
              <label className="text-xs font-medium text-muted-foreground">
                {selected.labelField}
              </label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={selected.placeholder}
                className="mt-1 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="rounded-xl border bg-card p-4">
              <label className="text-xs font-medium text-muted-foreground">
                Amount (NGN)
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
              disabled={!identifier || !amount}
              className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 px-4 pt-6">
      <h1 className="text-lg font-semibold text-foreground">Pay Bills</h1>
      <div className="grid grid-cols-3 gap-4">
        {billOptions.map((bill) => {
          const Icon = bill.icon
          return (
            <button
              key={bill.id}
              onClick={() => handleSelect(bill.id)}
              className="group flex flex-col items-center gap-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg transition-transform duration-100 active:scale-95 group-hover:scale-105">
                <Icon className="h-6 w-6 text-black" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {bill.label}
              </span>
            </button>
          )
        })}
      </div>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Select a category to get started
        </p>
      </div>
    </div>
  )
}
