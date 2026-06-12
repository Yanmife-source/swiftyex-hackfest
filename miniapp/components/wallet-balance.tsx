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
        "bg-white",
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-black/70">
            Total Balance
          </span>
          <button
            onClick={() => setVisible(!visible)}
            className="rounded-full p-1 text-black/40 transition-colors hover:text-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
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
              <span className="font-mono text-3xl font-bold tracking-tight text-black">
                ₦0.00
              </span>
              <span className="text-sm font-medium text-black/60">NGN</span>
            </>
          ) : (
            <span className="font-mono text-3xl font-bold tracking-tight text-black">
              ••••••
            </span>
          )}
        </div>

        <div className="mt-1">
          {visible ? (
            <span className="font-mono text-xs text-black/50">$0.00 USD</span>
          ) : (
            <span className="font-mono text-xs text-black/50">••••••</span>
          )}
        </div>
      </div>
    </div>
  );
}
