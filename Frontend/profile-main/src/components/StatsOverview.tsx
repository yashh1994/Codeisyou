import React from 'react';
import { Trophy, Target, Zap, Award, Swords, Shield, Sparkles } from 'lucide-react';

export const StatsOverview: React.FC = () => {
  const stats = [
    { 
      icon: Swords, 
      label: 'MONSTERS DEFEATED', 
      value: '1,247', 
      change: '+23 THIS WEEK', 
      color: 'text-red-400',
      bgGradient: 'from-red-400/10 to-orange-400/10',
      description: 'PROBLEMS SOLVED',
      celebration: true
    },
    { 
      icon: Shield, 
      label: 'HUNTER RATING', 
      value: '1,843', 
      change: '+56 THIS MONTH', 
      color: 'text-blue-400',
      bgGradient: 'from-blue-400/10 to-cyan-400/10',
      description: 'CONTEST RATING',
      celebration: false
    },
    { 
      icon: Zap, 
      label: 'POWER LEVEL', 
      value: '15 DAYS', 
      change: 'PERSONAL BEST!', 
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-400/10 to-orange-400/10',
      description: 'CURRENT STREAK',
      celebration: true
    },
    { 
      icon: Trophy, 
      label: 'GUILD RANK', 
      value: '#2,156', 
      change: 'TOP 5%', 
      color: 'text-purple-400',
      bgGradient: 'from-purple-400/10 to-pink-400/10',
      description: 'GLOBAL RANK',
      celebration: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-xl p-6 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 group relative overflow-hidden bg-slate-900/40`}
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Celebration sparkles */}
          {stat.celebration && (
            <div className="absolute top-2 right-2">
              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
            </div>
          )}
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-slate-950/50 ${stat.color} border border-slate-700/30`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                <div className="text-xs text-slate-400 font-mono tracking-wide">{stat.description}</div>
              </div>
            </div>
            
            <h3 className="text-white font-semibold mb-1 font-mono tracking-wider">{stat.label}</h3>
            <p className={`text-sm ${stat.color} font-medium font-mono tracking-wide`}>{stat.change}</p>
            
            {/* Progress indicator */}
            <div className="mt-4 w-full bg-slate-800/50 rounded-full h-1 border border-slate-700/30">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${stat.color.replace('text-', 'from-').replace('-400', '-400')} to-transparent transition-all duration-1000 relative overflow-hidden`}
                style={{ width: `${60 + index * 10}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};