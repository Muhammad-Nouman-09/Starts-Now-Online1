"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Coins, Calculator, ArrowLeftRight, BookOpen,
  Menu, X, ChevronDown,
  Briefcase, Users, Building2, Globe, Share2,
} from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Nav data ───────────────────────────────────────────────── */

const cryptoTools = [
  { name: "Profit Calculator", path: "/calculator", icon: Calculator },
  { name: "Market", path: "/market", icon: Coins },
  { name: "Converter", path: "/converter", icon: ArrowLeftRight },
];

const officeTools: { name: string; path: string; icon: React.ElementType }[] = [];
const freelancerTools: { name: string; path: string; icon: React.ElementType }[] = [];
const businessTools: { name: string; path: string; icon: React.ElementType }[] = [];

const dropdowns = [
  { label: "Crypto",     icon: Calculator, items: cryptoTools     },
  { label: "Office",     icon: Briefcase,  items: officeTools     },
  { label: "Freelancer", icon: Users,      items: freelancerTools },
  { label: "Business",   icon: Building2,  items: businessTools   },
];

const standaloneItems = [
  { name: "Intelligence", path: "/blog", icon: BookOpen },
];

/* ─── Dropdown component ─────────────────────────────────────── */

function NavDropdown({
  label,
  icon: Icon,
  items,
  pathname,
}: {
  label: string;
  icon: React.ElementType;
  items: { name: string; path: string; icon: React.ElementType }[];
  pathname: string;
}) {
  const isActive = items.some((i) => i.path === pathname);
  const isEmpty = items.length === 0;

  return (
    <div className="relative group">
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-semibold tracking-tight transition-colors duration-200",
          isActive
            ? "text-emerald-400"
            : "text-zinc-400 hover:text-emerald-300"
        )}
      >
        {label}
        <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      {/* Dropdown panel */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
        <div className="bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden min-w-[220px]">
          {/* caret arrow */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 border-l border-t border-zinc-800 rotate-45" />

          {isEmpty ? (
            <div className="flex flex-col items-center justify-center gap-2 py-6 px-6 text-center">
              <Icon className="w-5 h-5 text-zinc-700" />
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                Coming Soon
              </p>
              <p className="text-[10px] text-zinc-700 font-mono leading-relaxed">
                Tools will be added here shortly.
              </p>
            </div>
          ) : (
            <div className="py-2">
              {items.map((item) => (
                <Link
                  key={item.path + item.name}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-all",
                    pathname === item.path
                      ? "text-emerald-400 bg-emerald-500/5"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Layout ─────────────────────────────────────────────────── */

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-400/30 overflow-x-hidden flex flex-col">
      {/* ── Navigation ───────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-[100] bg-[#0F1113]/80 backdrop-blur-md border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Logo + Nav links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-black tracking-tighter text-emerald-400">
              Starts Now
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {dropdowns.map((dd) => (
                <NavDropdown
                  key={dd.label}
                  label={dd.label}
                  icon={dd.icon}
                  items={dd.items}
                  pathname={pathname}
                />
              ))}
              {standaloneItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-sm font-semibold tracking-tight transition-colors duration-200",
                    pathname === item.path
                      ? "text-emerald-400"
                      : "text-zinc-400 hover:text-emerald-300"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Auth buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="bg-emerald-400 text-zinc-950 px-5 py-2 rounded-lg text-sm font-semibold tracking-tight active:scale-95 transition-transform hover:bg-emerald-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-zinc-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ── Mobile Nav ─────────────────────────────────────── */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-950 p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {dropdowns.map((dd) => (
              <div key={dd.label}>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 px-2 pb-2 flex items-center gap-2">
                  <dd.icon className="w-3 h-3" />
                  {dd.label}
                </p>
                {dd.items.length === 0 ? (
                  <p className="text-[10px] font-mono text-zinc-700 px-2 pb-2">Coming soon…</p>
                ) : (
                  dd.items.map((item) => (
                    <Link
                      key={item.path + item.name}
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 text-xs font-bold uppercase tracking-widest p-2 rounded-lg",
                        pathname === item.path
                          ? "text-emerald-400 bg-emerald-500/5"
                          : "text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  ))
                )}
              </div>
            ))}
            <div className="border-t border-zinc-800 pt-4">
              {standaloneItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 text-xs font-bold uppercase tracking-widest p-2 rounded-lg",
                    pathname === item.path
                      ? "text-emerald-400 bg-emerald-500/5"
                      : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-zinc-800 pt-4 flex flex-col gap-3">
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold text-zinc-400 text-left px-2"
              >
                Sign In
              </Link>
              <Link 
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-emerald-400 text-zinc-950 px-5 py-2.5 rounded-lg text-sm font-semibold w-full active:scale-95 transition-transform text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="flex-1 pt-16">{children}</main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-[#0F1113] w-full border-t border-zinc-800/60">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 px-6 md:px-8 py-16 max-w-7xl mx-auto">
          {/* Brand column */}
          <div className="col-span-2">
            <span className="text-lg font-bold text-emerald-400 block mb-4">Starts Now</span>
            <p className="text-zinc-500 text-sm max-w-xs mb-6 leading-relaxed">
              High-performance tools for power users. Built for the modern economy.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-500 hover:text-emerald-400 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-emerald-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium uppercase tracking-widest text-emerald-400">Products</span>
            <Link href="/market" className="text-zinc-500 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Crypto Tools</Link>
            <Link href="#" className="text-zinc-500 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Office Tools</Link>
            <Link href="#" className="text-zinc-500 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Freelancer Tools</Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium uppercase tracking-widest text-emerald-400">Company</span>
            <Link href="#" className="text-zinc-500 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Business Tools</Link>
            <Link href="/blog" className="text-zinc-500 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Intelligence</Link>
            <Link href="/blog" className="text-zinc-500 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Latest Blogs</Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium uppercase tracking-widest text-emerald-400">Legal</span>
            <Link href="/privacy" className="text-zinc-500 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-zinc-500 text-xs font-medium uppercase tracking-widest hover:text-emerald-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 border-t border-zinc-800/60 text-center">
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
            © 2026 Starts Now. High-performance tools for power users.
          </p>
        </div>
      </footer>
    </div>
  );
}
