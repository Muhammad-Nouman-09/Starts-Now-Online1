import Link from "next/link";
import { Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto min-h-[540px] md:min-h-[360px] w-full shrink-0 border-t border-zinc-800/60 bg-[#0F1113] flex flex-col">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 px-6 md:px-8 py-16 max-w-7xl mx-auto w-full flex-1">
        <div className="col-span-2 min-h-[164px]">
          <span className="text-lg font-bold text-emerald-400 block mb-4">Starts Now</span>
          <p className="text-zinc-300 text-sm max-w-xs mb-6 leading-relaxed">
            High-performance tools for power users. Built for the modern economy.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Visit our website" className="text-zinc-300 hover:text-emerald-400 transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Share on social media" className="text-zinc-300 hover:text-emerald-400 transition-colors">
              <Share2 className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="flex min-h-[148px] flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-400">Products</span>
          <Link href="/market" className="text-zinc-300 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Crypto Tools</Link>
          <Link href="#" className="text-zinc-300 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Office Tools</Link>
          <Link href="#" className="text-zinc-300 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Freelancer Tools</Link>
        </div>

        <div className="flex min-h-[148px] flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-400">Company</span>
          <Link href="#" className="text-zinc-300 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Business Tools</Link>
          <Link href="/blog" className="text-zinc-300 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Intelligence</Link>
          <Link href="/blog" className="text-zinc-300 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Latest Blogs</Link>
        </div>

        <div className="flex min-h-[92px] flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-400">Legal</span>
          <Link href="/privacy" className="text-zinc-300 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-zinc-300 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Terms of Service</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 py-8 border-t border-zinc-800/60 text-center min-h-[97px]">
        <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em]">
          Copyright 2026 Starts Now. High-performance tools for power users.
        </p>
      </div>
    </footer>
  );
}
