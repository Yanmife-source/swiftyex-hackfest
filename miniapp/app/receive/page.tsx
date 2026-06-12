import { Receipt } from "lucide-react"

export default function ReceivePage() {
  return (
    <div className="flex flex-col gap-6 px-4 pt-6">
      <h1 className="text-lg font-semibold text-foreground">Receive</h1>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <Receipt className="h-8 w-8 text-black" />
        </div>
        <h2 className="text-base font-semibold text-foreground">
          Receive Assets
        </h2>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Share your wallet address or scan a QR code to receive funds.
        </p>
        <div className="mt-8 flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card">
          <span className="text-sm text-muted-foreground">QR Code</span>
        </div>
        <div className="mt-4 w-full max-w-sm">
          <div className="rounded-xl bg-card p-4">
            <div className="text-xs font-medium text-muted-foreground">
              Your address
            </div>
            <div className="mt-1 font-mono text-sm text-foreground">
              Coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
