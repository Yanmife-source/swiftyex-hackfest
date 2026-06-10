"use client"

import Link from "next/link"
import { Send, TrendingDown, Receipt, PiggyBank, ArrowUpRight } from "lucide-react"

const actions = [
  {
    href: "/send",
    label: "Send",
    icon: ArrowUpRight,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    href: "/receive",
    label: "Receive",
    icon: Receipt,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    href: "/sell",
    label: "Sell",
    icon: TrendingDown,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    href: "/bills",
    label: "Bills",
    icon: PiggyBank,
    gradient: "from-blue-500 to-indigo-600",
  },
]

export function ActionButtons() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => {
        const Icon = action.icon

        return (
          <Link
            key={action.href}
            href={action.href}
            className="group flex flex-col items-center gap-2"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg transition-transform duration-100 active:scale-95 group-hover:scale-105`}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {action.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
