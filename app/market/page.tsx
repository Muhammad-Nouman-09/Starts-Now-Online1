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
          <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-2 mb-2">
            <LayoutDashboard className="w-3 h-3 text-emerald-500" />
            Global Asset Registry
          </h1>
          <p className="text-2xl md:text-4xl font-semibold tracking-tight italic">Market Explorer</p>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
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
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">Asset</th>
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 text-right">Price</th>
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 text-right">24H Change</th>
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 text-right hidden sm:table-cell">Market Cap</th>
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 text-right hidden lg:table-cell">24H Volume</th>
                <th className="px-4 md:px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500"></th>
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
  </div>
  );
}
