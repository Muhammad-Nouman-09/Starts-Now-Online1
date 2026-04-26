"use client";

import { useState, useEffect } from "react";
import { Calculator as CalcIcon, Plus, Minus, Info, TrendingUp, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { CryptoRate } from "@/types";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function CalculatorPage() {
  const [coins, setCoins] = useState<CryptoRate[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CryptoRate | null>(null);
  const [investment, setInvestment] = useState(1000);
  const [buyPrice, setBuyPrice] = useState(60000);
  const [sellPrice, setSellPrice] = useState(70000);
  const [investmentFee, setInvestmentFee] = useState(0.1);
  const [exitFee, setExitFee] = useState(0.1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch("/api/crypto-rates");
        const data = await res.json();
        const coinsList = data.coins || [];
        setCoins(coinsList);
        if (coinsList.length > 0) {
          const btc = coinsList.find((c: CryptoRate) => c.symbol === "BTC") || coinsList[0];
          setSelectedCoin(btc);
          setBuyPrice(btc.usdPrice);
          setSellPrice(btc.usdPrice * 1.1); // Default to +10%
        }
      } catch (e) {
        console.error("Failed to fetch coins", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const handleCoinChange = (symbol: string) => {
    const coin = coins.find(c => c.symbol === symbol);
    if (coin) {
      setSelectedCoin(coin);
      setBuyPrice(coin.usdPrice);
      setSellPrice(coin.usdPrice * 1.1);
    }
  };

  const totalCoins = (investment * (1 - investmentFee / 100)) / buyPrice;
  const exitValue = totalCoins * sellPrice * (1 - exitFee / 100);
  const profit = exitValue - investment;
  const roi = (profit / investment) * 100;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-8 md:mb-12">
        <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-2 mb-2">
          <CalcIcon className="w-3 h-3 text-emerald-500" />
          Yield & ROI Simulator
        </h1>
        <p className="text-2xl md:text-4xl font-semibold tracking-tight italic">Profit Calculator</p>
      </header>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
               <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">Select Asset</label>
               <select 
                value={selectedCoin?.symbol || ""}
                onChange={(e) => handleCoinChange(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-emerald-500 transition-colors uppercase cursor-pointer"
               >
                 {coins.map(c => (
                   <option key={c.symbol} value={c.symbol}>{c.name} ({c.symbol}) - ${c.usdPrice.toLocaleString()}</option>
                 ))}
               </select>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">Initial Investment (USD)</label>
              <div className="flex items-center gap-4">
                 <div className="relative flex-1">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 font-mono text-xs">$</div>
                   <input 
                    type="number" 
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 pr-4 py-3 font-mono text-lg focus:outline-none focus:border-emerald-500 transition-colors"
                   />
                 </div>
                 <div className="flex flex-col gap-1">
                    <button onClick={() => setInvestment(v => v + 100)} className="p-1 hover:bg-zinc-800 rounded border border-zinc-900"><Plus className="w-3 h-3" /></button>
                    <button onClick={() => setInvestment(v => Math.max(0, v - 100))} className="p-1 hover:bg-zinc-800 rounded border border-zinc-900"><Minus className="w-3 h-3" /></button>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">Entry Price ($)</label>
                <input 
                  type="number" 
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">Exit Price ($)</label>
                <input 
                  type="number" 
                  value={sellPrice}
                  onChange={(e) => setSellPrice(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="p-6 border border-zinc-900 bg-zinc-900/20 rounded-2xl space-y-6">
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Entry Fee (%)</span>
                 <input 
                  type="range" min="0" max="5" step="0.1" 
                  value={investmentFee}
                  onChange={(e) => setInvestmentFee(Number(e.target.value))}
                  className="accent-emerald-500 cursor-pointer"
                 />
                 <span className="text-xs font-mono text-emerald-400 w-8 text-right font-bold">{investmentFee}%</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Exit Fee (%)</span>
                 <input 
                  type="range" min="0" max="5" step="0.1" 
                  value={exitFee}
                  onChange={(e) => setExitFee(Number(e.target.value))}
                  className="accent-emerald-500 cursor-pointer"
                 />
                 <span className="text-xs font-mono text-emerald-400 w-8 text-right font-bold">{exitFee}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6 md:p-12 h-full flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
               <TrendingUp className="w-64 h-64" />
            </div>

            <div className="space-y-8 md:space-y-12 relative z-10">
              <div className="space-y-2">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-4">Net Profit Estimation</h2>
                <motion.div 
                   key={profit}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className={`text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter ${profit >= 0 ? 'text-emerald-400 font-glow line-clamp-1' : 'text-rose-500'}`}
                >
                  ${profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </motion.div>
                <div className="flex items-center gap-4 mt-4">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${profit >= 0 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                    ROI: {roi.toFixed(2)}%
                  </div>
                  <div className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.2em] hidden sm:block">Live Calculation Enabled</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 pt-8 md:pt-12 border-t border-zinc-800/50">
                <div>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-2">Portfolio Share ({selectedCoin?.symbol})</p>
                  <p className="text-xl sm:text-3xl font-mono tracking-tighter text-zinc-300">{totalCoins.toFixed(8)}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-2">Final Capitalized Value</p>
                  <p className="text-xl sm:text-3xl font-mono tracking-tighter text-zinc-300">${exitValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl flex items-start gap-4">
                 <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                 <p className="text-[10px] text-amber-500/80 font-mono uppercase tracking-tight leading-relaxed">
                   Disclaimer: This simulation provides a mathematical model for potential returns based on static inputs. Real-market execution may vary due to spread, exchange latency, and gas price fluctuating during block commitment.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
