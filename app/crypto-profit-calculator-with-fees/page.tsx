"use client";

import { useState, useEffect } from "react";
import { Calculator, TrendingUp, TrendingDown, RefreshCw, Info, DollarSign, Percent, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { CryptoRate } from "@/types";
import { allTools } from "@/components/HomeData";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function ProfitCalculatorPage() {
  const [coins, setCoins] = useState<CryptoRate[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Calculator State
  const [selectedCoin, setSelectedCoin] = useState<CryptoRate | null>(null);
  const [investment, setInvestment] = useState<number>(1000);
  const [buyPrice, setBuyPrice] = useState<number>(0);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [investmentFee, setInvestmentFee] = useState<number>(0.1);
  const [exitFee, setExitFee] = useState<number>(0.1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch("/api/crypto-rates");
        const data = await res.json();
        const coinsList = data.coins || [];
        setCoins(coinsList);
        if (coinsList.length > 0) {
          const btc = coinsList.find((c: any) => c.symbol === 'BTC') || coinsList[0];
          setSelectedCoin(btc);
          setBuyPrice(btc.usdPrice);
          setSellPrice(btc.usdPrice * 1.1); // Default to 10% profit
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

  // Calculations
  const coinAmount = buyPrice > 0 ? (investment * (1 - investmentFee / 100)) / buyPrice : 0;
  const totalExitValue = coinAmount * sellPrice;
  const exitFeeAmount = totalExitValue * (exitFee / 100);
  const finalValue = totalExitValue - exitFeeAmount;
  const profit = finalValue - investment;
  const roi = investment > 0 ? (profit / investment) * 100 : 0;
  const isProfit = profit >= 0;

  if (loading || !selectedCoin) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-8 md:mb-12">
        <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-300 flex items-center gap-2 mb-2">
          <Calculator className="w-3 h-3 text-emerald-500" />
          ROI Simulator
        </h1>
        <p className="text-2xl md:text-4xl font-semibold tracking-tight italic">Crypto Profit Calculator</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Input Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/10 border border-zinc-900 rounded-[30px] p-6 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Asset Selection */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 block pl-2 font-mono">Target Asset</label>
                <div className="relative group">
                  <select 
                    value={selectedCoin.symbol}
                    onChange={(e) => handleCoinChange(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-lg font-bold focus:border-emerald-500/50 outline-none appearance-none cursor-pointer transition-all"
                  >
                    {coins.map(c => (
                      <option key={c.symbol} value={c.symbol}>{c.name} ({c.symbol})</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 group-hover:text-emerald-500 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex justify-between px-2">
                   <span className="text-[10px] text-zinc-300 font-mono">Market Price:</span>
                   <span className="text-[10px] text-emerald-500 font-mono font-bold">${selectedCoin.usdPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Investment Amount */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 block pl-2 font-mono">Initial Capital (USD)</label>
                <div className="relative">
                  <input 
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-lg font-bold focus:border-emerald-500/50 outline-none transition-all pl-10"
                  />
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Buy Price */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 block pl-2 font-mono">Entry Price</label>
                <div className="relative">
                  <input 
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-lg font-bold focus:border-emerald-500/50 outline-none transition-all pl-10"
                  />
                  <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/50" />
                </div>
                <button 
                  onClick={() => setBuyPrice(selectedCoin.usdPrice)}
                  className="text-[9px] uppercase tracking-tighter text-zinc-700 hover:text-emerald-500 transition-colors font-bold ml-2"
                  aria-label="Set to Current Market Price"
                >
                  Set to Current Market Price
                </button>
              </div>

              {/* Sell Price */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 block pl-2 font-mono">Exit Price (Target)</label>
                <div className="relative">
                  <input 
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-lg font-bold focus:border-emerald-500/50 outline-none transition-all pl-10"
                  />
                  <TrendingDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500/50" />
                </div>
                <div className="flex gap-2 ml-2">
                   {[5, 10, 20, 50, 100].map(p => (
                     <button 
                       key={p}
                       onClick={() => setSellPrice(buyPrice * (1 + p/100))}
                       className="text-[9px] uppercase tracking-tighter text-zinc-700 hover:text-white transition-colors font-bold"
                       aria-label={`Set exit price to ${p}% above entry price`}
                     >
                       +{p}%
                     </button>
                   ))}
                </div>
              </div>
            </div>

            {/* Fees Panel */}
            <div className="pt-8 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 block pl-2 font-mono">Inbound Fee (%)</label>
                <div className="relative">
                  <input 
                    type="number"
                    value={investmentFee}
                    onChange={(e) => setInvestmentFee(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-lg font-bold focus:border-emerald-500/50 outline-none transition-all pl-10"
                  />
                  <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 block pl-2 font-mono">Outbound Fee (%)</label>
                <div className="relative">
                  <input 
                    type="number"
                    value={exitFee}
                    onChange={(e) => setExitFee(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-lg font-bold focus:border-emerald-500/50 outline-none transition-all pl-10"
                  />
                  <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results Panel */}
        <div className="space-y-6">
          <div className="bg-zinc-900/10 border border-zinc-900 rounded-[30px] p-8 flex flex-col h-full shadow-2xl relative overflow-hidden">
             {/* Background glow based on profit/loss */}
             <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] -mr-16 -mt-16 transition-colors duration-500 ${isProfit ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`} />

             <div className="space-y-1 mb-8">
               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 font-mono">Projected P&L</span>
               <div className={`text-4xl font-black tracking-tighter ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                 {isProfit ? '+' : ''}{profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                 <span className="text-xl ml-1 text-zinc-300">USD</span>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-900">
                 <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest block mb-1">ROI</span>
                 <div className={`text-lg font-bold font-mono ${isProfit ? 'text-emerald-500' : 'text-rose-500'}`}>
                   {roi > 0 ? '+' : ''}{roi.toFixed(2)}%
                 </div>
               </div>
               <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-900">
                 <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest block mb-1">Total Exit</span>
                 <div className="text-lg font-bold font-mono text-zinc-300">
                   ${finalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                 </div>
               </div>
             </div>

             <div className="space-y-4 pt-6 border-t border-zinc-900">
               <div className="flex justify-between items-center">
                 <span className="text-xs text-zinc-300">Asset Balance</span>
                 <span className="text-xs font-bold font-mono">{coinAmount.toLocaleString(undefined, { maximumFractionDigits: 6 })} {selectedCoin.symbol}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs text-zinc-300">Total Fees</span>
                 <span className="text-xs font-bold font-mono text-rose-500/60">-${(exitFeeAmount + (investment * (investmentFee/100))).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
               </div>
             </div>

             <div className="mt-auto pt-8">
                <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/10 flex gap-3 items-start">
                   <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                   <p className="text-[10px] text-emerald-500/70 leading-relaxed font-medium">
                     This simulation accounts for trading commissions but doesn't include slippage or gas fees. Prices are synced with global relays.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-16 bg-zinc-900/10 border border-zinc-900 rounded-[30px] p-8 md:p-12">
        <article className="prose prose-invert prose-zinc max-w-none">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Free Crypto Profit Calculator</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-zinc-200">What is the Crypto Profit Calculator?</h3>
            <p className="text-zinc-400 leading-relaxed">
              Our free Crypto Profit Calculator helps you determine your potential returns on cryptocurrency investments. By factoring in entry prices, target exit prices, and trading fees, this tool is essential for traders, investors, and anyone looking to project their crypto portfolio's profitability.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-zinc-200">How It Works</h3>
            <ol className="list-decimal list-inside space-y-2 text-zinc-400">
              <li><strong className="text-zinc-300">Select Asset:</strong> Choose your target cryptocurrency.</li>
              <li><strong className="text-zinc-300">Enter Capital:</strong> Input your initial investment amount in USD.</li>
              <li><strong className="text-zinc-300">Set Prices:</strong> Define your Entry Price and Exit Price (Target).</li>
              <li><strong className="text-zinc-300">Adjust Fees:</strong> Specify any inbound or outbound trading fees.</li>
              <li><strong className="text-zinc-300">View Results:</strong> Instantly see your projected P&L, ROI, and total exit value.</li>
            </ol>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-zinc-200">Examples & Use Cases</h3>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 mt-4">
              <p className="text-zinc-400 text-sm leading-relaxed">
                <strong className="text-emerald-500 block mb-2">Scenario: Basic Trade Projection</strong>
                If you invest <strong className="text-white">$1,000</strong> in Bitcoin at <strong className="text-white">$50,000</strong>, and your target exit price is <strong className="text-white">$60,000</strong>, the calculator instantly determines your profit is <strong className="text-emerald-400">$200</strong>. This represents a <strong className="text-emerald-400">20% ROI</strong> before fees.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-zinc-200">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-300 mb-1">What is a Crypto Profit Calculator?</h4>
                <p className="text-sm text-zinc-300">A tool that computes the net profit or loss of a cryptocurrency trade based on your entry and exit prices.</p>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-300 mb-1">How is crypto profit calculated?</h4>
                <p className="text-sm text-zinc-300">The basic formula is: Profit = (Exit Price × Coin Amount) - Initial Investment - Total Fees.</p>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <h4 className="font-bold text-zinc-300 mb-1">Does this calculator include trading fees?</h4>
                <p className="text-sm text-zinc-300">Yes, you can input both inbound (buying) and outbound (selling) fee percentages to get an accurate net return.</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Internal Linking Section */}
      <div className="mt-16">
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-500" />
            Related Crypto Tools
          </h2>
          <p className="text-zinc-400 text-sm">Explore other tools to maximize your crypto strategy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {allTools
            .filter((tool) => tool.category === "CRYPTO" && tool.id !== "profit-calculator")
            .map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group bg-zinc-900/10 border border-zinc-900 rounded-[20px] p-6 hover:border-emerald-500/30 hover:bg-zinc-900/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-400 px-2 py-1 bg-emerald-500/10 rounded">
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500">⭐ {tool.rating}</span>
                      <span className="text-zinc-500">{tool.users}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-900/10 border border-zinc-900 rounded-[30px] p-8 hover:border-emerald-500/30 transition-all">
          <h3 className="font-bold text-zinc-200 mb-3">Next Step: Convert Your Holdings</h3>
          <p className="text-zinc-400 text-sm mb-4">
            Once you've calculated your profits, use our converter to check your crypto values in USD, PKR, or INR.
          </p>
          <Link
            href="/crypto-to-usd-converter-instant"
            className="text-emerald-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-emerald-300 transition-colors"
          >
            Try Converter
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-zinc-900/10 border border-zinc-900 rounded-[30px] p-8 hover:border-emerald-500/30 transition-all">
          <h3 className="font-bold text-zinc-200 mb-3">Explore Market Prices</h3>
          <p className="text-zinc-400 text-sm mb-4">
            Check current prices for 50+ cryptocurrencies and track market movements in real-time.
          </p>
          <Link
            href="/live-crypto-market-prices-tracker"
            className="text-emerald-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-emerald-300 transition-colors"
          >
            View Markets
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-zinc-900/10 border border-zinc-900 rounded-[30px] p-8 hover:border-emerald-500/30 transition-all">
          <h3 className="font-bold text-zinc-200 mb-3">Read Trading Strategies</h3>
          <p className="text-zinc-400 text-sm mb-4">
            Learn how to maximize crypto profits with expert analysis and trading insights from our blog.
          </p>
          <Link
            href="/blog"
            className="text-emerald-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-emerald-300 transition-colors"
          >
            Read Blog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "HowTo",
                "name": "How to Calculate Crypto Profit",
                "description": "Step-by-step guide to calculating cryptocurrency trading profit.",
                "step": [
                  { "@type": "HowToStep", "text": "Choose your target cryptocurrency asset." },
                  { "@type": "HowToStep", "text": "Input your initial investment amount in USD." },
                  { "@type": "HowToStep", "text": "Define your Entry Price and Exit Price." },
                  { "@type": "HowToStep", "text": "Specify inbound or outbound trading fees." },
                  { "@type": "HowToStep", "text": "View your projected P&L, ROI, and total exit value." }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a Crypto Profit Calculator?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A tool that computes the net profit or loss of a cryptocurrency trade based on your entry and exit prices."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How is crypto profit calculated?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The basic formula is: Profit = (Exit Price × Coin Amount) - Initial Investment - Total Fees."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does this calculator include trading fees?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, you can input both inbound (buying) and outbound (selling) fee percentages to get an accurate net return."
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
