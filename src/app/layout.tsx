import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "Vibin Joseph | Premium Personal Trainer & Elite Gym Coach Qatar",
  description: "Transform your physique with Vibin Joseph, Qatar's premier certified personal gym trainer. Bespoke elite 1-on-1 coaching, fat loss, and high-performance biomechanics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} font-sans bg-obsidian text-foreground antialiased overflow-x-hidden`} >
        {children}
      </body>
    </html>
  );
}
