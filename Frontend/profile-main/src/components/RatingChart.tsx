import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

export const RatingChart: React.FC = () => {
  const ratingHistory = [
    { date: '2024-01-01', leetcode: 1650, codeforces: 1400, hackerrank: 2000, codechef: 1700 },
    { date: '2024-01-15', leetcode: 1680, codeforces: 1450, hackerrank: 2050, codechef: 1720 },
    { date: '2024-02-01', leetcode: 1720, codeforces: 1500, hackerrank: 2100, codechef: 1750 },
    { date: '2024-02-15', leetcode: 1760, codeforces: 1520, hackerrank: 2120, codechef: 1780 },
    { date: '2024-03-01', leetcode: 1800, codeforces: 1567, hackerrank: 2156, codechef: 1823 },
    { date: '2024-03-15', leetcode: 1843, codeforces: 1580, hackerrank: 2180, codechef: 1850 }
  ];

  const platforms = [
    { name: 'LeetCode', color: 'rgb(255, 161, 22)', key: 'leetcode' },
    { name: 'Codeforces', color: 'rgb(59, 130, 246)', key: 'codeforces' },
    { name: 'HackerRank', color: 'rgb(16, 185, 129)', key: 'hackerrank' },
    { name: 'CodeChef', color: 'rgb(245, 158, 11)', key: 'codechef' }
  ];

  const maxRating = Math.max(...ratingHistory.flatMap(h => [h.leetcode, h.codeforces, h.hackerrank, h.codechef]));
  const minRating = Math.min(...ratingHistory.flatMap(h => [h.leetcode, h.codeforces, h.hackerrank, h.codechef]));

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white font-mono tracking-wider">RATING PROGRESS</h3>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Calendar className="h-4 w-4" />
          <span className="font-mono tracking-wide">LAST 6 MONTHS</span>
        </div>
      </div>

      {/* Chart area */}
      <div className="relative h-64 mb-6">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 50}
              x2="400"
              y2={i * 50}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Platform lines */}
          {platforms.map((platform) => {
            const points = ratingHistory.map((data, index) => {
              const x = (index / (ratingHistory.length - 1)) * 380 + 10;
              const rating = data[platform.key as keyof typeof data] as number;
              const y = 180 - ((rating - minRating) / (maxRating - minRating)) * 160;
              return `${x},${y}`;
            }).join(' ');

            return (
              <g key={platform.key}>
                {/* Line */}
                <polyline
                  points={points}
                  fill="none"
                  stroke={platform.color}
                  strokeWidth="3"
                  className="drop-shadow-lg"
                />
                {/* Points */}
                {ratingHistory.map((data, index) => {
                  const x = (index / (ratingHistory.length - 1)) * 380 + 10;
                  const rating = data[platform.key as keyof typeof data] as number;
                  const y = 180 - ((rating - minRating) / (maxRating - minRating)) * 160;
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill={platform.color}
                      className="drop-shadow-lg hover:r-6 transition-all cursor-pointer"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-12">
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 -ml-12 font-mono">
            <span>{maxRating}</span>
            <span>{Math.round((maxRating + minRating) / 2)}</span>
            <span>{minRating}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <div key={platform.key} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: platform.color }}
            />
            <span className="text-sm text-slate-300 font-mono">{platform.name}</span>
            <span className="text-sm font-semibold text-white ml-auto font-mono">
              {ratingHistory[ratingHistory.length - 1][platform.key as keyof typeof ratingHistory[0]]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};