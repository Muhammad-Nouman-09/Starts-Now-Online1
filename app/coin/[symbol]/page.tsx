import Link from "next/link";
import { ArrowLeft, Coins, Info, Shield, Zap } from "lucide-react";
import { getCryptoData } from "@/lib/crypto";

export default async function CoinDetailsPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const { coins } = await getCryptoData();
  const coin = coins.find(c => c.symbol === symbol);

  if (!coin) {
    return <div className="p-20 text-center font-mono">ASSET_NOT_FOUND</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7 space-y-12">
          <header>
            <div className="flex items-center gap-4 mb-6">
               <div className="w-16 h-16 rounded-3xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <Coins className="w-8 h-8 text-emerald-500" />
               </div>
               <div>
                  <h1 className="text-5xl font-black italic tracking-tighter">{coin.name}</h1>
                  <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest">{coin.symbol} / LAYER_1_ASSET</span>
               </div>
            </div>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
              {coin.description || "The intelligence report for this asset is currently being compiled by our decentralized oracle network."}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 border border-zinc-900 bg-zinc-900/10 rounded-3xl">
               <Shield className="w-6 h-6 text-emerald-500 mb-4" />
               <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2 font-mono">Market Hierarchy</h4>
               <p className="text-xl font-bold tracking-tight">Tier-0 Asset Class</p>
            </div>
            <div className="p-8 border border-zinc-900 bg-zinc-900/10 rounded-3xl">
               <Zap className="w-6 h-6 text-amber-500 mb-4" />
               <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2 font-mono">Liquidity Index</h4>
               <p className="text-xl font-bold tracking-tight">Ultra High Velocity</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="p-10 bg-zinc-900 border border-zinc-800 rounded-[40px] space-y-8 shadow-3xl">
             <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block font-mono">Real-time Valuation</span>
                <div className="text-6xl font-black italic tracking-tighter text-emerald-400">
                  ${coin.usdPrice.toLocaleString()}
                </div>
             </div>

             <div className="space-y-6 pt-8 border-t border-zinc-800">
                <div className="flex justify-between items-center">
                   <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Market Cap</span>
                   <span className="font-mono text-sm">${(coin.marketCap || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">24H Volume</span>
                   <span className="font-mono text-sm">${(coin.volume24h || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">24H Momentum</span>
                   <span className={`font-mono text-sm font-bold ${coin.change24h >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {coin.change24h > 0 ? '+' : ''}{coin.change24h}%
                   </span>
                </div>
             </div>

             <button className="w-full bg-white text-black font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl transition-all active:scale-95 shadow-xl">
                Initialize Exchange Order
             </button>
          </div>

          <div className="p-6 border border-zinc-900 bg-zinc-950/50 rounded-2xl flex items-start gap-4">
            <Info className="w-5 h-5 text-indigo-500 shrink-0" />
            <p className="text-[10px] text-zinc-500 font-mono leading-relaxed uppercase tracking-tight">
              Intelligence data points are verified via high-frequency relays. Past performance does not guarantee future results in high-volatility environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
