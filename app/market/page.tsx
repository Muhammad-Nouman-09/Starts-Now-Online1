"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, Search, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CryptoRate } from "@/types";
import { motion } from "motion/react";
import AdPlacement from "@/components/AdPlacement";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function MarketRegistry() {
  const [coins, setCoins] = useState<CryptoRate[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/crypto-rates");
      const data = await res.json();
      setCoins(data.coins || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-8 lg:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-300 flex items-center gap-2 mb-2">
            <LayoutDashboard className="w-3 h-3 text-emerald-500" />
            Global Asset Registry
          </h1>
          <p className="text-2xl md:text-4xl font-semibold tracking-tight italic">Market Explorer</p>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
             <input 
              type="text" 
              placeholder="Asset filter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs md:text-sm focus:outline-none focus:border-emerald-500 transition-all font-mono"
             />
          </div>
          <button 
            onClick={fetchCoins}
            className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all"
          >
            <RefreshCw className={`w-4 h-4 text-zinc-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <AdPlacement type="horizontal" className="mb-8 lg:mb-12" />

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="bg-zinc-900/10 border border-zinc-900 rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <table className="w-full text-left border-collapse min-w-[500px] md:min-w-[600px]">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/40">
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300">Asset</th>
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300 text-right">Price</th>
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300 text-right">24H Change</th>
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300 text-right hidden sm:table-cell">Market Cap</th>
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300 text-right hidden lg:table-cell">24H Volume</th>
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/50">
              {filteredCoins.length > 0 ? (
                filteredCoins.map((coin) => (
                  <tr key={coin.symbol} className="group hover:bg-zinc-800/20 transition-colors">
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center font-bold text-zinc-400 border border-zinc-800 text-[10px]">
                           {coin.symbol[0]}
                        </div>
                        <div>
                          <div className="text-xs md:text-sm font-bold tracking-tight">{coin.name}</div>
                          <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right font-mono text-xs md:text-sm tracking-tighter">
                      ${coin.usdPrice.toLocaleString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <span className={`text-[9px] md:text-[10px] font-bold font-mono px-2 py-0.5 rounded ${coin.change24h >= 0 ? 'text-emerald-500 bg-emerald-500/5' : 'text-rose-500 bg-rose-500/5'}`}>
                        {coin.change24h > 0 ? '+' : ''}{coin.change24h}%
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right hidden sm:table-cell font-mono text-[10px] md:text-xs text-zinc-400">
                      ${(coin.marketCap || 0).toLocaleString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right hidden lg:table-cell font-mono text-[10px] md:text-xs text-zinc-400">
                      ${(coin.volume24h || 0).toLocaleString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 w-10">
                      <Link href={`/coin/${coin.symbol}`} className="text-zinc-800 group-hover:text-emerald-500 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-zinc-700 font-mono text-xs tracking-widest">
                    NO_ASSETS_FOUND_FOR_QUERY
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}

      {/* SEO Content Section */}
      <div className="mt-16 bg-zinc-900/10 border border-zinc-900 rounded-[30px] p-8 md:p-12">
        <article className="prose prose-invert prose-zinc max-w-none">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Global Crypto Market Explorer</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-zinc-200">What is the Market Explorer?</h3>
            <p className="text-zinc-400 leading-relaxed">
              The Global Crypto Market Explorer is a real-time tracking tool that displays current prices, 24-hour changes, market capitalization, and volume for top cryptocurrencies. It is widely used by crypto traders, investors, and enthusiasts to monitor market trends and discover opportunities.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-zinc-200">How It Works</h3>
            <ol className="list-decimal list-inside space-y-2 text-zinc-400">
              <li><strong className="text-zinc-300">Open Explorer:</strong> Navigate to the Market Explorer dashboard.</li>
              <li><strong className="text-zinc-300">View Data:</strong> Browse the list of top cryptocurrencies sorted by market capitalization.</li>
              <li><strong className="text-zinc-300">Filter Assets:</strong> Use the search bar to find specific coins by name or symbol.</li>
              <li><strong className="text-zinc-300">Analyze:</strong> Check the 24H change, price, and volume to gauge market momentum.</li>
            </ol>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-zinc-200">Examples & Use Cases</h3>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 mt-4">
              <p className="text-zinc-400 text-sm leading-relaxed">
                <strong className="text-emerald-500 block mb-2">Scenario: Tracking Asset Performance</strong>
                You want to check how Ethereum is performing today. Use the asset filter to search for <strong className="text-white">"ETH"</strong> and instantly see its current price, <strong className="text-emerald-400">24-hour percentage change</strong>, and total market volume without sifting through unrelated data.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-zinc-200">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-300 mb-1">What is a Crypto Market Explorer?</h4>
                <p className="text-sm text-zinc-300">A dashboard that aggregates real-time data, pricing, and volume for various cryptocurrencies.</p>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-300 mb-1">How is the 24H change calculated?</h4>
                <p className="text-sm text-zinc-300">It compares the current asset price to its exact price 24 hours ago, showing the percentage difference.</p>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-300 mb-1">Are the prices updated in real-time?</h4>
                <p className="text-sm text-zinc-300">Yes, the explorer fetches the latest available data to ensure you have the most up-to-date market overview.</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "HowTo",
                "name": "How to Use the Crypto Market Explorer",
                "description": "Step-by-step guide to tracking cryptocurrency prices and market trends.",
                "step": [
                  { "@type": "HowToStep", "text": "Navigate to the Market Explorer dashboard." },
                  { "@type": "HowToStep", "text": "Browse the list of top cryptocurrencies." },
                  { "@type": "HowToStep", "text": "Use the search bar to find specific coins." },
                  { "@type": "HowToStep", "text": "Check the 24H change, price, and volume." }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a Crypto Market Explorer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A dashboard that aggregates real-time data, pricing, and volume for various cryptocurrencies."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How is the 24H change calculated?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It compares the current asset price to its exact price 24 hours ago, showing the percentage difference."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are the prices updated in real-time?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, the explorer fetches the latest available data to ensure you have the most up-to-date market overview."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
  </div>
  );
}
