import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TenantProvider } from "@/components/providers/tenant-provider";
import { DemoModeProvider } from "@/components/providers/demo-mode-provider";
import { AppShell } from "@/components/layout/app-shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CollegeLMS Cloud | Multi-College SaaS Learning Management System",
  description: "Enterprise SaaS Learning Management System for independent colleges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DemoModeProvider>
          <TenantProvider>
            <AppShell>{children}</AppShell>
          </TenantProvider>
        </DemoModeProvider>
      </body>
    </html>
  );
}
