"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, Coins, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { CryptoSnapshot } from "@/types";
import { CRYPTO_SCRAPE_URL, FIXED_EXCHANGE_RATES } from "@/constants";
import AdPlacement from "@/components/AdPlacement";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Dashboard() {
  const [data, setData] = useState<CryptoSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const sectorsRef = useRef<HTMLDivElement>(null);

  const scrollSectors = (direction: 'left' | 'right') => {
    if (sectorsRef.current) {
      const scrollAmount = 300;
      sectorsRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/crypto-rates");
      const result = await response.json();
      setData({
        coins: result.coins || [],
        exchangeRates: result.exchangeRates || FIXED_EXCHANGE_RATES,
        fetchedAt: result.fetchedAt || new Date().toISOString(),
        sourceUrl: CRYPTO_SCRAPE_URL,
        note: result.message || "Intelligence synchronized.",
        usedFallback: result.usedFallback ?? false
      });
    } catch (err) {
      setData({
        coins: [],
        exchangeRates: FIXED_EXCHANGE_RATES,
        fetchedAt: new Date().toISOString(),
        sourceUrl: CRYPTO_SCRAPE_URL,
        note: "Relay disruption detected.",
        usedFallback: false
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const btc = data?.coins?.find(c => c.symbol === "BTC");
  const gridCoins = data?.coins?.filter(c => ["ETH", "SOL", "XRP", "BNB"].includes(c.symbol)) || [];
  const otherCoins = data?.coins?.filter(c => !["BTC", "ETH", "SOL", "XRP", "BNB"].includes(c.symbol)) || [];

  if (!loading && (!data?.coins || data.coins.length === 0)) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-12">
        <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Relay Interruption</div>
        <p className="text-zinc-400 italic text-center max-w-md">The intelligence feed is currently synchronized but returned zero metrics. Revalidation required.</p>
        <button 
          onClick={fetchData}
          className="mt-8 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-6 py-3 rounded-full flex items-center gap-3 transition-all"
        >
          <RefreshCw className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Force Relay Reset</span>
        </button>
      </div>
    );
  }

  const btcDisplay = btc || { name: "Analyzing...", symbol: "???", usdPrice: 0, change24h: 0 };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-8 flex flex-col md:flex-row justify-between items-start gap-6 w-full">
        <div className="space-y-1">
          <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-2">
            <Coins className="w-3 h-3 text-emerald-500" />
            Market Scraper Intelligence V1.2.9
          </h1>
          <p className="text-2xl font-semibold tracking-tight">Main Intelligence Interface</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-emerald-500 ${!loading ? 'animate-pulse' : 'opacity-50'}`}></div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">
              {data?.usedFallback ? 'Hybrid Fallback Active' : 'Relay Active'}
            </span>
          </div>
          <button 
            onClick={fetchData}
            disabled={loading}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 shadow-xl px-4 py-2 rounded-full flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 text-zinc-400 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 text-nowrap">Revalidate Seed</span>
          </button>
        </div>
      </header>

      {loading ? (
        <div className="max-w-7xl mx-auto px-6 w-full py-12">
          <LoadingSkeleton />
        </div>
      ) : (
        <>
          {/* Hero Ad Placement */}
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <AdPlacement type="horizontal" className="border-emerald-500/10" />
          </div>

      {/* Main Hero */}
      <section className="border-y border-zinc-900 min-h-[30vh] md:min-h-[40vh] flex items-center py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8"
              >
                <div className="space-y-0">
                  <span className="text-zinc-500 font-mono text-sm md:text-lg uppercase tracking-tighter block mb-2">01 / {btcDisplay.name} ({btcDisplay.symbol})</span>
                  <Link href={`/coin/${btcDisplay.symbol}`} className="text-[50px] sm:text-[90px] md:text-[120px] lg:text-[160px] font-black leading-none tracking-tighter italic flex items-baseline hover:text-emerald-400 transition-colors break-all md:break-normal">
                    ${btcDisplay.usdPrice.toLocaleString().split('.')[0]}
                    <span className="text-zinc-800">.{btcDisplay.usdPrice.toLocaleString().split('.')[1] || '00'}</span>
                  </Link>
                </div>
                <div className="lg:text-right pb-4 flex lg:flex-col items-center lg:items-end gap-x-6">
                  <div className={`text-4xl sm:text-6xl font-black italic tracking-tighter ${btcDisplay.change24h >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                    {btcDisplay.change24h > 0 ? '+' : ''}{btcDisplay.change24h}%
                  </div>
                  <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">24H Global Velocity</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="flex justify-center -mt-6 relative z-20 pointer-events-none">
         <motion.div
           animate={{ y: [0, 6, 0] }}
           transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
           className="bg-zinc-950 border border-zinc-800 p-2.5 rounded-full shadow-2xl"
         >
            <ChevronRight className="w-3 h-3 rotate-90 text-emerald-500/50" />
         </motion.div>
      </div>

      {/* Minor Grid Items (Sectors) */}
      <section className="max-w-7xl mx-auto px-6 py-6 md:py-12 w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em]">Strategic Sectors</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => scrollSectors('left')}
              className="w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center text-zinc-600 hover:text-emerald-500 hover:border-emerald-500/30 transition-all bg-zinc-950 shadow-xl"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollSectors('right')}
              className="w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center text-zinc-600 hover:text-emerald-500 hover:border-emerald-500/30 transition-all bg-zinc-950 shadow-xl"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div 
            ref={sectorsRef}
            className="flex-1 flex overflow-x-auto gap-4 no-scrollbar scroll-smooth snap-x snap-mandatory pb-4"
          >
            {gridCoins.map((coin) => (
              <Link 
                key={coin.symbol} 
                href={`/coin/${coin.symbol}`} 
                className="bg-zinc-950 p-6 md:p-8 group hover:bg-zinc-900/50 transition-colors border border-zinc-900 rounded-2xl min-w-[280px] sm:min-w-[320px] shrink-0 snap-start"
              >
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{coin.name} / {coin.symbol}</div>
                <div className="text-2xl md:text-3xl font-bold italic tracking-tighter group-hover:text-emerald-400 transition-colors">
                  ${coin.usdPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className={`text-[10px] font-mono mt-2 font-bold ${coin.change24h >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {coin.change24h >= 0 ? '▲' : '▼'} {Math.abs(coin.change24h)}%
                </div>
              </Link>
            ))}
          </div>
          <AdPlacement type="vertical" className="hidden lg:flex" />
          <div className="lg:hidden w-full">
             <AdPlacement type="horizontal" className="w-full" label="Mid-Feed Update" />
          </div>
        </div>
      </section>

      {/* Asset List */}
      <section className="max-w-7xl mx-auto px-6 pb-24 w-full">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Extended Market Feed</h3>
          <Link href="/market" className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 flex items-center gap-2 group transition-colors">
            View All 50+ Assets 
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/10">
          <div className="grid grid-cols-12 p-4 bg-zinc-900/40 border-b border-zinc-800 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
            <div className="col-span-8">Intelligence Asset Identification</div>
            <div className="col-span-4 text-right">Market Valuation</div>
          </div>
          <div className="divide-y divide-zinc-900">
            {otherCoins.slice(0, 10).map((coin) => (
              <Link key={coin.symbol} href={`/coin/${coin.symbol}`} className="flex justify-between p-4 px-6 items-center hover:bg-zinc-800/30 transition-colors group">
                <div className="flex items-baseline gap-4">
                  <span className="font-bold text-sm tracking-tight">{coin.name}</span>
                  <span className="text-[9px] font-mono text-zinc-700 tracking-[0.2em] group-hover:text-emerald-500/50 transition-colors uppercase">{coin.symbol}</span>
                </div>
                <div className="flex items-center gap-8 font-mono">
                   <div className={`text-[10px] font-bold ${coin.change24h >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                     {coin.change24h > 0 ? '+' : ''}{coin.change24h}%
                   </div>
                   <div className="text-sm font-medium tracking-tighter">
                     ${coin.usdPrice.toLocaleString()}
                   </div>
                   <ArrowRight className="w-4 h-4 text-zinc-800 group-hover:text-white transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )}
</div>
  );
}
