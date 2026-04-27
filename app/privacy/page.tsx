import MetaLayout from "@/components/MetaLayout";

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

      </div>
    </MetaLayout>
  );
}