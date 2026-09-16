import React from 'react';
import { Star, Lock, ArrowUpRight, Heart, Zap, Check } from 'lucide-react';
import { AITool } from '../types';
import { AILogo } from './AILogo';

interface ToolCardProps {
  tool: AITool;
  onUnlock: (tool: AITool) => void;
  onViewDetails: (slug: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (toolId: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onUnlock,
  onViewDetails,
  isFavorite = false,
  onToggleFavorite,
}) => {
  return (
    <div
      id={`tool-card-${tool.slug}`}
      className="group relative flex flex-col justify-between bg-[#11131B]/90 hover:bg-[#151824] border border-white/[0.08] hover:border-purple-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20 backdrop-blur-md overflow-hidden"
    >
      {/* Top accent glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/60 transition-all duration-500" />

      {/* Card Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <AILogo
              iconType={tool.iconType}
              name={tool.name}
              gradient={tool.gradient}
              size="md"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 
                  onClick={() => onViewDetails(tool.slug)}
                  className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer"
                >
                  {tool.name}
                </h4>
                {tool.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                    tool.badge === 'Trending' 
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : tool.badge === 'Popular'
                      ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                      : tool.badge === "Editor's Choice"
                      ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                      : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                  }`}>
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{tool.company} • {tool.categoryLabel}</p>
            </div>
          </div>

          {/* Favorite toggle */}
          {onToggleFavorite && (
            <button
              id={`fav-btn-${tool.slug}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(tool.id);
              }}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors focus:outline-none"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Tagline & Description */}
        <p className="text-sm font-medium text-slate-200 line-clamp-1 mb-1.5">
          {tool.tagline}
        </p>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 3 && (
            <span className="inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-white/[0.02] text-slate-500">
              +{tool.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-white/[0.06] mt-auto">
        {/* Rating and original price value */}
        <div className="flex items-center justify-between text-xs mb-3 text-slate-400">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{tool.rating.toFixed(2)}</span>
            <span className="text-slate-500 font-normal">({(tool.reviewCount / 1000).toFixed(1)}k)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 line-through text-[11px]">{tool.originalPrice}</span>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 text-[11px]">
              FREE
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {/* Details Button */}
          <button
            id={`view-details-${tool.slug}`}
            onClick={() => onViewDetails(tool.slug)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-all"
          >
            <span>Overview</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Unlock Access Button (CRITICAL TRIGGER) */}
          <button
            id={`unlock-btn-${tool.slug}`}
            onClick={() => onUnlock(tool)}
            className="w-full relative group/btn flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/30 hover:shadow-purple-700/40 border border-purple-400/30 transition-all active:scale-[0.98]"
          >
            <Lock className="w-3.5 h-3.5 text-purple-200 group-hover/btn:text-white" />
            <span>Unlock Access</span>
          </button>
        </div>
      </div>
    </div>
  );
};
