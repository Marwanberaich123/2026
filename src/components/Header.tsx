import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  Menu, 
  X, 
  Search, 
  Compass, 
  Zap, 
  HelpCircle, 
  Layers,
  Flame
} from 'lucide-react';
import { AITool } from '../types';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onQuickUnlock: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  featuredTool?: AITool;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onQuickUnlock,
  searchQuery,
  onSearchChange,
  featuredTool,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'All Tools', path: '/tools' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'FAQ', path: '/#faq' },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header 
      id="main-header"
      className="sticky top-0 z-40 w-full bg-[#0A0B0E]/80 backdrop-blur-xl border-b border-white/[0.08]"
    >
      {/* Top Banner: No Login Required & Instant Verification Alert */}
      <div className="bg-gradient-to-r from-purple-950/60 via-indigo-950/80 to-slate-900/70 border-b border-purple-500/20 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[11px] sm:text-xs font-medium text-purple-200">
          <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[10px] border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE DIRECTORY
          </span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span>100% Free Open Platform: No Login, No Signup, No Credit Card Required</span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span className="hidden md:inline text-purple-300 font-semibold">50+ Elite AI Models Ready</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-[1.5px] shadow-lg shadow-purple-900/30 group-hover:shadow-purple-600/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0A0B0E] rounded-[10px] flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                  AI<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Unlock</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider font-medium uppercase -mt-0.5">
                Free AI Directory
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-white/[0.08] shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Bar / Trigger */}
            <div className="hidden lg:flex items-center relative w-52 xl:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                id="header-search-input"
                type="text"
                placeholder="Search 50+ AI tools..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPath !== '/tools') {
                    onNavigate('/tools');
                  }
                }}
                className="w-full bg-[#141722] border border-white/[0.08] focus:border-purple-500/50 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-all"
              />
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => {
                if (currentPath !== '/tools') {
                  onNavigate('/tools');
                }
              }}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Search tools"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Instant Unlock CTA */}
            <button
              id="header-quick-unlock-btn"
              onClick={onQuickUnlock}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/40 hover:shadow-purple-600/40 border border-purple-400/30 transition-all duration-300 active:scale-95 shrink-0"
            >
              <Lock className="w-3.5 h-3.5 text-purple-200" />
              <span>Unlock Access</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-nav-panel"
          className="md:hidden border-t border-white/[0.08] bg-[#0A0B0E]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3"
        >
          {/* Mobile Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search AI models & tools..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentPath !== '/tools') {
                  onNavigate('/tools');
                }
              }}
              className="w-full bg-[#141722] border border-white/[0.1] rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                  currentPath === link.path
                    ? 'text-white bg-purple-500/20 text-purple-200 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-500">→</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/[0.06] flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onQuickUnlock();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Featured AI Tool</span>
            </button>
            <p className="text-[11px] text-center text-slate-400">
              🔓 No Login, Sign-up, or Subscription Required
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
