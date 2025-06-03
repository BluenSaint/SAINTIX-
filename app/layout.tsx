import type React from "react"
import type { Metadata } from "next"
import { SafeAuthProvider } from "@/components/auth/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/ErrorBoundary"
import { DebugPanel } from "@/lib/error-logger"
import "./globals.css"

export const metadata: Metadata = {
  title: "Saintrix - Credit Repair Management System",
  description: "Professional credit repair services with AI-powered tools",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <SafeAuthProvider>
            {children}
            <Toaster />
            <DebugPanel />
          </SafeAuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
