import React from 'react';
import { Shield, FileText, AlertTriangle, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface LegalPageProps {
  pageType: 'privacy' | 'terms' | 'disclaimer';
  onNavigate: (path: string) => void;
}

export const LegalPages: React.FC<LegalPageProps> = ({ pageType, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Back button */}
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Return to AIUnlock Home</span>
      </button>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 overflow-x-auto">
        <button
          onClick={() => onNavigate('/privacy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
            pageType === 'privacy'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
              : 'text-slate-400 hover:text-white bg-white/[0.02]'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => onNavigate('/terms')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
            pageType === 'terms'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
              : 'text-slate-400 hover:text-white bg-white/[0.02]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms of Service</span>
        </button>

        <button
          onClick={() => onNavigate('/disclaimer')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
            pageType === 'disclaimer'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-900/30'
              : 'text-slate-400 hover:text-white bg-white/[0.02]'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Independent Disclaimer</span>
        </button>
      </div>

      {/* Page Content */}
      {pageType === 'privacy' && (
        <div className="space-y-8 bg-[#11131E] border border-white/[0.08] rounded-3xl p-6 sm:p-10 text-slate-300 text-sm leading-relaxed">
          <div className="border-b border-white/[0.08] pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 mt-1">Last Updated: September 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Zero Account / No Login Architecture</h2>
            <p>
              AIUnlock is purposefully architected as an open web directory. We do not require visitors to register an account, sign up with an email address, create a password, or submit payment credentials. Your browsing experience across our directory is entirely anonymous.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Local Device Storage</h2>
            <p>
              We utilize browser client-side storage (such as <code className="bg-white/10 px-1.5 py-0.5 rounded text-purple-300">localStorage</code>) solely to preserve non-identifying preferences, such as bookmarked favorite tools or view layout modes (grid versus list). This data never leaves your device and is never sent to our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Third-Party Verification & Content Locker</h2>
            <p>
              When you choose to click "Unlock Access", our platform opens an interactive verification modal utilizing an embedded iframe provided by an external verification network (<code className="bg-white/10 px-1.5 py-0.5 rounded text-purple-300">unlock-content.net</code>). The verification provider operates under its own privacy policies. We do not store or process any personal responses or answers you submit within the verification iframe.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Cookies and Analytical Telemetry</h2>
            <p>
              AIUnlock does not deploy tracking cookies for cross-site behavioral targeting. Standard web server logs may temporarily capture basic technical details (e.g. browser user agent, IP address for DDoS mitigation) which are automatically expunged on rolling intervals.
            </p>
          </section>
        </div>
      )}

      {pageType === 'terms' && (
        <div className="space-y-8 bg-[#11131E] border border-white/[0.08] rounded-3xl p-6 sm:p-10 text-slate-300 text-sm leading-relaxed">
          <div className="border-b border-white/[0.08] pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-400 mt-1">Last Updated: September 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or utilizing the AIUnlock platform, you agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, please discontinue your use of the platform immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Informational & Discovery Directory</h2>
            <p>
              AIUnlock functions as a curated technological directory, educational catalog, and discovery index for third-party artificial intelligence platforms and APIs. We provide summaries, technical specifications, and verification mechanisms to access information regarding generative models.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Content Locker Verification Process</h2>
            <p>
              Access to certain external links or specialized resources is gated through an interactive sponsor verification gateway. Users acknowledge that completing verification tasks is voluntary and governed by the third-party sponsor network.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Limitation of Liability</h2>
            <p>
              AIUnlock is provided on an "as-is" and "as-available" basis without representations or warranties of any kind. Under no circumstances shall AIUnlock, its operators, or contributors be held liable for any direct, indirect, incidental, or consequential damages resulting from your use of or inability to use the platform.
            </p>
          </section>
        </div>
      )}

      {pageType === 'disclaimer' && (
        <div className="space-y-8 bg-[#11131E] border border-amber-500/30 rounded-3xl p-6 sm:p-10 text-slate-300 text-sm leading-relaxed">
          <div className="border-b border-white/[0.08] pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Independent Platform Notice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
              Non-Affiliation & Trademark Disclaimer
            </h1>
            <p className="text-xs text-slate-400 mt-1">Official Legal Statement</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs sm:text-sm font-medium">
            AIUnlock is an independent directory and technology portal. AIUnlock is NOT officially affiliated with, authorized, maintained, sponsored, or endorsed by OpenAI, Google, Anthropic, Midjourney, xAI, Canva, or any other trademark holder.
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Third-Party Trademarks & Brands</h2>
            <p>
              All product names, logos, brands, trademarks, and registered trademarks cited or displayed across AIUnlock are the sole property of their respective owners:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs sm:text-sm">
              <li><strong className="text-white">OpenAI, Inc.</strong>: ChatGPT, GPT-4, GPT-4o, DALL-E, Sora</li>
              <li><strong className="text-white">Google LLC / Alphabet Inc.</strong>: Gemini, Gemini Advanced, DeepMind</li>
              <li><strong className="text-white">Anthropic PBC</strong>: Claude, Claude 3.5 Sonnet, Claude Opus</li>
              <li><strong className="text-white">Midjourney, Inc.</strong>: Midjourney, Midjourney v6</li>
              <li><strong className="text-white">ElevenLabs, Inc.</strong>: ElevenLabs, Prime Voice AI</li>
              <li><strong className="text-white">Runway AI, Inc.</strong>: Runway, Gen-2, Gen-3 Alpha</li>
              <li><strong className="text-white">xAI Corp.</strong>: Grok, Grok 2</li>
              <li><strong className="text-white">Canva Pty Ltd.</strong>: Canva, Magic Studio</li>
              <li><strong className="text-white">Notion Labs, Inc.</strong>: Notion, Notion AI</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Nominative Fair Use</h2>
            <p>
              The use of these corporate names, trademarks, and logos is purely for identification, descriptive, and reference purposes under nominative fair use principles. Such use does not imply any affiliation with or endorsement by them.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Third-Party Content & External Services</h2>
            <p>
              AIUnlock does not host, clone, reverse-engineer, or store proprietary models. Any access links or gateways provided through the verification network direct users to officially available or third-party sponsored interfaces.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};
