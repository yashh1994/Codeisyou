import React from 'react';
import { Crown, Zap, Shield, Sword, Star, Sparkles, TrendingUp } from 'lucide-react';

export const AvatarProfile: React.FC = () => {
  const [showCelebration, setShowCelebration] = React.useState(false);
  
  // Calculate overall rating from multiple platforms
  const overallRating = 1843;
  
  const getRankInfo = (rating: number) => {
    if (rating >= 3000) return { 
      rank: 'S-Rank Hunter', 
      color: 'from-red-400 via-orange-400 to-yellow-400',
      icon: Crown,
      description: 'NATIONAL LEVEL HUNTER',
      avatar: '👑',
      glow: 'shadow-red-400/60 shadow-2xl'
    };
    if (rating >= 2400) return { 
      rank: 'A-RANK HUNTER', 
      color: 'from-purple-400 via-pink-400 to-red-400',
      icon: Sword,
      description: 'ELITE HUNTER',
      avatar: '⚔️',
      glow: 'shadow-purple-400/60 shadow-xl'
    };
    if (rating >= 2100) return { 
      rank: 'B-RANK HUNTER', 
      color: 'from-blue-400 via-cyan-400 to-teal-400',
      icon: Shield,
      description: 'ADVANCED HUNTER',
      avatar: '🛡️',
      glow: 'shadow-blue-400/60 shadow-xl'
    };
    if (rating >= 1800) return { 
      rank: 'C-RANK HUNTER', 
      color: 'from-green-400 via-emerald-400 to-teal-400',
      icon: Zap,
      description: 'SKILLED HUNTER',
      avatar: '⚡',
      glow: 'shadow-green-400/60 shadow-lg'
    };
    if (rating >= 1400) return { 
      rank: 'D-RANK HUNTER', 
      color: 'from-yellow-400 via-orange-400 to-red-400',
      icon: Star,
      description: 'INTERMEDIATE HUNTER',
      avatar: '⭐',
      glow: 'shadow-yellow-400/60 shadow-lg'
    };
    return { 
      rank: 'E-RANK HUNTER', 
      color: 'from-slate-400 via-slate-500 to-slate-600',
      icon: Star,
      description: 'BEGINNER HUNTER',
      avatar: '🌟',
      glow: 'shadow-slate-400/60'
    };
  };

  const rankInfo = getRankInfo(overallRating);
  const IconComponent = rankInfo.icon;
  
  // Calculate progress to next rank
  const getNextRankThreshold = (rating: number) => {
    if (rating < 1400) return 1400;
    if (rating < 1800) return 1800;
    if (rating < 2100) return 2100;
    if (rating < 2400) return 2400;
    if (rating < 3000) return 3000;
    return 3500;
  };

  const nextThreshold = getNextRankThreshold(overallRating);
  const prevThreshold = nextThreshold === 1400 ? 0 : 
                       nextThreshold === 1800 ? 1400 :
                       nextThreshold === 2100 ? 1800 :
                       nextThreshold === 2400 ? 2100 :
                       nextThreshold === 3000 ? 2400 : 3000;
  
  const progress = ((overallRating - prevThreshold) / (nextThreshold - prevThreshold)) * 100;

  React.useEffect(() => {
    // Trigger celebration on rank up or achievement
    const timer = setTimeout(() => setShowCelebration(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30 relative overflow-hidden">
      {/* Animated background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${rankInfo.color} opacity-5 animate-pulse`}></div>
      
      {/* Celebration particles */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '1.5s'
              }}
            >
              <Sparkles className="h-3 w-3 text-yellow-400" />
            </div>
          ))}
        </div>
      )}
      
      <div className="relative z-10">
        <div className="text-center mb-6">
          {/* Avatar with glow effect */}
          <div className={`w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br ${rankInfo.color} p-1 ${rankInfo.glow} relative`}>
            <div className="w-full h-full rounded-full bg-slate-950/90 flex items-center justify-center text-4xl relative overflow-hidden">
              {/* Rank up animation */}
              {showCelebration && (
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent animate-pulse"></div>
              )}
              {rankInfo.avatar}
            </div>
          </div>
          
          {/* Rank title with icon */}
          <div className="flex items-center justify-center space-x-2 mb-2">
            <IconComponent className={`h-6 w-6 text-transparent bg-gradient-to-r ${rankInfo.color} bg-clip-text drop-shadow-lg`} />
            <h3 className={`text-xl font-bold text-transparent bg-gradient-to-r ${rankInfo.color} bg-clip-text font-mono tracking-wider drop-shadow-lg`}>
              {rankInfo.rank}
            </h3>
          </div>
          
          <p className="text-slate-300 text-sm mb-4 font-mono tracking-wide">{rankInfo.description}</p>
          
          {/* Rating display */}
          <div className="bg-slate-950/50 rounded-lg p-4 mb-4 border border-slate-700/30">
            <div className="text-3xl font-bold text-white mb-1 font-mono">{overallRating}</div>
            <div className="text-xs text-slate-400 font-mono tracking-wider">OVERALL RATING</div>
            <div className="flex items-center justify-center mt-2 space-x-1">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-400 font-mono">+56 THIS MONTH</span>
            </div>
          </div>
        </div>
        
        {/* Progress to next rank */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 font-mono tracking-wide">PROGRESS TO NEXT RANK</span>
            <span className="text-white font-medium font-mono">{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/50">
            <div 
              className={`h-full bg-gradient-to-r ${rankInfo.color} transition-all duration-1000 ease-out relative overflow-hidden`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-slate-500 font-mono">
            <span>{prevThreshold}</span>
            <span>{nextThreshold}</span>
          </div>
        </div>
        
        {/* Hunter stats */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-slate-950/30 rounded-lg p-3 text-center border border-slate-700/30">
            <div className="text-lg font-bold text-white font-mono">1,247</div>
            <div className="text-xs text-slate-400 font-mono tracking-wide">MONSTERS SLAIN</div>
          </div>
          <div className="bg-slate-950/30 rounded-lg p-3 text-center border border-slate-700/30">
            <div className="text-lg font-bold text-white font-mono">23</div>
            <div className="text-xs text-slate-400 font-mono tracking-wide">RAIDS COMPLETED</div>
          </div>
        </div>
        
        {/* Achievement notification */}
        {showCelebration && (
          <div className="mt-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-lg p-3 animate-pulse">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-yellow-400 font-mono text-sm tracking-wide">RANK UP ACHIEVED!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};