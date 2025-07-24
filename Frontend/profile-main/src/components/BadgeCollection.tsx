import React, { useState } from 'react';
import { Award, X, Star, Trophy, Zap, Shield, Crown, Target, Flame, Sparkles } from 'lucide-react';

interface Badge {
  id: number;
  name: string;
  description: string;
  platform: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: React.ComponentType<any>;
  earnedDate: string;
  progress?: number;
  maxProgress?: number;
  category: string;
}

export const BadgeCollection: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  
  const badges: Badge[] = [
    {
      id: 1,
      name: 'Problem Solver',
      description: 'Solved 100 problems across all platforms',
      platform: 'Global',
      rarity: 'common',
      icon: Target,
      earnedDate: '2024-01-15',
      category: 'Achievement'
    },
    {
      id: 2,
      name: 'LeetCode Champion',
      description: 'Participated in 25 LeetCode contests',
      platform: 'LeetCode',
      rarity: 'rare',
      icon: Trophy,
      earnedDate: '2024-02-20',
      category: 'Contest'
    },
    {
      id: 3,
      name: 'Codeforces Speedster',
      description: 'Solved 10 Codeforces problems in under 30 minutes',
      platform: 'Codeforces',
      rarity: 'epic',
      icon: Zap,
      earnedDate: '2024-03-10',
      category: 'Speed'
    },
    {
      id: 4,
      name: 'HackerRank Guardian',
      description: 'Maintained a 30-day HackerRank solving streak',
      platform: 'HackerRank',
      rarity: 'legendary',
      icon: Shield,
      earnedDate: '2024-03-25',
      category: 'Consistency'
    },
    {
      id: 5,
      name: 'LeetCode Master',
      description: 'Solved 50 hard LeetCode problems',
      platform: 'LeetCode',
      rarity: 'epic',
      icon: Crown,
      earnedDate: '2024-04-05',
      category: 'Difficulty'
    },
    {
      id: 6,
      name: 'CodeChef Rising Star',
      description: 'Gained 200+ CodeChef rating in a month',
      platform: 'CodeChef',
      rarity: 'rare',
      icon: Star,
      earnedDate: '2024-04-12',
      category: 'Progress'
    },
    {
      id: 7,
      name: 'Codeforces Specialist',
      description: 'Reached Specialist rank on Codeforces',
      platform: 'Codeforces',
      rarity: 'epic',
      icon: Award,
      earnedDate: '2024-04-18',
      category: 'Achievement'
    },
    {
      id: 8,
      name: 'Fire Streak',
      description: 'Current 15-day solving streak',
      platform: 'Global',
      rarity: 'common',
      icon: Flame,
      earnedDate: '2024-04-20',
      progress: 15,
      maxProgress: 30,
      category: 'Streak'
    },
    {
      id: 9,
      name: 'AtCoder Beginner',
      description: 'Participated in first AtCoder contest',
      platform: 'AtCoder',
      rarity: 'common',
      icon: Star,
      earnedDate: '2024-04-22',
      category: 'Contest'
    }
  ];

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return {
          gradient: 'from-slate-400 via-slate-300 to-slate-400',
          glow: 'shadow-slate-400/40',
          border: 'border-slate-300/60',
          text: 'text-slate-300'
        };
      case 'rare':
        return {
          gradient: 'from-blue-400 via-cyan-300 to-blue-400',
          glow: 'shadow-blue-400/60',
          border: 'border-blue-300/60',
          text: 'text-blue-300'
        };
      case 'epic':
        return {
          gradient: 'from-purple-400 via-pink-300 to-purple-400',
          glow: 'shadow-purple-400/60',
          border: 'border-purple-300/60',
          text: 'text-purple-300'
        };
      case 'legendary':
        return {
          gradient: 'from-yellow-400 via-orange-300 to-yellow-400',
          glow: 'shadow-yellow-400/80',
          border: 'border-yellow-300/60',
          text: 'text-yellow-300'
        };
      default:
        return {
          gradient: 'from-slate-400 via-slate-300 to-slate-400',
          glow: 'shadow-slate-400/40',
          border: 'border-slate-300/60',
          text: 'text-slate-300'
        };
    }
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      'LeetCode': 'text-orange-400',
      'Codeforces': 'text-blue-400', 
      'HackerRank': 'text-green-400',
      'CodeChef': 'text-amber-400',
      'AtCoder': 'text-red-400',
      'Global': 'text-cyan-400'
    };
    return colors[platform as keyof typeof colors] || 'text-slate-400';
  };

  const getPlatformTheme = (platform: string) => {
    switch (platform) {
      case 'LeetCode':
        return {
          gradient: 'from-orange-500 via-orange-400 to-yellow-500',
          glow: 'shadow-orange-500/70',
          border: 'border-orange-400/80',
          innerBg: 'bg-orange-950/90',
          accent: 'text-orange-400',
          platformBg: 'bg-gradient-to-br from-orange-600/20 to-yellow-600/20'
        };
      case 'Codeforces':
        return {
          gradient: 'from-blue-600 via-blue-500 to-indigo-600',
          glow: 'shadow-blue-500/70',
          border: 'border-blue-400/80',
          innerBg: 'bg-blue-950/90',
          accent: 'text-blue-400',
          platformBg: 'bg-gradient-to-br from-blue-600/20 to-indigo-600/20'
        };
      case 'HackerRank':
        return {
          gradient: 'from-green-600 via-green-500 to-emerald-600',
          glow: 'shadow-green-500/70',
          border: 'border-green-400/80',
          innerBg: 'bg-green-950/90',
          accent: 'text-green-400',
          platformBg: 'bg-gradient-to-br from-green-600/20 to-emerald-600/20'
        };
      case 'CodeChef':
        return {
          gradient: 'from-amber-600 via-yellow-500 to-orange-600',
          glow: 'shadow-amber-500/70',
          border: 'border-amber-400/80',
          innerBg: 'bg-amber-950/90',
          accent: 'text-amber-400',
          platformBg: 'bg-gradient-to-br from-amber-600/20 to-orange-600/20'
        };
      case 'AtCoder':
        return {
          gradient: 'from-red-600 via-red-500 to-pink-600',
          glow: 'shadow-red-500/70',
          border: 'border-red-400/80',
          innerBg: 'bg-red-950/90',
          accent: 'text-red-400',
          platformBg: 'bg-gradient-to-br from-red-600/20 to-pink-600/20'
        };
      default: // Global
        return {
          gradient: 'from-cyan-600 via-cyan-500 to-blue-600',
          glow: 'shadow-cyan-500/70',
          border: 'border-cyan-400/80',
          innerBg: 'bg-cyan-950/90',
          accent: 'text-cyan-400',
          platformBg: 'bg-gradient-to-br from-cyan-600/20 to-blue-600/20'
        };
    }
  };

  const getCombinedColors = (badge: Badge) => {
    const rarityColors = getRarityColors(badge.rarity);
    const platformTheme = getPlatformTheme(badge.platform);
    
    // For legendary badges, keep the golden theme
    if (badge.rarity === 'legendary') {
      return rarityColors;
    }
    
    // For other rarities, blend platform theme with rarity
    return {
      gradient: platformTheme.gradient,
      glow: platformTheme.glow,
      border: platformTheme.border,
      text: platformTheme.accent
    };
  };

  return (
    <>
      <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white font-mono tracking-wider">BADGE COLLECTION</h3>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 font-mono tracking-wide">TOTAL BADGES</div>
            <div className="text-lg font-bold text-yellow-400 font-mono">{badges.length}</div>
          </div>
        </div>

        {/* Platform Legend */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
          {['LeetCode', 'Codeforces', 'HackerRank', 'CodeChef', 'AtCoder'].map((platform) => {
            const theme = getPlatformTheme(platform);
            const count = badges.filter(b => b.platform === platform).length;
            return (
              <div key={platform} className={`${theme.platformBg} rounded-lg p-2 text-center border ${theme.border}`}>
                <div className={`text-sm font-bold ${theme.accent} font-mono`}>{count}</div>
                <div className="text-xs text-slate-300 font-mono">{platform}</div>
              </div>
            );
          })}
        </div>
        {/* Badge Stack */}
        <div className="relative">
          <div className="flex items-center space-x-2 overflow-x-auto pb-4">
            {badges.map((badge, index) => {
              const colors = getCombinedColors(badge);
              const platformTheme = getPlatformTheme(badge.platform);
              const IconComponent = badge.icon;
              
              return (
                <div
                  key={badge.id}
                  className="relative flex-shrink-0 cursor-pointer group"
                  style={{ zIndex: badges.length - index }}
                  onClick={() => setSelectedBadge(badge)}
                >
                  {/* Coin shadow */}
                  <div className="absolute inset-0 bg-black/40 rounded-full transform translate-y-2 translate-x-1 blur-md"></div>
                  
                  {/* Main coin */}
                  <div className={`
                    relative w-16 h-16 rounded-full 
                    bg-gradient-to-br ${colors.gradient}
                    border-2 ${colors.border}
                    ${colors.glow} shadow-lg
                    transform transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-12 group-hover:-translate-y-2
                    flex items-center justify-center
                    before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-transparent before:via-white/10 before:to-white/20
                  `}>
                    {/* Inner circle */}
                    <div className={`w-12 h-12 rounded-full ${platformTheme.innerBg} flex items-center justify-center border border-slate-600/50`}>
                      <IconComponent className="h-6 w-6 text-white drop-shadow-lg" />
                    </div>
                    
                    {/* Rarity indicator */}
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${colors.gradient} border-2 ${colors.border} flex items-center justify-center ${colors.glow}`}>
                      <div className="w-2 h-2 rounded-full bg-white shadow-sm"></div>
                    </div>
                    
                    {/* Progress indicator for streak badges */}
                    {badge.progress && badge.maxProgress && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-12 bg-slate-800/80 rounded-full h-1.5 border border-slate-600/50">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-300`}
                            style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Sparkle effect for legendary */}
                    {badge.rarity === 'legendary' && (
                      <div className="absolute inset-0 rounded-full">
                        <Sparkles className="absolute -top-2 -left-2 h-4 w-4 text-yellow-300 animate-pulse drop-shadow-lg" />
                        <Sparkles className="absolute -bottom-2 -right-2 h-4 w-4 text-yellow-300 animate-pulse drop-shadow-lg" style={{ animationDelay: '0.5s' }} />
                        <Sparkles className="absolute top-0 -right-2 h-3 w-3 text-yellow-200 animate-pulse drop-shadow-lg" style={{ animationDelay: '1s' }} />
                      </div>
                    )}
                  </div>
                  
                  {/* Hover tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-slate-950/95 text-white text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-600/50 whitespace-nowrap shadow-lg">
                      {badge.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-950/95"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badge categories summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {['Achievement', 'Contest', 'Speed', 'Consistency'].map((category) => {
            const count = badges.filter(b => b.category === category).length;
            return (
              <div key={category} className="bg-slate-950/30 rounded-lg p-3 text-center border border-slate-700/30">
                <div className="text-lg font-bold text-white font-mono">{count}</div>
                <div className="text-xs text-slate-400 font-mono tracking-wide">{category.toUpperCase()}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badge Detail Dialog */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedBadge(null)}>
          <div className="bg-slate-900/95 rounded-xl border border-slate-700/50 max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Badge display */}
            <div className="text-center mb-6">
              {/* Platform header */}
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${getPlatformTheme(selectedBadge.platform).platformBg} border ${getPlatformTheme(selectedBadge.platform).border} mb-4`}>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getPlatformTheme(selectedBadge.platform).gradient}`}></div>
                <span className={`text-xs font-mono font-bold ${getPlatformTheme(selectedBadge.platform).accent} tracking-wider`}>
                  {selectedBadge.platform.toUpperCase()}
                </span>
              </div>
              
              <div className="relative inline-block">
                {(() => {
                  const colors = getRarityColors(selectedBadge.rarity);
                  const IconComponent = selectedBadge.icon;
                  
                  return (
                    <div className={`
                      w-28 h-28 rounded-full 
                      bg-gradient-to-br ${getCombinedColors(selectedBadge).gradient}
                      border-4 ${getCombinedColors(selectedBadge).border}
                      ${getCombinedColors(selectedBadge).glow} shadow-2xl
                      flex items-center justify-center
                      mx-auto mb-4
                      before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t before:from-transparent before:via-white/10 before:to-white/20
                    `}>
                      <div className={`w-20 h-20 rounded-full ${getPlatformTheme(selectedBadge.platform).innerBg} flex items-center justify-center border-2 border-slate-600/50 relative z-10`}>
                        <IconComponent className="h-10 w-10 text-white drop-shadow-lg" />
                      </div>
                      
                      {selectedBadge.rarity === 'legendary' && (
                        <div className="absolute inset-0 rounded-full">
                          <Sparkles className="absolute -top-3 -left-3 h-5 w-5 text-yellow-300 animate-pulse drop-shadow-lg" />
                          <Sparkles className="absolute -bottom-3 -right-3 h-5 w-5 text-yellow-300 animate-pulse drop-shadow-lg" style={{ animationDelay: '0.5s' }} />
                          <Sparkles className="absolute top-0 -right-3 h-4 w-4 text-yellow-200 animate-pulse drop-shadow-lg" style={{ animationDelay: '1s' }} />
                          <Sparkles className="absolute -left-3 bottom-0 h-4 w-4 text-yellow-200 animate-pulse drop-shadow-lg" style={{ animationDelay: '1.5s' }} />
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-wider">{selectedBadge.name}</h3>
              <p className="text-slate-300 text-sm mb-4 font-mono">{selectedBadge.description}</p>
            </div>

            {/* Badge details */}
            <div className="space-y-4 bg-slate-950/30 rounded-lg p-4 border border-slate-700/30">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-mono text-sm">RARITY</span>
                <span className={`font-mono text-sm font-bold ${getCombinedColors(selectedBadge).text} uppercase`}>
                  {selectedBadge.rarity}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-mono text-sm">PLATFORM</span>
                <span className={`font-mono text-sm font-bold ${getPlatformColor(selectedBadge.platform)}`}>
                  {selectedBadge.platform}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-mono text-sm">EARNED</span>
                <span className="text-white font-mono text-sm">{selectedBadge.earnedDate}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-mono text-sm">CATEGORY</span>
                <span className="text-cyan-400 font-mono text-sm font-bold">{selectedBadge.category}</span>
              </div>

              {/* Progress bar for streak badges */}
              {selectedBadge.progress && selectedBadge.maxProgress && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 font-mono text-sm">PROGRESS</span>
                    <span className="text-white font-mono text-sm">{selectedBadge.progress}/{selectedBadge.maxProgress}</span>
                  </div>
                  <div className="w-full bg-slate-800/80 rounded-full h-3 border border-slate-700/50">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${getCombinedColors(selectedBadge).gradient} transition-all duration-500`}
                      style={{ width: `${(selectedBadge.progress / selectedBadge.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Achievement unlock animation */}
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/40 rounded-lg">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-yellow-400 font-mono text-sm tracking-wide">ACHIEVEMENT UNLOCKED!</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};