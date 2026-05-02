"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MetaLayout({ children, title, subtitle, backTo = "/" }: { 
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backTo?: string;
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link href={backTo} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300 hover:text-emerald-500 transition-colors mb-8">
        <ArrowLeft className="w-3 h-3" /> Back
      </Link>
      
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2 leading-none uppercase">{title}</h1>
        {subtitle && <p className="text-zinc-300 font-mono text-[10px] uppercase tracking-[0.4em]">{subtitle}</p>}
      </header>

      {children}
    </div>
  );
}
