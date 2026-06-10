import { PiggyBank } from "lucide-react"
import { Wifi, Droplets, Zap, Smartphone, Tv, CreditCard } from "lucide-react"

const billCategories = [
  { label: "Airtime", icon: Smartphone, gradient: "from-violet-500 to-purple-600" },
  { label: "Data", icon: Wifi, gradient: "from-blue-500 to-indigo-600" },
  { label: "Electricity", icon: Zap, gradient: "from-amber-500 to-orange-600" },
  { label: "Water", icon: Droplets, gradient: "from-cyan-500 to-teal-600" },
  { label: "TV", icon: Tv, gradient: "from-rose-500 to-pink-600" },
  { label: "Cards", icon: CreditCard, gradient: "from-emerald-500 to-green-600" },
]

export default function BillsPage() {
  return (
    <div className="flex flex-col gap-6 px-4 pt-6">
      <h1 className="text-lg font-semibold text-foreground">Pay Bills</h1>
      <div className="grid grid-cols-3 gap-4">
        {billCategories.map((bill) => {
          const Icon = bill.icon
          return (
            <button
              key={bill.label}
              className="group flex flex-col items-center gap-2"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${bill.gradient} shadow-lg transition-transform duration-100 active:scale-95 group-hover:scale-105`}
              >
                <Icon className="h-6 w-6 text-white" />
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
