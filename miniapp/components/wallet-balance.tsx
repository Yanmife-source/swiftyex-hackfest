"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function WalletBalance() {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl p-6",
        "bg-white ",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, oklch(1 0 0 / 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, oklch(1 0 0 / 0.1) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-black/70">
            Total Balance
          </span>
          <button
            onClick={() => setVisible(!visible)}
            className="rounded-full p-1 text-white/60 transition-colors hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label={visible ? "Hide balance" : "Show balance"}
          >
            {visible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          {visible ? (
            <>
              <span className="font-mono text-3xl font-bold tracking-tight text-white">
                ₦0.00
              </span>
              <span className="text-sm font-medium text-white/60">NGN</span>
            </>
          ) : (
            <span className="font-mono text-3xl font-bold tracking-tight text-white">
              ••••••
            </span>
          )}
        </div>

        <div className="mt-1">
          {visible ? (
            <span className="font-mono text-xs text-white/50">$0.00 USD</span>
          ) : (
            <span className="font-mono text-xs text-white/50">••••••</span>
          )}
        </div>
      </div>
    </div>
  );
}
