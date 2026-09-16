import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  ArrowRight, 
  Search, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  ChevronDown, 
  Flame, 
  Compass, 
  Layers,
  MessageSquare,
  Image as ImageIcon,
  Film,
  Mic,
  Code2,
  PenTool,
  Clock,
  TrendingUp,
  Award,
  Bot,
  BookOpen
} from 'lucide-react';
import { AITool, AICategory } from '../types';
import { AI_TOOLS, CATEGORIES, HOW_IT_WORKS_STEPS, FAQS } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { AILogo } from '../components/AILogo';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onUnlockTool: (tool: AITool) => void;
  onViewDetails: (slug: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onUnlockTool,
  onViewDetails,
  favorites,
  onToggleFavorite,
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<AICategory>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [heroSearch, setHeroSearch] = useState('');

  // Helper to match category including aliases
  const matchCategory = (toolCat: string, targetCat: string) => {
    if (targetCat === 'all') return true;
    if (toolCat === targetCat) return true;
    if (targetCat === 'ai-writing' && toolCat === 'writing') return true;
    if (targetCat === 'design' && toolCat === 'design-3d') return true;
    return false;
  };

  // Top featured tools
  const featuredTools = AI_TOOLS.filter((t) => 
    t.badge === 'Popular' || t.badge === 'Trending' || t.badge === "Editor's Choice"
  ).slice(0, 6);

  // Tab filtered tools
  const tabFilteredTools = activeCategoryTab === 'all'
    ? AI_TOOLS.slice(0, 8)
    : AI_TOOLS.filter((t) => matchCategory(t.category, activeCategoryTab)).slice(0, 8);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onNavigate(`/tools?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      onNavigate('/tools');
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare className="w-5 h-5" />;
      case 'PenTool': return <PenTool className="w-5 h-5" />;
      case 'Image': return <ImageIcon className="w-5 h-5" />;
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Mic': return <Mic className="w-5 h-5" />;
      case 'Code': return <Code2 className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Palette': return <Layers className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* HERO SECTION */}
      <section 
        id="hero-section"
        className="relative pt-10 sm:pt-16 lg:pt-24 pb-12 overflow-hidden text-center"
      >
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[250px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Top trust pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-semibold text-purple-300 backdrop-blur-md mb-8 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Open AI Marketplace • Zero Sign-Up Required</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-slate-400 font-normal hidden sm:inline">Instant In-Modal Verification</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Space_Grotesk'] leading-[1.1] mb-6">
            Unlock the Best{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
              AI Tools
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Explore the world's premier generative AI platforms. Unlock instant access to ChatGPT Plus, Claude 3.5 Sonnet, Midjourney, and ElevenLabs via our secure interactive in-page locker with zero registration.
          </p>

          {/* Hero Search & Instant Unlock Action */}
          <form 
            onSubmit={handleHeroSearchSubmit}
            className="max-w-2xl mx-auto mb-10"
          >
            <div className="relative flex flex-col sm:flex-row items-center p-2 rounded-2xl bg-[#121520]/90 border border-white/[0.12] focus-within:border-purple-500/60 shadow-2xl shadow-purple-950/30 backdrop-blur-xl gap-2">
              <div className="relative flex-1 w-full flex items-center pl-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  id="hero-search-input"
                  type="text"
                  placeholder="Search tools (e.g. ChatGPT, Midjourney, Coding, Video)..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full bg-transparent border-0 px-3 py-2 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] transition-colors"
                >
                  Explore Catalog
                </button>
                <button
                  type="button"
                  onClick={() => onUnlockTool(AI_TOOLS[0])}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/40 border border-purple-400/30 transition-all shrink-0"
                >
                  <Lock className="w-4 h-4 text-purple-200" />
                  <span>Unlock Access</span>
                </button>
              </div>
            </div>

            {/* Quick Tag Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-slate-400 mt-4">
              <span className="text-slate-500">Popular right now:</span>
              {['ChatGPT Plus', 'Claude 3.5 Sonnet', 'Midjourney v6', 'Flux.1', 'ElevenLabs'].map((toolName) => (
                <button
                  key={toolName}
                  type="button"
                  onClick={() => onNavigate(`/tools?search=${encodeURIComponent(toolName)}`)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-colors"
                >
                  {toolName}
                </button>
              ))}
            </div>
          </form>

          {/* Platform Stats Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/[0.06]">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">50+</div>
              <div className="text-xs text-slate-400 mt-0.5">Top AI Models</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-['Space_Grotesk']">100% Free</div>
              <div className="text-xs text-slate-400 mt-0.5">Zero Signups Needed</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 font-['Space_Grotesk']">30s</div>
              <div className="text-xs text-slate-400 mt-0.5">Average Verification</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-['Space_Grotesk']">2.4M+</div>
              <div className="text-xs text-slate-400 mt-0.5">Sessions Unlocked</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TOOLS SHOWCASE */}
      <section id="featured-tools-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
              <Flame className="w-4 h-4" />
              <span>Trending Worldwide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Premium AI Models
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              The highest-rated frontier models ready for direct in-page unlocking.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/tools')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
          >
            <span>Browse all 50+ tools</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onUnlock={onUnlockTool}
              onViewDetails={onViewDetails}
              isFavorite={favorites.includes(tool.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
            <Compass className="w-4 h-4" />
            <span>Discover by Domain</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Explore AI by Category
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Whether you need autonomous code refactoring, studio-grade vocal cloning, or cinematic video synthesis.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
            const count = AI_TOOLS.filter((t) => matchCategory(t.category, cat.id)).length;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate(`/tools?category=${cat.id}`)}
                className="group p-5 rounded-2xl bg-[#11141E]/70 hover:bg-[#151928] border border-white/[0.07] hover:border-purple-500/40 transition-all cursor-pointer hover:shadow-lg hover:shadow-purple-950/20 backdrop-blur-md"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all flex items-center justify-center mb-3">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-400">
                  <span>{count} tools ready</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section 
        id="how-it-works"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="relative rounded-3xl bg-gradient-to-b from-[#10131E] to-[#0A0C13] border border-white/[0.08] p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-semibold text-purple-300 border border-purple-500/20 mb-3">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>3-Step Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How AIUnlock Works
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3">
              We eliminated account creation, passwords, and billing details. Everything happens directly inside your active browser session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="relative p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-purple-500/40 font-['Space_Grotesk']">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                      {idx === 0 && <Compass className="w-5 h-5" />}
                      {idx === 1 && <Lock className="w-5 h-5" />}
                      {idx === 2 && <Zap className="w-5 h-5" />}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{idx === 0 ? '50+ Verified tools' : idx === 1 ? 'Interactive in-page modal' : 'Zero login required'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Live modal test trigger card */}
          <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/50 to-slate-900/60 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center shrink-0 border border-purple-400/30">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Experience the Interactive Locker Modal</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  See how the modal opens securely on this page with zero redirects or new tabs.
                </p>
              </div>
            </div>

            <button
              onClick={() => onUnlockTool(AI_TOOLS[0])}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 transition-all shrink-0"
            >
              Test Unlock Modal Now
            </button>
          </div>
        </div>
      </section>

      {/* WHY AIUNLOCK COMPARISON SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why Choose AIUnlock?
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Compare our open access model with traditional AI subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional Subscriptions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#10121A] border border-white/[0.06]">
            <h3 className="text-lg font-bold text-slate-400 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/50" />
              Standard Subscriptions
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span>$20 to $40 per tool every month recurring fee</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Requires personal credit cards, billing address, phone verification</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Requires signup, password management, and email confirmation</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Multiple accounts across dozen different AI platforms</span>
              </li>
            </ul>
          </div>

          {/* AIUnlock Model */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#131726] to-[#0F111D] border border-purple-500/40 shadow-xl shadow-purple-950/20">
            <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              AIUnlock Open Gateway
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">100% Free</strong> with zero recurring fees or credit card demands</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Zero Signup</strong>: no registration, login, or personal emails</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Strict In-Page Modal</strong>: interactive locker never redirects you away</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">50+ Premier AI Tools</strong> curated in one unified central directory</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Clear Answers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Everything you need to know about AIUnlock and our verification gateway.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#10131D] border border-white/[0.08] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-slate-900/80 border border-purple-500/30 p-8 sm:p-14 text-center overflow-hidden shadow-2xl shadow-purple-950/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] mb-4">
            Ready to Unlock Frontier AI?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of daily creators, engineers, and researchers accessing premier generative models without barriers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onNavigate('/tools')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-white/[0.1] hover:bg-white/[0.15] border border-white/[0.15] transition-all"
            >
              Browse Full 50+ Directory
            </button>
            <button
              onClick={() => onUnlockTool(AI_TOOLS[0])}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 hover:from-purple-400 hover:to-indigo-400 shadow-xl shadow-purple-900/50 border border-purple-300/40 transition-all active:scale-95"
            >
              <Lock className="w-4 h-4 text-purple-200" />
              <span>Unlock Instant Access Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
