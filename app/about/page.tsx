import MetaLayout from "@/components/MetaLayout";

export default function AboutPage() {
  return (
    <MetaLayout title="About Starts Now" subtitle="Intelligence & Crypto Utility Hub">
      <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-white prose-p:leading-relaxed">
        <p className="text-xl md:text-2xl text-emerald-400 font-bold mb-8">
          Starts Now is a premier digital ecosystem delivering real-time crypto tools and expert blockchain analysis to navigate modern market velocities.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">The Mission</h2>
        <p className="mb-8">
          Founded in 2026, our objective is to provide high-fidelity financial intelligence through a minimalist, high-performance interface. We bridge the gap between complex blockchain data and actionable intelligence, ensuring you stay ahead in the volatile decentralized finance (DeFi) ecosystem.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">Advanced Crypto Tools</h2>
        <p className="mb-8">
          Our terminal utilizes distributed scrapers and hybrid relay nodes to synchronize market data across 50+ tier-1 assets. By combining professional crypto tools with advanced ROI simulation models, we provide a cohesive tactical environment for modern Web3 traders and investors.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">Expert Blockchain Insights</h2>
        <p className="mb-8">
          Beyond data, we offer deep-dive crypto blogs covering everything from smart contracts to technical analysis. We support our infrastructure through curated intelligence subscriptions, allowing us to keep our core market feeds open and accessible to the global crypto community.
        </p>
      </div>
    </MetaLayout>
  );
}