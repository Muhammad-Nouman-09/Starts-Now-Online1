import MetaLayout from "@/components/MetaLayout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PrivacyPage() {
  return (
    <MetaLayout title="Privacy Protocol" subtitle="Data Handling & Security Methodology">
      <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-white prose-p:leading-relaxed">
        
        <h2 className="text-xl font-bold mt-12 mb-4 italic">1. Data Collection & Sovereignty</h2>
        <p className="mb-8">
          At Starts Now, we respect your digital privacy. We do not require account registration to access our core crypto tools and market feeds. We may collect non-identifiable technical data—such as browser type and session duration—solely to optimize our global relay network and user experience.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">2. Google AdSense & Cookie Policy</h2>
        <p className="mb-8">
          To maintain our free intelligence operations, we utilize Google AdSense to serve advertisements. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to Starts Now or other websites. 
        </p>
        <p className="mb-8">
          Google's use of advertising cookies enables it and its partners to serve ads to our users based on their interaction with our terminal and other sites on the Internet.
        </p>
        {/* <div className="bg-zinc-900/50 p-4 border-l-2 border-emerald-500 mb-8">
          <p className="font-mono text-[11px] m-0">
            OPT-OUT NOTIFICATION: Users may opt out of personalized advertising by visiting 
            <a href="https://www.google.com/settings/ads" className="text-emerald-400 ml-1">Google Ads Settings</a>. 
            Alternatively, you can opt out of third-party vendor cookies by visiting 
            <a href="https://www.aboutads.info" className="text-emerald-400 ml-1">www.aboutads.info</a>.
          </p>
        </div> */}

        <h2 className="text-xl font-bold mt-12 mb-4 italic">3. External Exchange Protocols</h2>
        <p className="mb-8">
          Our interface provides links to external blockchain protocols, crypto exchanges, and third-party resources. Starts Now is not responsible for the privacy practices or content of these external domains. We advise users to review the privacy protocols of any external entity before engaging in data or asset transfers.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">4. Protocol Evolution</h2>
        <p className="mb-8">
          This privacy protocol is subject to revalidation as global data regulations and Web3 standards evolve. Any significant modifications to our data handling methodology will be broadcast via our blog and official communication channels.
        </p>

        <h2 className="text-xl font-bold mt-12 mb-4 italic">5. Contact Information</h2>
        <p className="mb-8">
          If you have questions regarding this Privacy Protocol or the security of your data within our terminal, please contact us through our official social relays or support channels.
        </p>

        {/* Internal Linking Section */}
        <div className="mt-16 pt-8 border-t border-zinc-900">
          <h3 className="text-lg font-bold mb-6 italic">Explore Our Tools & Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/crypto-profit-calculator-with-fees"
              className="bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 rounded-xl p-4 transition-all"
            >
              <div className="font-bold text-zinc-200 mb-1">Profit Calculator</div>
              <div className="text-xs text-zinc-400 mb-2">Calculate ROI with precise fee adjustments</div>
              <div className="text-emerald-400 text-xs font-bold flex items-center gap-1">Try Now <ArrowRight className="w-3 h-3" /></div>
            </Link>
            <Link 
              href="/about"
              className="bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 rounded-xl p-4 transition-all"
            >
              <div className="font-bold text-zinc-200 mb-1">About Starts Now</div>
              <div className="text-xs text-zinc-400 mb-2">Learn about our mission and infrastructure</div>
              <div className="text-emerald-400 text-xs font-bold flex items-center gap-1">Learn More <ArrowRight className="w-3 h-3" /></div>
            </Link>
          </div>
        </div>
      </div>
    </MetaLayout>
  );
}