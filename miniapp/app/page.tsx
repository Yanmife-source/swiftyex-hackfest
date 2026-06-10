import { WalletBalance } from "@/components/wallet-balance"
import { ActionButtons } from "@/components/action-buttons"
import { TokenList } from "@/components/token-list"

export default function WalletPage() {
  return (
    <div className="flex flex-col gap-6 px-4 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">SwiftyEx</h1>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-bold text-white">
            S
          </div>
        </div>
      </div>

      <WalletBalance />
      <ActionButtons />
      <TokenList />
    </div>
  )
}
