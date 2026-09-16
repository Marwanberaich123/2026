import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Grid3X3, 
  List, 
  SlidersHorizontal, 
  Sparkles, 
  Lock, 
  Star, 
  ArrowUpDown,
  Layers,
  Heart,
  RotateCcw
} from 'lucide-react';
import { AITool, AICategory, ViewMode, SortOption } from '../types';
import { AI_TOOLS, CATEGORIES } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { AILogo } from '../components/AILogo';

interface ToolsDirectoryPageProps {
  onNavigate: (path: string) => void;
  onUnlockTool: (tool: AITool) => void;
  onViewDetails: (slug: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  initialSearch?: string;
  initialCategory?: AICategory;
}

export const ToolsDirectoryPage: React.FC<ToolsDirectoryPageProps> = ({
  onNavigate,
  onUnlockTool,
  onViewDetails,
  favorites,
  onToggleFavorite,
  initialSearch = '',
  initialCategory = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<AICategory>(initialCategory);
  const [selectedSort, setSelectedSort] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Helper to match category including aliases
  const matchCategory = (toolCat: string, targetCat: string) => {
    if (targetCat === 'all') return true;
    if (toolCat === targetCat) return true;
    if (targetCat === 'ai-writing' && toolCat === 'writing') return true;
    if (targetCat === 'design' && toolCat === 'design-3d') return true;
    return false;
  };

  // Filtered and sorted tools
  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter((tool) => {
      // Category filter
      if (!matchCategory(tool.category, selectedCategory)) {
        return false;
      }

      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(tool.id)) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesTags = tool.tags.some(t => t.toLowerCase().includes(q));
        const matchesCompany = tool.company.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesTags && !matchesCompany) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (selectedSort) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return parseInt(b.releaseYear) - parseInt(a.releaseYear);
        case 'popular':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });
  }, [searchQuery, selectedCategory, selectedSort, showFavoritesOnly, favorites]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSort('popular');
    setShowFavoritesOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Directory Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-semibold text-purple-300 border border-purple-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Open AI Marketplace • Instant Locker</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            AI Tools Directory
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
            Search, filter, and unlock direct access to 150+ cutting-edge artificial intelligence platforms across 11 categories. Zero accounts or credit cards required.
          </p>
        </div>

        {/* Total Tools Badge */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-right">
            <div className="text-xs text-slate-400">Available Tools</div>
            <div className="text-lg font-bold text-white font-['Space_Grotesk']">
              {filteredTools.length} / {AI_TOOLS.length} Ready
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* Main Search Input */}
          <div className="relative w-full lg:flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="directory-search-input"
              type="text"
              placeholder="Search by tool name, model (e.g. GPT-4o, Claude), category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#11141E] border border-white/[0.1] focus:border-purple-500/50 rounded-2xl pl-11 pr-10 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Sort, Favorites, View Mode */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-start">
            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-[#11141E] border border-white/[0.1] rounded-2xl px-3 py-2 text-xs text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-purple-400 mr-2 shrink-0" />
              <select
                id="directory-sort-select"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                className="bg-transparent border-0 text-white text-xs font-semibold focus:outline-none cursor-pointer pr-2"
              >
                <option value="popular" className="bg-[#11141E] text-white">Most Popular</option>
                <option value="rating" className="bg-[#11141E] text-white">Highest Rated</option>
                <option value="name" className="bg-[#11141E] text-white">Name (A-Z)</option>
                <option value="newest" className="bg-[#11141E] text-white">Newly Added</option>
              </select>
            </div>

            {/* Favorites Toggle */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all border ${
                showFavoritesOnly
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-[#11141E] text-slate-400 hover:text-white border-white/[0.1]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>Saved ({favorites.length})</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#11141E] border border-white/[0.1] rounded-2xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xl transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-xl transition-colors ${
                  viewMode === 'list'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Chips Scrollbar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? AI_TOOLS.length 
              : AI_TOOLS.filter(t => matchCategory(t.category, cat.id)).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-900/30'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] border-white/[0.06]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-white/[0.05] text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TOOLS RESULTS SECTION */}
      {filteredTools.length > 0 ? (
        viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
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
        ) : (
          /* List View */
          <div className="space-y-3">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#11131B]/90 hover:bg-[#151824] border border-white/[0.08] hover:border-purple-500/40 transition-all gap-4 backdrop-blur-md"
              >
                <div className="flex items-center gap-4 flex-1">
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
                        className="text-base font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer"
                      >
                        {tool.name}
                      </h4>
                      <span className="text-xs text-slate-400">• {tool.categoryLabel}</span>
                      <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs ml-2">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{tool.rating.toFixed(2)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 max-w-2xl line-clamp-1">
                      {tool.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tool.tags.slice(0, 4).map((tag, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/[0.06]">
                  <button
                    onClick={() => onViewDetails(tool.slug)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08]"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onUnlockTool(tool)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/30"
                  >
                    <Lock className="w-3.5 h-3.5 text-purple-200" />
                    <span>Unlock Access</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl bg-white/[0.02] border border-white/[0.06] max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Matching AI Tools Found</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            We could not find any models matching your filter criteria. Try clearing your search or switching to another category.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
