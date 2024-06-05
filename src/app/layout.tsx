import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ExplorArte",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-3 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <a
                className="flex items-center gap-1 text-current"
                href="https://neidersilva.vercel.app"
                target="_blank"
                title="Neider Silva"
              >
                <span className="font-normal">Made by</span>
                <p className="text-primary font-semibold">Neider Silva</p>
              </a>
            </footer>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
