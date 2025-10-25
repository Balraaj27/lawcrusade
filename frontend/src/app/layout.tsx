import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Law Crusade - Premier Legal Services",
  description: "Law Crusade provides comprehensive legal services including Criminal Law, Family Law, Civil Litigation, and Consumer Protection. Expert legal advice with integrity and excellence.",
  keywords: ["Law Crusade", "legal services", "criminal law", "family law", "civil litigation", "consumer protection", "law firm", "legal advice"],
  authors: [{ name: "Law Crusade" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Law Crusade - Premier Legal Services",
    description: "Expert legal services with integrity and excellence",
    url: "https://lawcrusade.com",
    siteName: "Law Crusade",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Crusade - Premier Legal Services",
    description: "Expert legal services with integrity and excellence",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
