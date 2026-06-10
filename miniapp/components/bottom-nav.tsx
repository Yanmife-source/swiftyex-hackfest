"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Wallet, Send, TrendingDown, Receipt, PiggyBank } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Wallet", icon: Wallet },
  { href: "/send", label: "Send", icon: Send },
  { href: "/sell", label: "Sell", icon: TrendingDown },
  { href: "/receive", label: "Receive", icon: Receipt },
  { href: "/bills", label: "Bills", icon: PiggyBank },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl"
      style={{
        backgroundColor: "var(--nav)",
        borderColor: "var(--nav-border)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-100",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors duration-100",
                  isActive && "text-primary",
                )}
              />
              <span className="text-[10px] leading-none">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
