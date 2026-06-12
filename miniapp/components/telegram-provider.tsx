"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void
        expand: () => void
        close: () => void
        initData: string
        initDataUnsafe: Record<string, unknown>
        colorScheme: "light" | "dark"
        themeParams: Record<string, string>
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          show: () => void
          hide: () => void
          enable: () => void
          disable: () => void
          onClick: (cb: () => void) => void
        }
        HapticFeedback: {
          impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void
        }
      }
    }
  }
}

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()
      tg.expand()

      // Set background color to match our black theme
      tg.MainButton.color = "#ffffff"
      tg.MainButton.textColor = "#000000"
    }
  }, [])

  return <>{children}</>
}
