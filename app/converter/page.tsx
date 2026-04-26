"use client";

import { useState, useEffect } from "react";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { CryptoRate } from "@/types";
import { FIXED_EXCHANGE_RATES } from "@/constants";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function ConverterPage() {
  const [coins, setCoins] = useState<CryptoRate[]>([]);
  const [amount, setAmount] = useState(1);
  const [baseCoin, setBaseCoin] = useState<CryptoRate | null>(null);
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState(FIXED_EXCHANGE_RATES);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch("/api/crypto-rates");
        const data = await res.json();
        const coinsList = data.coins || [];
        setCoins(coinsList);
        if (data.exchangeRates) {
          setExchangeRates(data.exchangeRates);
        }
        if (coinsList.length > 0) {
          setBaseCoin(coinsList[0]);
        }
      } catch (e) {
        console.error("Failed to fetch coins", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const getTargetValue = () => {
    if (!baseCoin) return 0;
    const usdValue = amount * baseCoin.usdPrice;
    switch(targetCurrency) {
      case 'PKR': return usdValue * exchangeRates.usdToPkr;
      case 'INR': return usdValue * exchangeRates.usdToInr;
      default: return usdValue;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-8 md:mb-12">
        <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-2 mb-2">
          <ArrowLeftRight className="w-3 h-3 text-emerald-500" />
          Global Exchange Bridge
        </h1>
        <p className="text-2xl md:text-4xl font-semibold tracking-tight italic">Currency Converter</p>
      </header>

      {loading || !baseCoin ? (
        <LoadingSkeleton />
      ) : (
        <div className="bg-zinc-900/10 border border-zinc-900 rounded-[30px] md:rounded-[40px] p-6 sm:p-8 lg:p-16 max-w-4xl mx-auto shadow-3xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full space-y-4">
             <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 block pl-2 font-mono">Asset Volume</label>
             <div className="flex items-center gap-4 bg-zinc-900 rounded-2xl p-4 border border-zinc-800 focus-within:border-emerald-500/50 transition-all">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="bg-transparent text-xl md:text-2xl font-bold font-mono w-full focus:outline-none"
                />
                <select 
                  className="bg-zinc-800 text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 md:px-4 py-2 rounded-xl focus:outline-none cursor-pointer"
                  value={baseCoin.symbol}
                  onChange={(e) => setBaseCoin(coins.find(c => c.symbol === e.target.value)!)}
                >
                  {coins.map(c => (
                    <option key={c.symbol} value={c.symbol}>{c.symbol}</option>
                  ))}
                </select>
             </div>
          </div>

          <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/20 rotate-90 md:rotate-0">
             <RefreshCw className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
          </div>

          <div className="flex-1 w-full space-y-4">
             <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 block pl-2 font-mono">Target Fiat</label>
             <div className="flex items-center gap-4 bg-zinc-900 rounded-2xl p-4 border border-zinc-800 focus-within:border-indigo-500/50 transition-all">
                <div className="text-xl md:text-2xl font-bold font-mono w-full truncate">
                  {getTargetValue().toLocaleString(undefined, { maximumFractionDigits: targetCurrency === 'USD' ? 6 : 2 })}
                </div>
                <select 
                  className="bg-zinc-800 text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 md:px-4 py-2 rounded-xl focus:outline-none cursor-pointer"
                  value={targetCurrency}
                  onChange={(e) => setTargetCurrency(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="PKR">PKR</option>
                  <option value="INR">INR</option>
                </select>
             </div>
          </div>
        </div>

        <div className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-12 border-t border-zinc-900">
           <div className="space-y-2">
              <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest block font-mono">Global Rate Index</span>
              <p className="text-xs md:text-sm font-mono text-zinc-400 italic">1 {baseCoin.symbol} ≈ ${baseCoin.usdPrice.toLocaleString()}</p>
           </div>
           <div className="space-y-2">
              <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest block font-mono">FX Protocol</span>
              <p className="text-xs md:text-sm font-mono text-zinc-400 italic">USD/{targetCurrency} @ {targetCurrency === 'USD' ? '1.00' : targetCurrency === 'PKR' ? exchangeRates.usdToPkr : exchangeRates.usdToInr}</p>
           </div>
           <div className="space-y-2 text-right md:text-left">
              <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest block font-mono">Last Synchronized</span>
              <p className="text-xs md:text-sm font-mono text-emerald-500/70 font-bold uppercase tracking-tighter">Real-time Feed</p>
           </div>
        </div>
      </div>
    )}
  </div>
);
}
