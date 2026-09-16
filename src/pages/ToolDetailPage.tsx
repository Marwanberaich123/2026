import React from 'react';
import { 
  ArrowLeft, 
  Lock, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Cpu, 
  Layers, 
  Heart,
  Share2,
  ExternalLink,
  MessageSquare,
  Clock,
  ThumbsUp
} from 'lucide-react';
import { AITool } from '../types';
import { AI_TOOLS } from '../data/tools';
import { AILogo } from '../components/AILogo';
import { ToolCard } from '../components/ToolCard';

interface ToolDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onUnlockTool: (tool: AITool) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({
  slug,
  onNavigate,
  onUnlockTool,
  favorites,
  onToggleFavorite,
}) => {
  const tool = AI_TOOLS.find((t) => t.slug === slug) || AI_TOOLS[0];
  const isFavorite = favorites.includes(tool.id);

  // Related tools from same category (excluding current)
  const relatedTools = AI_TOOLS
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb & Navigation Back */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('/tools')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to AI Directory</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="hover:text-slate-400 cursor-pointer" onClick={() => onNavigate('/')}>Home</span>
          <span>/</span>
          <span className="hover:text-slate-400 cursor-pointer" onClick={() => onNavigate('/tools')}>Tools</span>
          <span>/</span>
          <span className="text-purple-300 font-medium">{tool.name}</span>
        </div>
      </div>

      {/* HERO / TOOL HEADER CARD */}
      <div className="relative rounded-3xl bg-[#11131E] border border-white/[0.08] p-6 sm:p-10 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          {/* Tool Logo and Core Identifiers */}
          <div className="flex flex-col sm:flex-row items-start gap-5 flex-1">
            <AILogo
              iconType={tool.iconType}
              name={tool.name}
              gradient={tool.gradient}
              size="xl"
              className="shrink-0"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                  {tool.name}
                </h1>
                {tool.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {tool.badge}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Locked 🔒
                </span>
              </div>

              <p className="text-sm sm:text-base font-medium text-slate-300">
                {tool.tagline}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap pt-1">
                <span>By <strong className="text-white">{tool.company}</strong></span>
                <span>•</span>
                <span>Category: <strong className="text-purple-300">{tool.categoryLabel}</strong></span>
                <span>•</span>
                <span>Version: <strong className="text-slate-200">{tool.version}</strong></span>
                <span>•</span>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{tool.rating.toFixed(2)}</span>
                  <span className="text-slate-500 font-normal">({tool.reviewCount.toLocaleString()} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Price Tag */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 shrink-0">
            <div className="text-left md:text-right">
              <div className="text-xs text-slate-400">Subscription Value</div>
              <div className="flex items-baseline gap-2">
                <span className="text-slate-500 line-through text-sm font-semibold">{tool.originalPrice}</span>
                <span className="text-xl font-extrabold text-emerald-400 font-['Space_Grotesk']">FREE</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(tool.id)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isFavorite 
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' 
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
                }`}
                title={isFavorite ? 'Saved in favorites' : 'Save tool'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* LOCKED ACCESS BANNER & PRIMARY TRIGGER */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-blue-950/60 border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Access Status: Locked 🔒
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Ready for instant unlock via our interactive in-page locker. No signup, email, or account creation needed.
            </p>
          </div>

          {/* CRITICAL UNLOCK TRIGGER BUTTON */}
          <button
            id={`unlock-tool-detail-btn-${tool.slug}`}
            onClick={() => onUnlockTool(tool)}
            className="w-full md:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 hover:from-purple-400 hover:to-indigo-400 shadow-xl shadow-purple-950/60 border border-purple-300/40 transition-all duration-300 active:scale-95 shrink-0"
          >
            <Lock className="w-4 h-4 text-purple-200" />
            <span>Unlock Access Now</span>
          </button>
        </div>
      </div>

      {/* METRIC SPECIFICATIONS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#11131E] border border-white/[0.06]">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            Active Users
          </div>
          <div className="text-lg font-bold text-white font-['Space_Grotesk']">{tool.stats.users}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#11131E] border border-white/[0.06]">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Inference Latency
          </div>
          <div className="text-lg font-bold text-white font-['Space_Grotesk']">{tool.stats.speed}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#11131E] border border-white/[0.06]">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Accuracy Benchmark
          </div>
          <div className="text-lg font-bold text-white font-['Space_Grotesk']">{tool.stats.accuracy}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#11131E] border border-white/[0.06]">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            Verification Time
          </div>
          <div className="text-lg font-bold text-white font-['Space_Grotesk']">~30 Seconds</div>
        </div>
      </div>

      {/* MAIN CONTENT SPLIT: Detailed Specs + Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Description & Features */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Description */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#11131E] border border-white/[0.06] space-y-4">
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
              About {tool.name}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {tool.longDescription}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Powered by advanced neural architectures trained by {tool.company}, this tool is optimized for industry workflows, reducing hours of manual effort down to seconds.
            </p>
          </div>

          {/* Key Capabilities & Features */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#11131E] border border-white/[0.06] space-y-4">
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
              Key Features & Pro Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {tool.features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Use Cases */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#11131E] border border-white/[0.06] space-y-4">
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
              Recommended Use Cases
            </h2>
            <div className="flex flex-wrap gap-2">
              {tool.useCases.map((uc, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-200 border border-purple-500/20 text-xs font-medium"
                >
                  ⚡ {uc}
                </span>
              ))}
            </div>
          </div>

          {/* Unlocking Steps Guide */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#11131E] border border-white/[0.06] space-y-4">
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
              How to Unlock {tool.name}
            </h2>
            <ol className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <strong className="text-white block">Click "Unlock Access Now"</strong>
                  <span>The secure interactive verification modal will open right here on this page without redirecting you.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <strong className="text-white block">Complete Quick Verification</strong>
                  <span>Follow the brief interactive prompt (takes ~30 seconds). No account creation or email registration required.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div>
                  <strong className="text-white block">Receive Instant Direct Access</strong>
                  <span>The gateway link unlocks automatically upon verification completion. Enjoy unrestricted access.</span>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Right Sidebar: Security & Specs */}
        <div className="space-y-6">
          {/* Unlock Quick Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#131624] to-[#0E1019] border border-purple-500/30 space-y-4">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>Instant Access Guarantee</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              No software installation needed. The portal runs entirely inside modern web browsers across mobile and desktop.
            </p>
            <button
              onClick={() => onUnlockTool(tool)}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock {tool.name}</span>
            </button>
            <div className="pt-2 border-t border-white/[0.06] text-[11px] text-slate-400 flex items-center justify-between">
              <span>Status: Ready</span>
              <span className="text-emerald-400 font-semibold">100% Free</span>
            </div>
          </div>

          {/* Tool Specifications Table */}
          <div className="p-6 rounded-2xl bg-[#11131E] border border-white/[0.06] space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Technical Overview
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Developer / Org</span>
                <span className="text-white font-medium">{tool.company}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Current Build</span>
                <span className="text-white font-medium">{tool.version}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Release Year</span>
                <span className="text-white font-medium">{tool.releaseYear}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Pricing Tier</span>
                <span className="text-purple-300 font-medium">{tool.pricing}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Account Needed</span>
                <span className="text-emerald-400 font-bold">None (Open)</span>
              </div>
            </div>
          </div>

          {/* Tags Cloud */}
          <div className="p-6 rounded-2xl bg-[#11131E] border border-white/[0.06] space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Tags & Modalities
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {tool.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.03] text-slate-300 border border-white/[0.06]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RELATED TOOLS SECTION */}
      {relatedTools.length > 0 && (
        <div className="pt-10 border-t border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Similar {tool.categoryLabel} Tools
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Explore other highly-rated alternatives in this category.
              </p>
            </div>
            <button
              onClick={() => onNavigate(`/tools?category=${tool.category}`)}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              View all in {tool.categoryLabel} →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((relTool) => (
              <ToolCard
                key={relTool.id}
                tool={relTool}
                onUnlock={onUnlockTool}
                onViewDetails={(s) => onNavigate(`/tools/${s}`)}
                isFavorite={favorites.includes(relTool.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
