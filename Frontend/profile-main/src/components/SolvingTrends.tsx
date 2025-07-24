import React from 'react';
import { TrendingUp } from 'lucide-react';

export const SolvingTrends: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', problems: 45, rating: 1650 },
    { month: 'Feb', problems: 52, rating: 1680 },
    { month: 'Mar', problems: 48, rating: 1720 },
    { month: 'Apr', problems: 63, rating: 1760 },
    { month: 'May', problems: 58, rating: 1800 },
    { month: 'Jun', problems: 71, rating: 1843 }
  ];

  const maxProblems = Math.max(...monthlyData.map(d => d.problems));
  const maxRating = Math.max(...monthlyData.map(d => d.rating));
  const minRating = Math.min(...monthlyData.map(d => d.rating));

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-5 w-5 text-green-400" />
        <h3 className="text-lg font-semibold text-white font-mono tracking-wider">SOLVING TRENDS</h3>
      </div>
      
      <div className="space-y-4">
        {monthlyData.map((data, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <span className="text-sm text-slate-300 w-8 font-mono">{data.month}</span>
              <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-400 h-full transition-all duration-300 relative overflow-hidden"
                  style={{ width: `${(data.problems / maxProblems) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <span className="text-sm text-white w-8 font-mono">{data.problems}</span>
            </div>
            <div className="ml-6 text-right">
              <div className="text-sm text-slate-300 font-mono">RATING</div>
              <div className="text-sm font-semibold text-white font-mono">{data.rating}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-slate-950/30 rounded-lg p-4 border border-slate-700/30">
          <div className="text-sm text-slate-300 font-mono">THIS MONTH</div>
          <div className="text-2xl font-bold text-white font-mono">71</div>
          <div className="text-xs text-green-400 font-mono">+13 FROM LAST MONTH</div>
        </div>
        <div className="bg-slate-950/30 rounded-lg p-4 border border-slate-700/30">
          <div className="text-sm text-slate-300 font-mono">AVG/MONTH</div>
          <div className="text-2xl font-bold text-white font-mono">56</div>
          <div className="text-xs text-cyan-400 font-mono">+8 FROM Q1</div>
        </div>
      </div>
    </div>
  );
};