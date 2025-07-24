import React, { useState } from 'react';
import { Calendar, Flame } from 'lucide-react';

export const ActivityHeatmap: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<any>(null);
  
  // Generate mock data for the last 365 days
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const intensity = Math.floor(Math.random() * 5); // 0-4 intensity levels
      const problems = intensity * Math.floor(Math.random() * 8) + intensity;
      
      data.push({
        date: date.toISOString().split('T')[0],
        count: problems,
        intensity: intensity,
        platforms: intensity > 0 ? ['LeetCode', 'Codeforces', 'HackerRank'].slice(0, Math.floor(Math.random() * 3) + 1) : []
      });
    }
    
    return data;
  };

  const heatmapData = generateHeatmapData();
  const totalProblems = heatmapData.reduce((sum, day) => sum + day.count, 0);
  
  // Calculate current streak (consecutive days with activity from the end)
  const reversedData = [...heatmapData].reverse();
  let currentStreak = 0;
  for (const day of reversedData) {
    if (day.count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  const getIntensityColor = (intensity: number) => {
    const colors = [
      'bg-slate-800/50 border-slate-700/50', // 0
      'bg-cyan-900/80 border-cyan-800/60 shadow-cyan-900/20', // 1
      'bg-cyan-700/80 border-cyan-600/60 shadow-cyan-700/30', // 2
      'bg-cyan-500/80 border-cyan-400/60 shadow-cyan-500/40', // 3
      'bg-cyan-300/80 border-cyan-200/60 shadow-cyan-300/50' // 4
    ];
    return colors[intensity];
  };

  const getIntensityGlow = (intensity: number) => {
    if (intensity === 0) return '';
    return `shadow-sm hover:shadow-md hover:scale-110`;
  };

  // Group data by weeks for proper grid layout
  const getWeeksData = () => {
    const weeks = [];
    const startDate = new Date(heatmapData[0].date);
    const startDay = startDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Add empty cells for the first week if needed
    const firstWeek = new Array(startDay).fill(null);
    
    let currentWeek = [...firstWeek];
    
    heatmapData.forEach((day, index) => {
      currentWeek.push(day);
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    // Add remaining days to the last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  const weeksData = getWeeksData();
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white font-mono tracking-wider">CODING ACTIVITY</h3>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400 font-mono tracking-wide">CURRENT STREAK</div>
          <div className="text-lg font-bold text-orange-400 font-mono">{currentStreak} DAYS</div>
        </div>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-950/30 rounded-lg p-3 text-center border border-slate-700/30">
          <div className="text-lg font-bold text-white font-mono">{totalProblems}</div>
          <div className="text-xs text-slate-400 font-mono tracking-wide">TOTAL PROBLEMS</div>
        </div>
        <div className="bg-slate-950/30 rounded-lg p-3 text-center border border-slate-700/30">
          <div className="text-lg font-bold text-white font-mono">{Math.round(totalProblems / 365)}</div>
          <div className="text-xs text-slate-400 font-mono tracking-wide">DAILY AVERAGE</div>
        </div>
        <div className="bg-slate-950/30 rounded-lg p-3 text-center border border-slate-700/30">
          <div className="text-lg font-bold text-white font-mono">{heatmapData.filter(d => d.count > 0).length}</div>
          <div className="text-xs text-slate-400 font-mono tracking-wide">ACTIVE DAYS</div>
        </div>
      </div>
      
      {/* Month labels */}
      <div className="flex justify-between mb-2 px-4">
        {monthLabels.map((month, index) => (
          <span key={index} className="text-xs text-slate-400 font-mono">{month}</span>
        ))}
      </div>
      
      {/* Heatmap container */}
      <div className="overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {/* Day labels */}
          <div className="flex flex-col space-y-1 mr-2">
            <div className="h-3"></div> {/* Spacer for month labels */}
            {dayLabels.map((day, index) => (
              <div key={index} className="h-3 flex items-center">
                <span className="text-xs text-slate-400 w-8 font-mono">{index % 2 === 1 ? day : ''}</span>
              </div>
            ))}
          </div>
          
          {/* Heatmap grid */}
          <div className="flex space-x-1">
            {weeksData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm border transition-all duration-200 cursor-pointer ${
                      day 
                        ? `${getIntensityColor(day.intensity)} ${getIntensityGlow(day.intensity)}`
                        : 'bg-transparent'
                    }`}
                    title={day ? `${day.date}: ${day.count} problems solved` : ''}
                    onMouseEnter={() => day && setSelectedDay(day)}
                    onMouseLeave={() => setSelectedDay(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend and selected day info */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <span className="text-xs text-slate-400 font-mono">LESS</span>
          <div className="flex items-center space-x-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`w-3 h-3 rounded-sm border ${getIntensityColor(level)}`} />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-mono">MORE</span>
        </div>
        
        {selectedDay && (
          <div className="bg-slate-950/60 rounded-lg p-2 text-xs border border-slate-700/30">
            <div className="text-white font-medium font-mono">{selectedDay.date}</div>
            <div className="text-slate-300 font-mono">{selectedDay.count} PROBLEMS</div>
            {selectedDay.platforms.length > 0 && (
              <div className="text-slate-400 font-mono text-xs">{selectedDay.platforms.join(', ')}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};