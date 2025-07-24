import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PlatformSettings } from './components/PlatformSettings';
import { AuthPage } from './components/AuthPage';
import { Header } from './components/Header';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AuthPage 
        mode={authMode} 
        onModeChange={setAuthMode}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' ? <Dashboard /> : <PlatformSettings />}
      </main>
    </div>
  );
}

export default App;