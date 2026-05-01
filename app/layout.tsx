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
  title: "Free Tools for Students, Freelancers & Businesses | Starts Now",
  description: "Discover free tools for students, freelancers, and businesses. Boost productivity with AI-powered writing, coding, and financial tools. No signup required, start instantly.",
  keywords: [
    "free crypto calculator",
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
    title: "Free Tools for Students, Freelancers & Businesses",
    description: "Discover free tools for students, freelancers, and businesses. Boost productivity with AI-powered writing, coding, and financial tools. No signup required, start instantly.",
    url: "https://starts-now-online1.vercel.app/",
    siteName: "Starts Now",
    images: [
      {
        url: "/og-image.png", // Add an Open Graph image to your public folder
        width: 1200,
        height: 630,
        alt: "Starts Now - Free Tools for Students, Freelancers & Businesses",
      },
    ],
    locale: "en_US",
    type: "website",
  },
   twitter: {
     card: "summary_large_image",
     title: "Free Tools for Students, Freelancers & Businesses",
     description: "Discover free tools for students, freelancers, and businesses. Boost productivity with AI-powered writing, coding, and financial tools. No signup required, start instantly.",
     images: ["/og-image.png"],
     creator: "@YourTwitterHandle", // Optional: Add your Twitter handle if you have one
     creatorId: "YourTwitterID", // Optional
   },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body 
        className="bg-black text-white selection:bg-emerald-500/30 antialiased font-sans"
        suppressHydrationWarning
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
