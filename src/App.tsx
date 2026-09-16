import React, { useState, useEffect, useCallback } from 'react';
import { AITool, AICategory } from './types';
import { AI_TOOLS } from './data/tools';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContentLockerModal } from './components/ContentLockerModal';
import { HomePage } from './pages/HomePage';
import { ToolsDirectoryPage } from './pages/ToolsDirectoryPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { LegalPages } from './pages/LegalPages';

export default function App() {
  // Current route state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      return p && p !== '' ? p : '/';
    }
    return '/';
  });

  // Search query & category filter passed via route/header
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<AICategory>('all');

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aiunlock_favorites');
      return saved ? JSON.parse(saved) : ['chatgpt-plus', 'claude-3-5-sonnet', 'midjourney-v6'];
    } catch {
      return ['chatgpt-plus', 'claude-3-5-sonnet', 'midjourney-v6'];
    }
  });

  // Strict In-Page Content Locker Modal State
  const [isLockerOpen, setIsLockerOpen] = useState(false);
  const [selectedToolForLocker, setSelectedToolForLocker] = useState<AITool | null>(null);

  // Synchronize route changes with browser history
  const navigateTo = useCallback((path: string) => {
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    if (path.includes('?')) {
      const [basePath, queryString] = path.split('?');
      const params = new URLSearchParams(queryString);
      const search = params.get('search');
      const cat = params.get('category');
      if (search) setSearchQuery(search);
      if (cat) setFilterCategory(cat as AICategory);
      window.history.pushState({}, '', path);
      setCurrentPath(basePath);
    } else {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  // Listen for browser back / forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Save favorites to localStorage
  const handleToggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId];
      try {
        localStorage.setItem('aiunlock_favorites', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save favorite:', err);
      }
      return updated;
    });
  };

  // Open the STRICT interactive Content Locker Modal
  const handleUnlockTool = (tool?: AITool) => {
    setSelectedToolForLocker(tool || AI_TOOLS[0]);
    setIsLockerOpen(true);
  };

  const handleCloseLocker = () => {
    setIsLockerOpen(false);
  };

  const handleViewDetails = (slug: string) => {
    navigateTo(`/tools/${slug}`);
  };

  // Route Dispatcher
  const renderCurrentPage = () => {
    // 1. Tool Details page: /tools/[slug]
    if (currentPath.startsWith('/tools/') && currentPath.length > 7) {
      const slug = currentPath.replace('/tools/', '');
      return (
        <ToolDetailPage
          slug={slug}
          onNavigate={navigateTo}
          onUnlockTool={handleUnlockTool}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    // 2. AI Tools Directory: /tools
    if (currentPath === '/tools') {
      return (
        <ToolsDirectoryPage
          onNavigate={navigateTo}
          onUnlockTool={handleUnlockTool}
          onViewDetails={handleViewDetails}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          initialSearch={searchQuery}
          initialCategory={filterCategory}
        />
      );
    }

    // 3. Legal pages: /privacy, /terms, /disclaimer
    if (currentPath === '/privacy') {
      return <LegalPages pageType="privacy" onNavigate={navigateTo} />;
    }
    if (currentPath === '/terms') {
      return <LegalPages pageType="terms" onNavigate={navigateTo} />;
    }
    if (currentPath === '/disclaimer') {
      return <LegalPages pageType="disclaimer" onNavigate={navigateTo} />;
    }

    // 4. Default: Home Page /
    return (
      <HomePage
        onNavigate={navigateTo}
        onUnlockTool={handleUnlockTool}
        onViewDetails={handleViewDetails}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Global Navigation Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onQuickUnlock={() => handleUnlockTool(AI_TOOLS[0])}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        featuredTool={AI_TOOLS[0]}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onUnlockModal={() => handleUnlockTool(AI_TOOLS[0])}
      />

      {/* CRITICAL: Strict In-Page Interactive Content Locker Modal */}
      <ContentLockerModal
        isOpen={isLockerOpen}
        onClose={handleCloseLocker}
        tool={selectedToolForLocker}
      />
    </div>
  );
}
