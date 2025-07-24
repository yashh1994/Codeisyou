import React, { useState } from 'react';
import { Save, Eye, EyeOff, Plus, Trash2, CheckCircle, AlertCircle, Loader2, ExternalLink, Copy, Info, Shield, Key, Globe } from 'lucide-react';

interface Platform {
  id: number;
  name: string;
  username: string;
  connected: boolean;
  lastSync: string;
  isConnecting?: boolean;
  setupSteps?: string[];
  apiType: 'username' | 'cookie' | 'api_key';
  instructions: string[];
  securityNote: string;
}

export const PlatformSettings: React.FC = () => {
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});
  const [expandedInstructions, setExpandedInstructions] = useState<{[key: string]: boolean}>({});
  const [platforms, setPlatforms] = useState<Platform[]>([
    { 
      id: 1, 
      name: 'LeetCode', 
      username: 'john_doe', 
      connected: true, 
      lastSync: '2024-01-14 10:30 AM',
      apiType: 'cookie',
      instructions: [
        'Open LeetCode in your browser and log in to your account',
        'Press F12 to open Developer Tools',
        'Go to the "Application" tab (Chrome) or "Storage" tab (Firefox)',
        'Find "Cookies" in the left sidebar and click on "https://leetcode.com"',
        'Look for the "LEETCODE_SESSION" cookie and copy its value',
        'Paste the cookie value in the field below'
      ],
      securityNote: 'Your session cookie is encrypted and stored securely. We only use it to fetch your public profile data.'
    },
    { 
      id: 2, 
      name: 'Codeforces', 
      username: 'johndoe123', 
      connected: false, 
      lastSync: 'Never',
      apiType: 'username',
      instructions: [
        'Simply enter your Codeforces username/handle',
        'Your profile must be public to fetch data',
        'Go to your Codeforces profile settings',
        'Ensure "Show my submissions to other users" is enabled',
        'No authentication required - we use public API'
      ],
      securityNote: 'Only your public profile data is accessed. No login credentials needed.'
    },
    { 
      id: 3, 
      name: 'HackerRank', 
      username: 'john.doe', 
      connected: false, 
      lastSync: 'Never',
      apiType: 'cookie',
      instructions: [
        'Log in to your HackerRank account',
        'Open Developer Tools (F12)',
        'Go to Network tab and refresh the page',
        'Find any request to hackerrank.com',
        'Copy the "Cookie" header value from the request',
        'Paste it in the authentication field below'
      ],
      securityNote: 'Session data is encrypted. We only access your coding statistics and achievements.'
    },
    { 
      id: 4, 
      name: 'CodeChef', 
      username: 'john_doe_chef', 
      connected: true, 
      lastSync: '2024-01-13 11:45 PM',
      apiType: 'username',
      instructions: [
        'Enter your CodeChef username',
        'Ensure your profile is set to public',
        'Go to your CodeChef profile page',
        'Check that your ratings and submissions are visible',
        'No additional authentication required'
      ],
      securityNote: 'Public API access only. Your private data remains secure.'
    },
    {
      id: 5,
      name: 'AtCoder',
      username: '',
      connected: false,
      lastSync: 'Never',
      apiType: 'username',
      instructions: [
        'Enter your AtCoder username',
        'Your profile must be public to fetch contest data',
        'We fetch ratings, contest history, and problem statistics',
        'No login credentials required'
      ],
      securityNote: 'Only public contest and rating data is accessed.'
    }
  ]);

  const togglePasswordVisibility = (platformId: number) => {
    setShowPasswords(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  const toggleInstructions = (platformId: number) => {
    setExpandedInstructions(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  const handleConnect = async (platformId: number) => {
    setPlatforms(prev => prev.map(p => 
      p.id === platformId 
        ? { ...p, isConnecting: true }
        : p
    ));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));

    setPlatforms(prev => prev.map(p => 
      p.id === platformId 
        ? { ...p, connected: true, lastSync: new Date().toLocaleString(), isConnecting: false }
        : p
    ));
  };

  const handleDisconnect = (platformId: number) => {
    setPlatforms(prev => prev.map(p => 
      p.id === platformId 
        ? { ...p, connected: false, lastSync: 'Never' }
        : p
    ));
  };

  const getApiTypeIcon = (type: string) => {
    switch (type) {
      case 'username': return <Globe className="h-4 w-4" />;
      case 'cookie': return <Key className="h-4 w-4" />;
      case 'api_key': return <Shield className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getApiTypeLabel = (type: string) => {
    switch (type) {
      case 'username': return 'PUBLIC USERNAME';
      case 'cookie': return 'SESSION COOKIE';
      case 'api_key': return 'API KEY';
      default: return 'AUTHENTICATION';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
        <h2 className="text-2xl font-bold text-white mb-2 font-mono tracking-wider">PLATFORM SETTINGS</h2>
        <p className="text-slate-400 font-mono text-sm">CONFIGURE YOUR CODING PLATFORM CONNECTIONS</p>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <div key={platform.id} className="bg-slate-900/40 rounded-xl p-6 border border-slate-700/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-white font-mono tracking-wider">{platform.name}</h3>
                <div className="flex items-center space-x-2">
                  {platform.isConnecting ? (
                    <Loader2 className="h-5 w-5 text-cyan-400 animate-spin" />
                  ) : platform.connected ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span className={`text-sm font-mono ${
                    platform.isConnecting ? 'text-cyan-400' :
                    platform.connected ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {platform.isConnecting ? 'CONNECTING...' :
                     platform.connected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-300 font-mono">LAST SYNC</div>
                <div className="text-xs text-slate-400 font-mono">{platform.lastSync}</div>
              </div>
            </div>

            {/* API Type Badge */}
            <div className="flex items-center space-x-2 mb-4">
              {getApiTypeIcon(platform.apiType)}
              <span className="text-xs text-slate-400 font-mono tracking-wide">
                {getApiTypeLabel(platform.apiType)}
              </span>
            </div>
            
            {/* Setup Instructions */}
            <div className="mb-4">
              <button
                onClick={() => toggleInstructions(platform.id)}
                className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm"
              >
                <Info className="h-4 w-4" />
                <span>SETUP INSTRUCTIONS</span>
              </button>
              
              {expandedInstructions[platform.id] && (
                <div className="mt-3 bg-slate-950/30 rounded-lg p-4 border border-slate-700/30">
                  <ol className="space-y-2 text-sm text-slate-300">
                    {platform.instructions.map((step, index) => (
                      <li key={index} className="flex space-x-3 font-mono">
                        <span className="text-cyan-400 font-bold">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  
                  <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <div className="flex items-start space-x-2">
                      <Shield className="h-4 w-4 text-blue-400 mt-0.5" />
                      <div>
                        <div className="text-blue-300 font-mono text-xs font-semibold">SECURITY NOTE</div>
                        <div className="text-blue-200 text-xs font-mono mt-1">{platform.securityNote}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-mono tracking-wide">
                  USERNAME
                </label>
                <input
                  type="text"
                  value={platform.username}
                  className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                  placeholder="Enter username"
                />
              </div>
              
              {platform.apiType !== 'username' && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 font-mono tracking-wide">
                    {platform.apiType === 'cookie' ? 'SESSION COOKIE' : 'API KEY'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords[platform.id] ? 'text' : 'password'}
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-2 pr-20 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
                      placeholder={`Enter ${platform.apiType === 'cookie' ? 'session cookie' : 'API key'}`}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <button
                        type="button"
                        className="text-slate-400 hover:text-white p-1"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(platform.id)}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        {showPasswords[platform.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex space-x-3">
                <button
                  onClick={() => handleConnect(platform.id)}
                  disabled={platform.connected || platform.isConnecting}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-mono text-sm ${
                    platform.connected || platform.isConnecting
                      ? 'bg-slate-600/50 text-slate-400 cursor-not-allowed'
                      : 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-500/25'
                  }`}
                >
                  {platform.isConnecting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>
                    {platform.isConnecting ? 'CONNECTING...' :
                     platform.connected ? 'CONNECTED' : 'CONNECT'}
                  </span>
                </button>
                
                {platform.connected && !platform.isConnecting && (
                  <button
                    onClick={() => handleDisconnect(platform.id)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600/80 text-white hover:bg-red-700 transition-all font-mono text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>DISCONNECT</span>
                  </button>
                )}
              </div>
              
              <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium font-mono flex items-center space-x-1">
                <ExternalLink className="h-3 w-3" />
                <span>TEST CONNECTION</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add New Platform */}
      <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
        <h4 className="text-cyan-300 font-medium mb-2 font-mono tracking-wider">ADD NEW PLATFORM</h4>
        <p className="text-cyan-200 text-sm mb-4 font-mono">
          WANT TO ADD SUPPORT FOR ANOTHER CODING PLATFORM? LET US KNOW WHICH ONE YOU'D LIKE TO SEE!
        </p>
        <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all font-mono text-sm shadow-lg shadow-cyan-500/25">
          <Plus className="h-4 w-4" />
          <span>REQUEST PLATFORM</span>
        </button>
      </div>
      
      {/* Sync Settings */}
      <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
        <h3 className="text-lg font-semibold text-white mb-4 font-mono tracking-wider">SYNC SETTINGS</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium font-mono">AUTO-SYNC</h4>
              <p className="text-sm text-slate-400 font-mono">AUTOMATICALLY FETCH LATEST DATA EVERY HOUR</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium font-mono">DATA RETENTION</h4>
              <p className="text-sm text-slate-400 font-mono">KEEP HISTORICAL DATA FOR ANALYTICS</p>
            </div>
            <select className="bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 font-mono text-sm">
              <option>30 DAYS</option>
              <option>90 DAYS</option>
              <option>1 YEAR</option>
              <option>FOREVER</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium font-mono">SYNC FREQUENCY</h4>
              <p className="text-sm text-slate-400 font-mono">HOW OFTEN TO UPDATE YOUR DATA</p>
            </div>
            <select className="bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 font-mono text-sm">
              <option>EVERY HOUR</option>
              <option>EVERY 6 HOURS</option>
              <option>DAILY</option>
              <option>MANUAL ONLY</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};