import MetaLayout from "@/components/MetaLayout";

export default function TermsPage() {
  return (
    <MetaLayout title="Service Methodology" subtitle="Operational Parameters">
      <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-white prose-p:leading-relaxed">
        <h2 className="text-xl font-bold mt-12 mb-4 italic">1. Acceptance of Terms</h2>
        <p className="mb-8">
          By initializing a connection to the Starts Now terminal, you acknowledge that you have read and agreed to these operational parameters. Accessing our data streams constitutes acceptance of these terms in their entirety.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">2. Intelligence Use</h2>
        <p className="mb-8">
          The data provided on this platform—including price feeds, ROI simulations, and analytical reports—is for informational purposes ONLY. It does not constitute financial, investment, or legal advice. Trading digital assets involves significant risk; you maintain full responsibility for your capitalize decisions.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">3. Automated Access & Scraping</h2>
        <p className="mb-8">
          While we provide market data, unauthorized high-frequency automated scraping of our proprietary intelligence interface is strictly regulated. For programmatic access, please refer to our official API documentation.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">4. Limitation of Liability</h2>
        <p className="mb-8">
          Starts Now and its contributors shall not be held liable for any synchronization issues, data delays, or financial outcomes resulting from the use of our intelligence tools. Our systems are provided "as-is" with a focus on maximum relay accuracy.
        </p>
      </div>
    </MetaLayout>
  );
}
