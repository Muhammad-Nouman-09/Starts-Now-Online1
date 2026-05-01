import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Crypto Currency Converter | Starts Now",
  description: "Instantly translate cryptocurrency values into fiat currencies like USD, PKR, and INR with our Free Crypto Currency Converter.",
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
