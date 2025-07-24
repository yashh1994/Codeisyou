import React from 'react';
import { ExternalLink, Star, Users, Calendar } from 'lucide-react';

export const PlatformCards: React.FC = () => {
  const platforms = [
    {
      name: 'LeetCode',
      color: 'from-orange-400 to-red-400',
      problems: 856,
      rating: 1943,
      rank: '#1,234',
      streak: '12 days',
      badges: 5,
      contests: 23,
      languages: ['Python', 'JavaScript', 'Java']
    },
    {
      name: 'Codeforces',
      color: 'from-blue-400 to-purple-400',
      problems: 234,
      rating: 1567,
      rank: '#3,456',
      streak: '8 days',
      badges: 3,
      contests: 45,
      languages: ['C++', 'Python', 'Java']
    },
    {
      name: 'HackerRank',
      color: 'from-green-400 to-teal-400',
      problems: 89,
      rating: 2156,
      rank: '#789',
      streak: '15 days',
      badges: 12,
      contests: 8,
      languages: ['Python', 'JavaScript', 'Go']
    },
    {
      name: 'CodeChef',
      color: 'from-yellow-400 to-orange-400',
      problems: 68,
      rating: 1823,
      rank: '#2,345',
      streak: '6 days',
      badges: 4,
      contests: 15,
      languages: ['C++', 'Python', 'TypeScript']
    }
  ];

  const getLanguageColor = (language: string) => {
    const colors = {
      'Python': 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30',
      'JavaScript': 'bg-yellow-400/20 text-yellow-300 border-yellow-300/30',
      'Java': 'bg-orange-500/20 text-orange-400 border-orange-400/30',
      'C++': 'bg-blue-500/20 text-blue-400 border-blue-400/30',
      'TypeScript': 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30',
      'Go': 'bg-green-500/20 text-green-400 border-green-400/30'
    };
    return colors[language as keyof typeof colors] || 'bg-slate-500/20 text-slate-400 border-slate-400/30';
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {platforms.map((platform, index) => (
        <div key={index} className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white font-mono tracking-wider">{platform.name}</h3>
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
              <ExternalLink className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950/30 rounded-lg p-4 border border-slate-700/30">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-slate-300 font-mono">PROBLEMS</span>
              </div>
              <p className="text-2xl font-bold text-white font-mono">{platform.problems}</p>
            </div>
            
            <div className="bg-slate-950/30 rounded-lg p-4 border border-slate-700/30">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-300 font-mono">RATING</span>
              </div>
              <p className="text-2xl font-bold text-white font-mono">{platform.rating}</p>
            </div>
            
            <div className="bg-slate-950/30 rounded-lg p-4 border border-slate-700/30">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-green-400" />
                <span className="text-sm text-slate-300 font-mono">STREAK</span>
              </div>
              <p className="text-2xl font-bold text-white font-mono">{platform.streak}</p>
            </div>
            
            <div className="bg-slate-950/30 rounded-lg p-4 border border-slate-700/30">
              <div className="flex items-center space-x-2 mb-2">
                <ExternalLink className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-slate-300 font-mono">RANK</span>
              </div>
              <p className="text-2xl font-bold text-white font-mono">{platform.rank}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700/30">
            <span className="text-sm text-slate-300 font-mono">{platform.badges} BADGES</span>
            <span className="text-sm text-slate-300 font-mono">{platform.contests} CONTESTS</span>
          </div>
          
          {/* Programming Languages */}
          <div className="mt-4 pt-4 border-t border-slate-700/30">
            <div className="text-xs text-slate-400 font-mono mb-2 tracking-wide">LANGUAGES USED</div>
            <div className="flex flex-wrap gap-2">
              {platform.languages.map((language, langIndex) => (
                <div key={langIndex} className={`px-2 py-1 rounded-full border text-xs font-mono font-medium ${getLanguageColor(language)}`}>
                  {language}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};