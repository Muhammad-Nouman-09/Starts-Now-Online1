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
        <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-300 flex items-center gap-2 mb-2">
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
             <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 block pl-2 font-mono">Asset Volume</label>
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
             <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 block pl-2 font-mono">Target Fiat</label>
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

      {/* SEO Content Section */}
      <div className="mt-16 bg-zinc-900/10 border border-zinc-900 rounded-[30px] p-8 md:p-12">
        <article className="prose prose-invert prose-zinc max-w-none">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Free Crypto Currency Converter</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-zinc-200">What is the Crypto Currency Converter?</h3>
            <p className="text-zinc-400 leading-relaxed">
              The Free Crypto Currency Converter allows you to instantly translate cryptocurrency values into fiat currencies like USD, PKR, and INR. Whether you're a freelancer receiving payments in crypto or a business managing digital assets, this tool provides real-time conversion rates to help you make informed financial decisions.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-zinc-200">How It Works</h3>
            <ol className="list-decimal list-inside space-y-2 text-zinc-400">
              <li><strong className="text-zinc-300">Enter Volume:</strong> Input the amount of cryptocurrency you want to convert.</li>
              <li><strong className="text-zinc-300">Select Base Asset:</strong> Choose your cryptocurrency (e.g., BTC, ETH).</li>
              <li><strong className="text-zinc-300">Choose Target Fiat:</strong> Select your desired output currency (USD, PKR, INR).</li>
              <li><strong className="text-zinc-300">View Results:</strong> Instantly see the converted fiat value based on live exchange rates.</li>
            </ol>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-zinc-200">Examples & Use Cases</h3>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 mt-4">
              <p className="text-zinc-400 text-sm leading-relaxed">
                <strong className="text-emerald-500 block mb-2">Scenario: Converting Freelance Payments</strong>
                If you receive <strong className="text-white">0.5 BTC</strong> for a freelance project and the current price is <strong className="text-white">$60,000</strong>, the converter instantly shows <strong className="text-emerald-400">$30,000 USD</strong>, or the equivalent in your local fiat currency using real-time FX protocols.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-zinc-200">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-300 mb-1">What is a Crypto Currency Converter?</h4>
                <p className="text-sm text-zinc-300">It is a tool that calculates the equivalent value of a cryptocurrency in traditional fiat money.</p>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-300 mb-1">How often are the exchange rates updated?</h4>
                <p className="text-sm text-zinc-300">Our global exchange bridge synchronizes with real-time feeds to provide accurate and up-to-date pricing.</p>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-300 mb-1">Can I convert to local currencies like PKR or INR?</h4>
                <p className="text-sm text-zinc-300">Yes, the tool supports direct conversion from crypto to major fiat currencies including USD, PKR, and INR.</p>
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
                "name": "How to Convert Crypto to Fiat",
                "description": "Step-by-step guide to converting cryptocurrency values to fiat currencies.",
                "step": [
                  { "@type": "HowToStep", "text": "Input the amount of cryptocurrency." },
                  { "@type": "HowToStep", "text": "Choose your base cryptocurrency." },
                  { "@type": "HowToStep", "text": "Select your desired output fiat currency." },
                  { "@type": "HowToStep", "text": "Instantly view the converted fiat value." }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a Crypto Currency Converter?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It is a tool that calculates the equivalent value of a cryptocurrency in traditional fiat money."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How often are the exchange rates updated?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our global exchange bridge synchronizes with real-time feeds to provide accurate and up-to-date pricing."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I convert to local currencies like PKR or INR?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, the tool supports direct conversion from crypto to major fiat currencies including USD, PKR, and INR."
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
