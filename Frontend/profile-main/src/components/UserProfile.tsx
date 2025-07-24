import React from 'react';
import { Github, Linkedin, Globe, MapPin, Calendar, ExternalLink, Mail, Code2, Brain, TrendingUp, AlertTriangle, Target, Sparkles, Loader2 } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const [showAiAnalysis, setShowAiAnalysis] = React.useState(false);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = React.useState(false);

  const profileData = {
    name: 'Alex Chen',
    username: 'alexchen_dev',
    bio: 'Computer Science student passionate about competitive programming and full-stack development. Building the future one algorithm at a time.',
    college: 'Stanford University',
    currentYear: 'Junior (3rd Year)',
    location: 'Palo Alto, CA',
    joinDate: 'January 2022',
    github: 'https://github.com/alexchen',
    linkedin: 'https://linkedin.com/in/alexchen',
    resume: 'https://alexchen.dev/resume.pdf',
    portfolio: 'https://alexchen.dev',
    email: 'alex.chen@stanford.edu'
  };

  const programmingLanguages = [
    { name: 'Python', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30' },
    { name: 'JavaScript', color: 'bg-yellow-400/20 text-yellow-300 border-yellow-300/30' },
    { name: 'Java', color: 'bg-orange-500/20 text-orange-400 border-orange-400/30' },
    { name: 'C++', color: 'bg-blue-500/20 text-blue-400 border-blue-400/30' },
    { name: 'TypeScript', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30' },
    { name: 'Go', color: 'bg-green-500/20 text-green-400 border-green-400/30' },
    { name: 'React', color: 'bg-blue-400/20 text-blue-300 border-blue-300/30' },
    { name: 'Node.js', color: 'bg-green-400/20 text-green-300 border-green-300/30' }
  ];

  const aiSummary = {
    strengths: [
      'Exceptional problem-solving skills with 1,247+ problems solved',
      'Strong performance in algorithmic contests (Top 5% globally)',
      'Consistent daily coding practice with 15-day active streak',
      'Well-rounded skill set across multiple programming languages'
    ],
    weaknesses: [
      'Graph theory concepts need improvement (68% proficiency)',
      'Dynamic programming optimization could be enhanced',
      'Contest performance varies significantly between platforms'
    ],
    recommendations: [
      'Focus on advanced graph algorithms and network flow problems',
      'Practice more DP optimization techniques and state compression',
      'Participate in weekly contests to improve consistency',
      'Explore competitive programming in C++ for better performance'
    ]
  };

  const socialLinks = [
    { name: 'GitHub', url: profileData.github, icon: Github, color: 'text-slate-300 hover:text-white' },
    { name: 'LinkedIn', url: profileData.linkedin, icon: Linkedin, color: 'text-blue-400 hover:text-blue-300' },
    { name: 'Portfolio', url: profileData.portfolio, icon: Globe, color: 'text-green-400 hover:text-green-300' },
    { name: 'Resume', url: profileData.resume, icon: ExternalLink, color: 'text-purple-400 hover:text-purple-300' },
    { name: 'Email', url: `mailto:${profileData.email}`, icon: Mail, color: 'text-orange-400 hover:text-orange-300' }
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-transparent to-blue-600/5"></div>
      
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-slate-950/30 rounded-lg p-6 border border-slate-700/30">
              <div className="flex items-start space-x-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-1 shadow-lg shadow-cyan-500/30">
                    <div className="w-full h-full rounded-full bg-slate-950/90 flex items-center justify-center text-3xl font-bold text-white font-mono">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Name and Bio */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1 font-mono tracking-wider">{profileData.name}</h3>
                  <p className="text-cyan-400 mb-3 font-mono">@{profileData.username}</p>
                  <p className="text-slate-300 leading-relaxed font-mono text-sm mb-4">{profileData.bio}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    {profileData.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="font-mono">{profileData.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-mono">JOINED {profileData.joinDate.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Programming Languages */}
            <div className="bg-slate-950/30 rounded-lg p-6 border border-slate-700/30">
              <h4 className="text-lg font-semibold text-white mb-4 font-mono tracking-wider">PROGRAMMING LANGUAGES</h4>
              <div className="flex flex-wrap gap-3">
                {programmingLanguages.map((lang, index) => (
                  <div key={index} className={`px-3 py-2 rounded-lg border ${lang.color} font-mono text-sm font-medium transition-all hover:scale-105 cursor-default`}>
                    {lang.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-slate-950/30 rounded-lg p-6 border border-slate-700/30">
              <h4 className="text-lg font-semibold text-white mb-4 font-mono tracking-wider">LINKS</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all border border-slate-600/50 ${link.color} font-mono text-sm group`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{link.name.toUpperCase()}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Education & Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            <div className="bg-slate-950/30 rounded-lg p-6 border border-slate-700/30">
              <h4 className="text-lg font-semibold text-white mb-4 font-mono tracking-wider">EDUCATION</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-white font-semibold font-mono">{profileData.college}</div>
                  <div className="text-sm text-slate-400 font-mono">{profileData.currentYear}</div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-slate-950/30 rounded-lg p-6 border border-slate-700/30">
              <h4 className="text-lg font-semibold text-white mb-4 font-mono tracking-wider">CONTACT</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-orange-400" />
                  <div>
                    <div className="text-sm text-slate-400 font-mono">EMAIL</div>
                    <a href={`mailto:${profileData.email}`} className="text-white font-mono text-sm hover:text-cyan-400 transition-colors">
                      {profileData.email}
                    </a>
                  </div>
                </div>
                {profileData.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <div>
                      <div className="text-sm text-slate-400 font-mono">LOCATION</div>
                      <div className="text-white font-mono text-sm">{profileData.location}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Button */}
        <div className="mt-8">
          <button
            onClick={async () => {
              if (!showAiAnalysis) {
                setIsLoadingAnalysis(true);
                // Simulate AI analysis loading
                await new Promise(resolve => setTimeout(resolve, 3000));
                setIsLoadingAnalysis(false);
                setShowAiAnalysis(true);
              } else {
                setShowAiAnalysis(false);
              }
            }}
            disabled={isLoadingAnalysis}
            className="w-full flex items-center justify-center space-x-3 py-4 px-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white rounded-xl transition-all font-mono text-sm tracking-wide shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10 flex items-center space-x-3">
              {isLoadingAnalysis ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>ANALYZING CODING PROFILE...</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  <span>{showAiAnalysis ? 'HIDE AI ANALYSIS' : 'GENERATE AI ANALYSIS'}</span>
                  <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
                </>
              )}
            </div>
          </button>

          {/* Loading Progress Bar */}
          {isLoadingAnalysis && (
            <div className="mt-4 bg-slate-950/30 rounded-lg p-4 border border-slate-700/30">
              <div className="flex items-center space-x-3 mb-3">
                <Brain className="h-4 w-4 text-purple-400 animate-pulse" />
                <span className="text-purple-400 font-mono text-sm">AI PROCESSING...</span>
              </div>
              <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <div className="h-full bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-full animate-pulse" style={{ width: '100%', animation: 'loading 3s ease-in-out' }}></div>
              </div>
              <div className="mt-2 text-xs text-slate-400 font-mono text-center">
                Analyzing 1,247 problems • Contest performance • Skill patterns
              </div>
            </div>
          )}

          {/* AI Analysis Results */}
          {showAiAnalysis && !isLoadingAnalysis && (
            <div className="mt-4 bg-slate-950/30 rounded-lg p-6 border border-slate-700/30 animate-fadeIn">
              <div className="flex items-center space-x-2 mb-6">
                <Brain className="h-5 w-5 text-purple-400" />
                <h4 className="text-lg font-semibold text-white font-mono tracking-wider">AI CODING ANALYSIS</h4>
                <div className="px-2 py-1 bg-purple-600/20 rounded-full border border-purple-400/30">
                  <span className="text-xs text-purple-300 font-mono">FOR INTERVIEWERS</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Strengths */}
                <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <h5 className="text-green-400 font-semibold font-mono text-sm">KEY STRENGTHS</h5>
                  </div>
                  <ul className="space-y-2">
                    {aiSummary.strengths.map((strength, index) => (
                      <li key={index} className="text-slate-300 text-sm font-mono flex items-start space-x-3">
                        <span className="text-green-400 mt-1 font-bold">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                {/* Weaknesses */}
                <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <h5 className="text-orange-400 font-semibold font-mono text-sm">AREAS FOR IMPROVEMENT</h5>
                  </div>
                  <ul className="space-y-2">
                    {aiSummary.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-slate-300 text-sm font-mono flex items-start space-x-3">
                        <span className="text-orange-400 mt-1 font-bold">⚠</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                  </ul>
                {/* Recommendations */}
                <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <Target className="h-4 w-4 text-cyan-400" />
                    <h5 className="text-cyan-400 font-semibold font-mono text-sm">INTERVIEW RECOMMENDATIONS</h5>
                  </div>
                  <ul className="space-y-2">
                    {aiSummary.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-slate-300 text-sm font-mono flex items-start space-x-3">
                        <span className="text-cyan-400 mt-1 font-bold">→</span>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
                {/* Interview Summary */}
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <h5 className="text-purple-400 font-semibold font-mono text-sm">INTERVIEW SUMMARY</h5>
                  </div>
                  <p className="text-slate-300 text-sm font-mono leading-relaxed">
                    <strong className="text-white">Alex Chen</strong> demonstrates strong problem-solving capabilities with consistent daily practice and solid algorithmic foundations. 
                    Best suited for <strong className="text-cyan-400">mid-level software engineering roles</strong> with growth potential. 
                    Consider focusing interview questions on <strong className="text-green-400">data structures and implementation</strong> while being mindful of 
                    <strong className="text-orange-400"> graph theory concepts</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};