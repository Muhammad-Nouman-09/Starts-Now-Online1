import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/AppLayout";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Starts Now",
  description: "Master the markets with Starts Now. Access essential crypto tools, deep-dive blockchain blogs, and real-time market data to stay ahead of the curve. Your financial future starts now.",
  keywords: [
    "crypto calculator",
    "crypto converter",
    "market data",
    "blockchain blog",
    "bitcoin",
    "ethereum",
    "solana",
    "crypto news",
    "market analysis",
    "financial tools",
    "Starts Now"
  ],
  authors: [{ name: "Starts Now Team" }],
  creator: "Starts Now",
  publisher: "Starts Now",
  openGraph: {
    title: "Starts Now - Crypto Tools & Market Insights",
    description: "Master the markets with Starts Now. Access essential crypto tools, deep-dive blockchain blogs, and real-time market data.",
    url: "https://starts-now-online1.vercel.app/",
    siteName: "Starts Now",
    images: [
      {
        url: "/og-image.png", // Add an Open Graph image to your public folder
        width: 1200,
        height: 630,
        alt: "Starts Now - Master the Markets",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Starts Now - Crypto Tools & Market Insights",
  //   description: "Master the markets with Starts Now. Access essential crypto tools, deep-dive blockchain blogs, and real-time market data.",
  //   images: ["/og-image.png"],
  //   creator: "@YourTwitterHandle", // Optional: Add your Twitter handle if you have one
  //   creatorId: "YourTwitterID", // Optional
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-black text-white selection:bg-emerald-500/30 antialiased font-sans">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
