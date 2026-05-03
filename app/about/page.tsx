import MetaLayout from "@/components/MetaLayout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <MetaLayout title="About Starts Now" subtitle="Intelligence & Crypto Utility Hub">
      <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-white prose-p:leading-relaxed">
        <p className="text-xl md:text-2xl text-emerald-400 font-bold mb-8">
          Starts Now is a premier digital ecosystem delivering real-time crypto tools and expert blockchain analysis to navigate modern market velocities.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">The Mission</h2>
        <p className="mb-8">
          Founded in 2026, our objective is to provide high-fidelity financial intelligence through a minimalist, high-performance interface. We bridge the gap between complex blockchain data and actionable intelligence, ensuring you stay ahead in the volatile decentralized finance (DeFi) ecosystem.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">Advanced Crypto Tools</h2>
        <p className="mb-8">
          Our terminal utilizes distributed scrapers and hybrid relay nodes to synchronize market data across 50+ tier-1 assets. By combining professional crypto tools with advanced ROI simulation models, we provide a cohesive tactical environment for modern Web3 traders and investors.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Link
            href="/crypto-profit-calculator-with-fees"
            className="bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all"
          >
            <div className="font-bold text-zinc-200 mb-1">Profit Calculator</div>
            <div className="text-xs text-zinc-400 mb-3">Calculate ROI with fee adjustments</div>
            <div className="text-emerald-400 text-xs font-bold flex items-center gap-1">EXPLORE <ArrowRight className="w-3 h-3" /></div>
          </Link>
          <Link
            href="/live-crypto-market-prices-tracker"
            className="bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all"
          >
            <div className="font-bold text-zinc-200 mb-1">Market Explorer</div>
            <div className="text-xs text-zinc-400 mb-3">Real-time prices for 50+ assets</div>
            <div className="text-emerald-400 text-xs font-bold flex items-center gap-1">EXPLORE <ArrowRight className="w-3 h-3" /></div>
          </Link>
          <Link
            href="/crypto-to-usd-converter-instant"
            className="bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all"
          >
            <div className="font-bold text-zinc-200 mb-1">Crypto Converter</div>
            <div className="text-xs text-zinc-400 mb-3">Convert to USD, PKR, INR & more</div>
            <div className="text-emerald-400 text-xs font-bold flex items-center gap-1">EXPLORE <ArrowRight className="w-3 h-3" /></div>
          </Link>
        </div>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">Expert Blockchain Insights</h2>
        <p className="mb-8">
          Beyond data, we offer deep-dive crypto blogs covering everything from smart contracts to technical analysis. We support our infrastructure through curated intelligence subscriptions, allowing us to keep our core market feeds open and accessible to the global crypto community.
        </p>
        <div className="mt-6">
          <Link
            href="/blog"
            className="inline-block bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl px-6 py-3 transition-all"
          >
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
              Read Our Intelligence Terminal
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </MetaLayout>
  );
}