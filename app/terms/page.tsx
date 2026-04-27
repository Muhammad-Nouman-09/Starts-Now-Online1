import MetaLayout from "@/components/MetaLayout";

export default function TermsPage() {
  return (
    <MetaLayout title="Service Methodology" subtitle="Operational Parameters & Legal Framework">
      <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-white prose-p:leading-relaxed">
        
        <h2 className="text-xl font-bold mt-12 mb-4 italic">1. Acceptance of Protocol</h2>
        <p className="mb-8">
          By initializing a connection to the Starts Now terminal, you acknowledge that you have read and agreed to these operational parameters. Accessing our market data streams and crypto utility tools constitutes absolute acceptance of these terms.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">2. Financial Intelligence Disclaimer</h2>
        <p className="mb-8 font-semibold text-zinc-300">
          Starts Now is an information relay, not a financial advisor.
        </p>
        <p className="mb-8">
          The data provided—including real-time price feeds, blockchain analytics, ROI simulations, and technical reports—is for informational purposes ONLY. Trading digital assets involves extreme volatility and risk. We do not provide financial, investment, or legal advice. You maintain 100% responsibility for your capital allocation and trading decisions.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">3. Intellectual Property & Scraping</h2>
        <p className="mb-8">
          Our proprietary intelligence interface and custom-coded crypto tools are the intellectual property of Starts Now. Unauthorized high-frequency automated scraping or mirroring of our data relays is strictly prohibited. For programmatic access, please contact us regarding official API credentials.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">4. System Reliability & Liability</h2>
        <p className="mb-8">
          Starts Now and its contributors shall not be held liable for synchronization issues, network latency, data delays, or any financial outcomes resulting from the use of our terminal. Our systems are provided on an "as-is" and "as-available" basis. We prioritize maximum relay accuracy, but guarantee no specific uptime or data perfection.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">5. External Node Redirection</h2>
        <p className="mb-8">
          Our platform may feature links to third-party exchanges and DeFi protocols. Redirection to these external nodes does not imply endorsement. We are not responsible for the performance or security of any third-party infrastructure.
        </p>

      </div>
    </MetaLayout>
  );
}