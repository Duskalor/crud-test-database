import type {Metadata} from "next";

import Link from "next/link";

import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {ModeToggle} from "@/components/toggle";
import {Sidebar} from "@/components/sidebar";

export const metadata: Metadata = {
  title: "crud-test-database",
  description: "Generated by appncy",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning lang="es">
      <body>
        <main className="mx-auto flex min-h-screen flex-col bg-background p-5 font-sans">
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="dark"
          >
            <header className="flex justify-between p-5 text-xl font-bold leading-[4rem]">
              <Link href="/">App para gestionar invitados</Link>
              <ModeToggle />
            </header>
            <main className="min-w-screen flex w-full flex-1 flex-col gap-5 overflow-x-auto py-8 lg:flex-row">
              <Sidebar />
              {children}
            </main>
            <footer className="text-center leading-[4rem] opacity-70">
              © {new Date().getFullYear()} crud-test-database
            </footer>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
