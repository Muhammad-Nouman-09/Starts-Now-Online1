"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Coins, LayoutDashboard, Calculator, ArrowLeftRight, BookOpen, ExternalLink, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Terminal", path: "/", icon: LayoutDashboard },
    { name: "Market", path: "/market", icon: Coins },
    { name: "Simulator", path: "/calculator", icon: Calculator },
    { name: "Bridge", path: "/converter", icon: ArrowLeftRight },
    { name: "Intelligence", path: "/blog", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 transition-transform group-hover:scale-105 flex items-center">
              <Image src="/logo.png" alt="Start Logo" width={100} height={32} className="h-full w-auto object-contain invert opacity-90 group-hover:opacity-100 transition-opacity" priority />
            </div>
            <span className="font-black italic tracking-tighter text-xl">Starts Now</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                  pathname === item.path
                    ? "bg-zinc-900 text-emerald-400"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-zinc-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-900 bg-zinc-950 p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-4 text-xs font-bold uppercase tracking-widest p-2 rounded-lg",
                  pathname === item.path ? "text-emerald-400 bg-emerald-500/5" : "text-zinc-500"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-1 pt-16">
        {children}
      </main>

      <footer className="border-t border-zinc-900 px-6 py-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale group-hover:grayscale-0 transition-all opacity-50">
            <div className="h-5 flex items-center">
              <Image src="/logo.png" alt="Start Logo" width={80} height={20} className="h-full w-auto object-contain invert" />
            </div>
            <span className="text-[10px] font-black italic tracking-tighter">Starts Now</span>
          </div>
          <div className="text-zinc-800 text-[9px] font-mono uppercase tracking-[0.5em]">
            &copy; 2026 CRYPTO_GLEAM // ALPHA_BUILD
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/about" className="text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-widest transition-colors">About</Link>
            <Link href="/privacy" className="text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy</Link>
            <Link href="/terms" className="text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-widest transition-colors">Terms</Link>
            <Link href="/contact" className="text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-widest transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
