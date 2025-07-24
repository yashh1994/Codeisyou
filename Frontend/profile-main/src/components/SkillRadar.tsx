import React from 'react';
import { Brain, Code, Zap, Target, Trophy, Star } from 'lucide-react';

export const SkillRadar: React.FC = () => {
  const skills = [
    { name: 'Algorithms', value: 85, icon: Brain, color: 'rgb(59, 130, 246)' },
    { name: 'Data Structures', value: 78, icon: Code, color: 'rgb(16, 185, 129)' },
    { name: 'Dynamic Programming', value: 72, icon: Zap, color: 'rgb(245, 158, 11)' },
    { name: 'Graph Theory', value: 68, icon: Target, color: 'rgb(139, 92, 246)' },
    { name: 'Mathematics', value: 75, icon: Trophy, color: 'rgb(236, 72, 153)' },
    { name: 'Implementation', value: 82, icon: Star, color: 'rgb(34, 197, 94)' }
  ];

  const centerX = 120;
  const centerY = 120;
  const radius = 80;

  // Calculate points for the radar chart
  const getPoint = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance
    };
  };

  const getAxisPoint = (index: number) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    };
  };

  const skillPoints = skills.map((skill, index) => getPoint(index, skill.value));
  const pathData = skillPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white font-mono tracking-wider">SKILL RADAR</h3>
      </div>

      <div className="flex items-center justify-center mb-6">
        <svg width="240" height="240" className="drop-shadow-lg">
          {/* Background circles */}
          {[20, 40, 60, 80].map((r) => (
            <circle
              key={r}
              cx={centerX}
              cy={centerY}
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Axis lines */}
          {skills.map((_, index) => {
            const point = getAxisPoint(index);
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={point.x}
                y2={point.y}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Skill area */}
          <path
            d={pathData}
            fill="rgba(34, 211, 238, 0.15)"
            stroke="rgb(34, 211, 238)"
            strokeWidth="2"
            className="drop-shadow-lg"
          />
          
          {/* Skill points */}
          {skills.map((skill, index) => {
            const point = getPoint(index, skill.value);
            return (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill={skill.color}
                className="drop-shadow-lg"
              />
            );
          })}
          
          {/* Skill labels */}
          {skills.map((skill, index) => {
            const axisPoint = getAxisPoint(index);
            const labelX = centerX + Math.cos((index * 2 * Math.PI) / skills.length - Math.PI / 2) * (radius + 20);
            const labelY = centerY + Math.sin((index * 2 * Math.PI) / skills.length - Math.PI / 2) * (radius + 20);
            
            return (
              <text
                key={index}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-slate-300 font-medium font-mono"
              >
                {skill.name}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Skill breakdown */}
      <div className="space-y-3">
        {skills.map((skill, index) => {
          const IconComponent = skill.icon;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconComponent className="h-4 w-4" style={{ color: skill.color }} />
                <span className="text-sm text-slate-300 font-mono">{skill.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-slate-800 rounded-full h-2 border border-slate-700/50">
                  <div
                    className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ 
                      width: `${skill.value}%`,
                      backgroundColor: skill.color
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-white w-8 font-mono">{skill.value}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};