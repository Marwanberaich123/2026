import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Lock, ShieldCheck, RefreshCw, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { AITool } from '../types';
import { AILogo } from './AILogo';

interface ContentLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: AITool | null;
}

export const ContentLockerModal: React.FC<ContentLockerModalProps> = ({
  isOpen,
  onClose,
  tool,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const LOCKER_URL = 'https://unlock-content.net/?08337c8';

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset loading state on open
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, iframeKey]);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="content-locker-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            id="content-locker-modal-container"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-[#0C0E14] border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-950/50 overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-blue-950/40 shrink-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {tool ? (
                    <AILogo
                      iconType={tool.iconType}
                      name={tool.name}
                      gradient={tool.gradient}
                      size="md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg border border-white/20">
                      <Lock className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        Unlock {tool ? tool.name : 'AI Tool'}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                      {tool ? `${tool.categoryLabel} • Value: ${tool.originalPrice}` : 'Instant premium gateway'}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  id="close-content-locker-btn"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instructions Bar */}
              <div className="mt-3.5 p-2.5 sm:p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-between gap-2 text-xs text-purple-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>
                    Complete the brief interactive sponsor check below to unlock your direct access session.
                  </span>
                </div>
                <button
                  onClick={handleRefresh}
                  title="Reload Verification Box"
                  className="p-1.5 hover:bg-purple-500/20 rounded-lg transition-colors text-purple-300 hover:text-white shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded Content Locker iFrame */}
            <div className="relative flex-1 bg-[#07080B] flex flex-col min-h-[480px] sm:min-h-[540px]">
              {/* Loading Indicator */}
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#07080B]/90 backdrop-blur-sm gap-3 p-6 text-center">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
                    <div className="absolute inset-0 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Loading Secure Gateway...</p>
                    <p className="text-xs text-slate-400 mt-1">Establishing encrypted session with verification provider</p>
                  </div>
                </div>
              )}

              {/* Strict In-Page Embedded Locker Iframe */}
              <iframe
                key={iframeKey}
                id="content-locker-iframe"
                src={LOCKER_URL}
                title="AIUnlock Content Verification Gateway"
                className="w-full flex-1 border-0 h-[480px] sm:h-[540px] bg-transparent"
                onLoad={() => setIsLoading(false)}
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0A0C12] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-400 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>256-Bit SSL Secured</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No Login Required</span>
                </div>
              </div>
              <div className="text-slate-500 text-center sm:text-right">
                Instant unlock applies automatically upon verification
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
