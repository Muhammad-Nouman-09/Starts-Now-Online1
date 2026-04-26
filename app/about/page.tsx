import MetaLayout from "@/components/MetaLayout";

export default function AboutPage() {
  return (
    <MetaLayout title="Terminal Intelligence" subtitle="System Core Information">
      <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-white prose-p:leading-relaxed">
        <p className="text-xl md:text-2xl text-emerald-400 font-bold mb-8">
          Starts Now is more than a market tracker. It is a next-generation intelligence relay designed to demystify complex market velocities.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">Our Mission</h2>
        <p className="mb-8">
          Founded in 2026, our objective is to provide high-fidelity financial intelligence through a minimalist, high-performance interface. We believe that clarity in data leads to better decision-making in the volatile digital asset ecosystem.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">Technological Stack</h2>
        <p className="mb-8">
          Our terminal utilizes distributed scrapers and hybrid relay nodes to synchronize 50+ tier-1 and tier-2 assets. By combining real-time pricing with advanced ROI simulation models, we provide a cohesive tactical environment for modern traders.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">Transparency</h2>
        <p className="mb-8">
          We support our infrastructure through non-intrusive advertising partnerships and curated intelligence subscriptions. This model allows us to keep our core market feeds open and accessible to the global community.
        </p>
      </div>
    </MetaLayout>
  );
}
