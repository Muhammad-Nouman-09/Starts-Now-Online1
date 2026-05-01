import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Crypto Profit Calculator | Starts Now",
  description: "Calculate your potential returns on cryptocurrency investments with our free Crypto Profit Calculator. Project P&L, ROI, and total exit value.",
  alternates: {
    canonical: "https://starts-now-online1.vercel.app/calculator",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
