"use client"

import Link from "next/link"
import { ArrowUpRight, Receipt, TrendingDown, PiggyBank } from "lucide-react"

const actions = [
  {
    href: "/send",
    label: "Send",
    icon: ArrowUpRight,
  },
  {
    href: "/receive",
    label: "Receive",
    icon: Receipt,
  },
  {
    href: "/sell",
    label: "Sell",
    icon: TrendingDown,
  },
  {
    href: "/bills",
    label: "Bills",
    icon: PiggyBank,
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg transition-transform duration-100 active:scale-95 group-hover:scale-105">
              <Icon className="h-5 w-5 text-black" />
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
