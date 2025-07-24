import React from 'react';
import { UserProfile } from './UserProfile';
import { StatsOverview } from './StatsOverview';
import { PlatformCards } from './PlatformCards';
import { ActivityHeatmap } from './ActivityHeatmap';
import { ContestHistory } from './ContestHistory';
import { SolvingTrends } from './SolvingTrends';
import { RatingChart } from './RatingChart';
import { AvatarProfile } from './AvatarProfile';
import { SkillRadar } from './SkillRadar';
import { BadgeCollection } from './BadgeCollection';
import { User, TrendingUp, Calendar, Trophy, Target, Brain } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const sections = [
    {
      id: 'profile',
      title: 'HUNTER PROFILE',
      icon: User,
      description: 'Your coding journey and achievements'
    },
    {
      id: 'platforms',
      title: 'PLATFORM STATS',
      icon: Target,
      description: 'Performance across different coding platforms'
    },
    {
      id: 'analytics',
      title: 'PERFORMANCE ANALYTICS',
      icon: TrendingUp,
      description: 'Rating trends and skill development'
    },
    {
      id: 'activity',
      title: 'ACTIVITY TRACKING',
      icon: Calendar,
      description: 'Daily coding activity and progress patterns'
    },
    {
      id: 'contests',
      title: 'CONTEST HISTORY',
      icon: Trophy,
      description: 'Recent contest performances and rankings'
    }
  ];

  return (
    <div className="space-y-12">
      {/* User Profile Section */}
      <UserProfile />

      {/* Profile Section */}
      <section id="profile" className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-cyan-600/20 rounded-lg border border-cyan-500/30">
            <User className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-mono tracking-wider">HUNTER PROFILE</h2>
            <p className="text-slate-400 font-mono text-sm">YOUR CODING JOURNEY AND ACHIEVEMENTS</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StatsOverview />
          </div>
          <AvatarProfile />
        </div>
        
        <BadgeCollection />
      </section>

      {/* Platform Stats Section */}
      <section id="platforms" className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-600/20 rounded-lg border border-purple-500/30">
            <Target className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-mono tracking-wider">PLATFORM STATS</h2>
            <p className="text-slate-400 font-mono text-sm">PERFORMANCE ACROSS DIFFERENT CODING PLATFORMS</p>
          </div>
        </div>
        
        <PlatformCards />
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-600/20 rounded-lg border border-green-500/30">
            <TrendingUp className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-mono tracking-wider">PERFORMANCE ANALYTICS</h2>
            <p className="text-slate-400 font-mono text-sm">RATING TRENDS AND SKILL DEVELOPMENT</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RatingChart />
          <SkillRadar />
        </div>
      </section>

      {/* Activity Section */}
      <section id="activity" className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-orange-600/20 rounded-lg border border-orange-500/30">
            <Calendar className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-mono tracking-wider">ACTIVITY TRACKING</h2>
            <p className="text-slate-400 font-mono text-sm">DAILY CODING ACTIVITY AND PROGRESS PATTERNS</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ActivityHeatmap />
          <SolvingTrends />
        </div>
      </section>

      {/* Contest History Section */}
      <section id="contests" className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-yellow-600/20 rounded-lg border border-yellow-500/30">
            <Trophy className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-mono tracking-wider">CONTEST HISTORY</h2>
            <p className="text-slate-400 font-mono text-sm">RECENT CONTEST PERFORMANCES AND RANKINGS</p>
          </div>
        </div>
        
        <ContestHistory />
      </section>

      {/* Quick Navigation */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden xl:block">
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-3 border border-slate-700/30 space-y-2">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-cyan-600/20 transition-all group"
                title={section.title}
              >
                <IconComponent className="h-5 w-5 text-slate-400 group-hover:text-cyan-400" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};