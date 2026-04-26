import { motion } from "motion/react";

export default function LoadingSkeleton() {
  return (
    <div className="w-full space-y-12 py-8">
      {/* Hero Skeleton */}
      <div className="relative overflow-hidden bg-zinc-900/20 border border-zinc-900 rounded-[40px] p-12 min-h-[40vh] flex flex-col justify-center gap-6">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        
        <div className="space-y-4">
          <div className="h-4 bg-zinc-800 rounded w-48 opacity-50"></div>
          <div className="h-24 md:h-32 bg-zinc-800 rounded-3xl w-3/4 opacity-40"></div>
        </div>
        
        <div className="flex gap-6 mt-8">
          <div className="h-12 bg-zinc-800 rounded-full w-40 opacity-30"></div>
          <div className="h-12 bg-zinc-800 rounded-full w-40 opacity-30"></div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-zinc-900/20 border border-zinc-900 p-8 rounded-[32px] space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]"></div>
            <div className="h-3 bg-zinc-800 rounded w-2/3 opacity-50"></div>
            <div className="h-10 bg-zinc-800 rounded w-full opacity-40"></div>
            <div className="h-2 bg-zinc-800 rounded w-1/2 opacity-30"></div>
          </div>
        ))}
      </div>

      {/* List Skeleton */}
      <div className="border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-900/10">
        <div className="h-12 bg-zinc-900/40 border-b border-zinc-800"></div>
        <div className="divide-y divide-zinc-900">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-6 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-zinc-800 rounded w-32 opacity-50"></div>
                  <div className="h-2 bg-zinc-800 rounded w-20 opacity-30"></div>
                </div>
              </div>
              <div className="h-4 bg-zinc-800 rounded w-24 opacity-40"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
