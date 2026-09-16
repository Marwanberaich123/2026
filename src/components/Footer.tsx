import React from 'react';
import { Sparkles, Shield, Lock, ExternalLink, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/tools';

interface FooterProps {
  onNavigate: (path: string) => void;
  onUnlockModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onUnlockModal }) => {
  return (
    <footer 
      id="main-footer"
      className="border-t border-white/[0.08] bg-[#07080B] text-slate-400 text-sm mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 cursor-pointer group w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-[1.5px] shadow-lg">
                <div className="w-full h-full bg-[#0A0B0E] rounded-[10px] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                AI<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Unlock</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier open directory and instant verification gateway for top-tier artificial intelligence platforms. Discover, explore, and unlock generative models without subscription barriers.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-purple-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Zero-login architecture • Accessible to everyone</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onUnlockModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>Test Interactive Locker Modal</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('/')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/tools')}
                  className="hover:text-purple-300 transition-colors"
                >
                  All 50+ AI Tools
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/#how-it-works')}
                  className="hover:text-purple-300 transition-colors"
                >
                  How Verification Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/#faq')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Categories
            </h5>
            <ul className="space-y-2.5 text-xs">
              {CATEGORIES.filter(c => c.id !== 'all').slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => onNavigate(`/tools?category=${cat.id}`)}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Legal & Trust
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/disclaimer')}
                  className="hover:text-purple-300 transition-colors text-amber-300/80 hover:text-amber-300"
                >
                  Independent Disclaimer
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-500 leading-normal">
                Encrypted with 256-bit SSL verification standards.
              </li>
            </ul>
          </div>
        </div>

        {/* Independent Trademark Notice & Disclaimer */}
        <div className="pt-8 border-t border-white/[0.06] text-[11px] text-slate-400 space-y-3">
          <p className="leading-relaxed">
            <strong className="text-slate-300">Independent Disclaimer:</strong> AIUnlock is an independent technology directory and discovery index. ChatGPT, DALL-E, and OpenAI are trademarks of OpenAI, Inc. Gemini is a trademark of Google LLC. Claude is a trademark of Anthropic PBC. Midjourney is a trademark of Midjourney, Inc. Runway is a trademark of Runway AI, Inc. ElevenLabs is a trademark of ElevenLabs, Inc. Canva is a trademark of Canva Pty Ltd. Notion is a trademark of Notion Labs, Inc. xAI and Grok are trademarks of xAI Corp. AIUnlock is not affiliated with, authorized, maintained, sponsored, or endorsed by any of these organizations or their affiliates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-slate-400">
            <div>
              © {new Date().getFullYear()} AIUnlock. All rights reserved. Open access platform.
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <button onClick={() => onNavigate('/privacy')} className="hover:text-white transition-colors">Privacy</button>
              <span>•</span>
              <button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors">Terms</button>
              <span>•</span>
              <button onClick={() => onNavigate('/disclaimer')} className="hover:text-white transition-colors">Disclaimer</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
