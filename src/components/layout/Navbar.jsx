import React, { useState } from 'react';
import { 
  Cloud, 
  Activity, 
  Sparkles, 
  PlayCircle, 
  Gauge, 
  History, 
  Calculator, 
  Network, 
  GraduationCap, 
  Menu, 
  X,
  Zap
} from 'lucide-react';
import { useCloud } from '../../context/CloudContext';
import { Button } from '../common/Button';

export function Navbar() {
  const { activeTab, navigateTo, isExecuting } = useCloud();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Overview', icon: Cloud },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'selector', label: 'Smart Selector', icon: Sparkles },
    { id: 'execute', label: 'Execution Studio', icon: PlayCircle },
    { id: 'monitor', label: 'Resource Monitor', icon: Gauge },
    { id: 'history', label: 'Audit Logs', icon: History },
    { id: 'pricing', label: 'Cost Estimator', icon: Calculator },
    { id: 'architecture', label: 'Architecture', icon: Network },
    { id: 'concept-lab', label: 'Concept Lab', icon: GraduationCap },
  ];

  const handleNav = (tabId) => {
    navigateTo(tabId);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070B14]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNav('landing')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Cloud className="w-5 h-5 text-cyan-400 group-hover:text-pink-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  SMART<span className="text-cyan-400">CLOUD</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  FaaS v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-mono hidden md:block">
                Serverless Function Orchestration
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer
                    ${isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action & System Status */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 text-[11px]">Mesh: <strong className="text-emerald-400 font-medium">Online</strong></span>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={Zap}
              loading={isExecuting}
              onClick={() => handleNav('execute')}
            >
              Run Pipeline
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Zap}
              onClick={() => handleNav('execute')}
              className="px-2.5 py-1 text-xs"
            >
              Run
            </Button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-[#0B0F19]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`
                    flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors
                    ${isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Status: <span className="text-emerald-400 font-medium">Cluster Healthy (18 Warm microVMs)</span></span>
            <Button variant="primary" size="sm" onClick={() => handleNav('execute')}>
              Execute Function
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
