import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Github, Chrome, Shield, ArrowRight, Code, Sparkles } from 'lucide-react';

interface AuthPageProps {
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
  onAuthSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode, onModeChange, onAuthSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    onAuthSuccess();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialAuth = (provider: string) => {
    console.log(`Authenticating with ${provider}`);
    // Simulate social auth
    setTimeout(() => onAuthSuccess(), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating code symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-cyan-400/20 font-mono text-lg animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {['<>', '{}', '[]', '()', '/>', '&&', '||', '=='][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="h-10 w-10 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white tracking-wider font-mono">Code Is You</h1>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <p className="text-slate-400 font-mono text-sm tracking-wide">
              {mode === 'login' ? 'WELCOME BACK, HUNTER' : 'JOIN THE CODING GUILD'}
            </p>
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </div>
        </div>

        {/* Main Auth Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
          {/* Card background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-transparent to-blue-600/5"></div>
          
          <div className="relative z-10">
            {/* Mode Toggle */}
            <div className="flex bg-slate-800/50 rounded-xl p-1 mb-8 border border-slate-700/50">
              <button
                onClick={() => onModeChange('login')}
                className={`flex-1 py-3 px-4 rounded-lg transition-all font-mono text-sm tracking-wide ${
                  mode === 'login'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                LOGIN
              </button>
              <button
                onClick={() => onModeChange('signup')}
                className={`flex-1 py-3 px-4 rounded-lg transition-all font-mono text-sm tracking-wide ${
                  mode === 'signup'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SIGN UP
              </button>
            </div>

            {/* Social Auth */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => handleSocialAuth('github')}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-lg transition-all group font-mono text-sm"
              >
                <Github className="h-5 w-5 text-slate-300 group-hover:text-white" />
                <span className="text-slate-300 group-hover:text-white">CONTINUE WITH GITHUB</span>
              </button>
              
              <button
                onClick={() => handleSocialAuth('google')}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-lg transition-all group font-mono text-sm"
              >
                <Chrome className="h-5 w-5 text-slate-300 group-hover:text-white" />
                <span className="text-slate-300 group-hover:text-white">CONTINUE WITH GOOGLE</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900/80 text-slate-400 font-mono tracking-wide">OR CONTINUE WITH EMAIL</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 font-mono tracking-wide">
                      FULL NAME
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 font-mono tracking-wide">
                      USERNAME
                    </label>
                    <div className="relative">
                      <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono"
                        placeholder="Choose a username"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-mono tracking-wide">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-mono tracking-wide">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 font-mono tracking-wide">
                    CONFIRM PASSWORD
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-slate-600 bg-slate-800 text-cyan-600 focus:ring-cyan-500 focus:ring-offset-slate-900" />
                    <span className="ml-2 text-sm text-slate-300 font-mono">REMEMBER ME</span>
                  </label>
                  <button type="button" className="text-sm text-cyan-400 hover:text-cyan-300 font-mono">
                    FORGOT PASSWORD?
                  </button>
                </div>
              )}

              {mode === 'signup' && (
                <div className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1 rounded border-slate-600 bg-slate-800 text-cyan-600 focus:ring-cyan-500 focus:ring-offset-slate-900" required />
                  <span className="text-sm text-slate-300 font-mono leading-relaxed">
                    I AGREE TO THE <button type="button" className="text-cyan-400 hover:text-cyan-300">TERMS OF SERVICE</button> AND <button type="button" className="text-cyan-400 hover:text-cyan-300">PRIVACY POLICY</button>
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all font-mono text-sm tracking-wide shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400 font-mono">
                {mode === 'login' ? "DON'T HAVE AN ACCOUNT?" : 'ALREADY HAVE AN ACCOUNT?'}
                <button
                  onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
                  className="ml-2 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  {mode === 'login' ? 'SIGN UP' : 'SIGN IN'}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-slate-900/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/30">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="text-green-400 font-semibold font-mono text-sm">SECURE CONNECTION</h4>
              <p className="text-slate-400 text-xs font-mono mt-1">
                YOUR DATA IS PROTECTED WITH END-TO-END ENCRYPTION AND INDUSTRY-STANDARD SECURITY PROTOCOLS.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};