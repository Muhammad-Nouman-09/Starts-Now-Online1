import MetaLayout from "@/components/MetaLayout";

export default function PrivacyPage() {
  return (
    <MetaLayout title="Privacy Protocol" subtitle="Data Handling Methodology">
      <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-white prose-p:leading-relaxed">
        <h2 className="text-xl font-bold mt-12 mb-4 italic">1. Information Retrieval</h2>
        <p className="mb-8">
          At GLEAM.INTEL, we prioritize your digital sovereignty. We do not require account registration to access our core intelligence market feeds. However, certain interactions may involve the collection of basic analytic metadata (entry nodes, session duration) to optimize our relay network performance.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">2. AdSense & Data Cookies</h2>
        <p className="mb-8">
          We utilize Google AdSense to sustain our intelligence operations. As part of this integration, third-party vendors, including Google, use cookies to serve ads based on your prior visits to this or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our terminal.
        </p>
        <p className="mb-8 font-mono text-[10px]">
          You may opt out of personalized advertising by visiting the Google Ads Settings. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting aboutads.info.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">3. External Links</h2>
        <p className="mb-8">
          Our interface contains relays (links) to external protocols and exchange platforms. We are not responsible for the privacy practices or content of these external domains. We encourage users to verify the security certificates of any external entity before initializing data transfers.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">4. Protocol Updates</h2>
        <p className="mb-8">
          This privacy protocol may be revalidated as regulatory requirements evolve. Significant changes will be announced via our Intelligence Archive (Blog).
        </p>
      </div>
    </MetaLayout>
  );
}
