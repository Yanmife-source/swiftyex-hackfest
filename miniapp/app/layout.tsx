import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppLayout } from "@/components/layout";
import { TelegramProvider } from "@/components/telegram-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwiftyEx",
  description: "Buy airtime, data, pay bills & swap crypto with Yarn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">
        <TelegramProvider>
          <AppLayout>{children}</AppLayout>
        </TelegramProvider>
      </body>
    </html>
  );
}
