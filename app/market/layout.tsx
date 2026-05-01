import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Crypto Market Explorer | Starts Now",
  description: "Track real-time cryptocurrency prices, 24-hour changes, market capitalization, and volume with our Global Crypto Market Explorer.",
  alternates: {
    canonical: "https://starts-now-online1.vercel.app/market",
  },
};

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
