"use client"

import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ClientSidebarNew } from "@/components/navigation/client-sidebar-new"
import { Toaster } from "@/components/ui/toaster"

export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <ClientSidebarNew />
      <SidebarInset className="bg-background">
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
