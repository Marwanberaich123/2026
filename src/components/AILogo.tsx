import React from 'react';
import { 
  Sparkles, 
  Bot, 
  Terminal, 
  Cpu, 
  Image as ImageIcon, 
  Film, 
  Mic, 
  Code2, 
  FileText, 
  Wand2, 
  Search, 
  Music,
  Layers,
  Video,
  Box,
  Sliders,
  Presentation,
  CheckCircle,
  MessagesSquare,
  Zap,
  Volume2
} from 'lucide-react';

interface AILogoProps {
  iconType: string;
  name: string;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AILogo: React.FC<AILogoProps> = ({ 
  iconType, 
  gradient = 'from-purple-600 to-indigo-600',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs rounded-lg',
    md: 'w-12 h-12 text-sm rounded-xl',
    lg: 'w-16 h-16 text-base rounded-2xl',
    xl: 'w-20 h-20 text-lg rounded-2xl',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  const getIcon = () => {
    const isz = iconSizeClasses[size];
    switch (iconType) {
      case 'openai':
        return <Bot className={isz} />;
      case 'claude':
        return <Sparkles className={isz} />;
      case 'midjourney':
        return <ImageIcon className={isz} />;
      case 'elevenlabs':
        return <Mic className={isz} />;
      case 'runway':
      case 'kling':
      case 'sora':
      case 'pika':
        return <Film className={isz} />;
      case 'gemini':
        return <Sparkles className={isz} />;
      case 'cursor':
      case 'replit':
      case 'bolt':
      case 'phind':
      case 'lovable':
        return <Terminal className={isz} />;
      case 'perplexity':
        return <Search className={isz} />;
      case 'flux':
      case 'stability':
      case 'leonardo':
      case 'ideogram':
      case 'magnific':
        return <Wand2 className={isz} />;
      case 'suno':
      case 'udio':
        return <Music className={isz} />;
      case 'v0':
        return <Code2 className={isz} />;
      case 'github':
        return <Cpu className={isz} />;
      case 'luma':
      case 'meshy':
        return <Box className={isz} />;
      case 'canva':
        return <Wand2 className={isz} />;
      case 'notion':
      case 'tome':
        return <FileText className={isz} />;
      case 'gamma':
        return <Presentation className={isz} />;
      case 'jasper':
      case 'copyai':
        return <Wand2 className={isz} />;
      case 'descript':
      case 'whisper':
        return <Volume2 className={isz} />;
      case 'heygen':
      case 'synthesia':
        return <Video className={isz} />;
      case 'grok':
        return <Zap className={isz} />;
      case 'grammarly':
        return <CheckCircle className={isz} />;
      case 'character':
        return <MessagesSquare className={isz} />;
      default:
        return <Sparkles className={isz} />;
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center font-bold text-white bg-gradient-to-br ${gradient} shadow-lg shadow-black/40 border border-white/20 transition-transform duration-300 group-hover:scale-105 shrink-0 ${sizeClasses[size]} ${className}`}
    >
      <div className="absolute inset-0 bg-white/10 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity" />
      {getIcon()}
    </div>
  );
};

