import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Crypto Currency Converter | Starts Now",
  description: "Convert cryptocurrency values to USD, PKR, and INR with the free Starts Now crypto currency converter.",
  alternates: {
    canonical: "https://starts-now-online1.vercel.app/converter",
  },
};

export default function ConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
