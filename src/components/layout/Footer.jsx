import React from 'react';
import { Cloud, Cpu, Terminal, ShieldCheck, Heart, Layers, Github, ExternalLink } from 'lucide-react';
import { useCloud } from '../../context/CloudContext';

export function Footer() {
  const { navigateTo } = useCloud();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#060911] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Project Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5">
                <div className="w-full h-full bg-[#0B0F19] rounded-[6px] flex items-center justify-center">
                  <Cloud className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                SMART-BASED <span className="text-cyan-400">CLOUD</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A comprehensive CSE College Cloud Computing capstone project demonstrating intelligent Function-as-a-Service (FaaS) selection, real-time pipeline execution simulation, resource monitoring, and multi-cloud FinOps cost estimation.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400 font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">Vite 5</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-300 border border-slate-700">React 18</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-pink-300 border border-slate-700">Tailwind</span>
            </div>
          </div>

          {/* Quick Platform Views */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" /> Platform Modules
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Cloud Metrics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('selector')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Smart Function Selector
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('execute')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Execution Pipeline Studio
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('monitor')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Real-time Resource Monitor
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('history')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Audit Logs & Distributed Tracing
                </button>
              </li>
            </ul>
          </div>

          {/* Serverless Knowledge & FinOps */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" /> CSE Lab & FinOps
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('pricing')} className="hover:text-purple-400 transition-colors cursor-pointer">
                  Multi-Cloud Cost Estimator (AWS / GCP / Azure)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('architecture')} className="hover:text-purple-400 transition-colors cursor-pointer">
                  Firecracker MicroVM Architecture
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('concept-lab')} className="hover:text-purple-400 transition-colors cursor-pointer">
                  Cold Start vs Warm Start Simulator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('concept-lab')} className="hover:text-purple-400 transition-colors cursor-pointer">
                  Serverless Knowledge Quiz & Certificate
                </button>
              </li>
            </ul>
          </div>

          {/* College Project Meta */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" /> Academic Project
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-200 font-medium">Department of Computer Science & Engineering</div>
              <div className="text-slate-400 text-[11px]">Course: Cloud Computing & Distributed Systems (CSE-702)</div>
              <div className="text-slate-400 text-[11px]">Topic: Smart Serverless FaaS Computing Platform</div>
              <div className="pt-1 flex items-center gap-1.5 text-emerald-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> Production Ready Simulation
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Smart-Based Function Cloud Platform. Built for CSE Capstone Showcase.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Zero-Server Architecture Simulation
            </span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">GitHub Pages Compatible</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
