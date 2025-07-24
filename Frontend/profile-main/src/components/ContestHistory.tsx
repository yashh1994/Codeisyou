import React from 'react';
import { Trophy, Medal, Award, Target } from 'lucide-react';

export const ContestHistory: React.FC = () => {
  const contests = [
    {
      name: 'LeetCode Weekly Contest 372',
      date: '2024-01-14',
      rank: 156,
      rating: 1943,
      change: +23,
      platform: 'LeetCode',
      participants: 12847
    },
    {
      name: 'Codeforces Round 918',
      date: '2024-01-12',
      rank: 1234,
      rating: 1567,
      change: -12,
      platform: 'Codeforces',
      participants: 8934
    },
    {
      name: 'CodeChef January Long',
      date: '2024-01-10',
      rank: 89,
      rating: 1823,
      change: +34,
      platform: 'CodeChef',
      participants: 5643
    },
    {
      name: 'HackerRank Weekly',
      date: '2024-01-08',
      rank: 45,
      rating: 2156,
      change: +18,
      platform: 'HackerRank',
      participants: 3421
    }
  ];

  const getRankIcon = (rank: number, participants: number) => {
    const percentage = (rank / participants) * 100;
    if (percentage <= 1) return <Trophy className="h-4 w-4 text-yellow-400" />;
    if (percentage <= 5) return <Medal className="h-4 w-4 text-gray-300" />;
    if (percentage <= 10) return <Award className="h-4 w-4 text-orange-400" />;
    return <Target className="h-4 w-4 text-blue-400" />;
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      'LeetCode': 'from-orange-500 to-red-500',
      'Codeforces': 'from-blue-500 to-purple-500',
      'HackerRank': 'from-green-500 to-teal-500',
      'CodeChef': 'from-yellow-500 to-orange-500'
    };
    return colors[platform as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-white font-mono tracking-wider">RECENT CONTESTS</h3>
      </div>
      
      <div className="space-y-4">
        {contests.map((contest, index) => (
          <div key={index} className="bg-slate-950/30 rounded-lg p-4 hover:bg-slate-950/50 transition-all border border-slate-700/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getPlatformColor(contest.platform)} flex items-center justify-center`}>
                  {getRankIcon(contest.rank, contest.participants)}
                </div>
                <div>
                  <h4 className="text-white font-medium font-mono">{contest.name}</h4>
                  <p className="text-sm text-slate-400 font-mono">{contest.platform}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-300 font-mono">{contest.date}</div>
                <div className={`text-sm font-semibold font-mono ${contest.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {contest.change >= 0 ? '+' : ''}{contest.change}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <div className="text-xs text-slate-400 font-mono">RANK</div>
                <div className="text-lg font-semibold text-white font-mono">#{contest.rank}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">RATING</div>
                <div className="text-lg font-semibold text-white font-mono">{contest.rating}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">PARTICIPANTS</div>
                <div className="text-lg font-semibold text-white font-mono">{contest.participants.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};