import React from 'react';
import { Code, Settings, BarChart3, LogOut, User } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'settings') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <header className="bg-slate-950/80 backdrop-blur-sm border-b border-slate-700/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-wider font-mono">CODE.TERMINAL</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="font-mono tracking-wide">DASHBOARD</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'settings'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span className="font-mono tracking-wide">SETTINGS</span>
              </button>
            </nav>
            
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/30">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-slate-300 font-mono text-sm">ALEX_CHEN</span>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};