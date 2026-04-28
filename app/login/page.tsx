"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Lock, Github, Chrome } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black tracking-tighter text-emerald-400 mb-6 inline-block">
            Starts Now
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-zinc-500 text-sm mt-2">Enter your credentials to access your terminal</p>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-11 text-sm text-white placeholder:text-zinc-700 focus:border-emerald-500/50 outline-none transition-all"
                />
                <Mail className="w-4 h-4 text-zinc-700 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Password</label>
                <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-11 text-sm text-white placeholder:text-zinc-700 focus:border-emerald-500/50 outline-none transition-all"
                />
                <Lock className="w-4 h-4 text-zinc-700 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:active:scale-100"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  SIGN IN
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="bg-[#0f1113] px-4 text-zinc-600">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 py-2.5 rounded-xl transition-all group">
              <Github className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Github</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 py-2.5 rounded-xl transition-all group">
              <Chrome className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Google</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-zinc-500 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-emerald-400 font-bold hover:underline underline-offset-4">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
