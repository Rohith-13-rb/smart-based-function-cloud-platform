import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Cpu, HardDrive, Flame, Activity, ShieldAlert, Sparkles } from 'lucide-react';

export function ResourceGauges() {
  const gauges = [
    {
      title: 'Cluster CPU Utilization',
      icon: Cpu,
      value: 42.5,
      unit: '%',
      status: 'Normal',
      color: 'cyan',
      stroke: '#06B6D4',
      details: '8 cores allocated across 18 microVMs'
    },
    {
      title: 'Total RAM Allocated',
      icon: HardDrive,
      value: 68.2,
      unit: '%',
      status: 'Healthy',
      color: 'purple',
      stroke: '#8B5CF6',
      details: '11.8 GB used / 16.0 GB cluster cap'
    },
    {
      title: 'Warm Pool Saturation',
      icon: Activity,
      value: 88.0,
      unit: '%',
      status: 'Optimal',
      color: 'emerald',
      stroke: '#10B981',
      details: '16 warm instances ready for instant dispatch'
    },
    {
      title: 'Cold Start Overhead',
      icon: Flame,
      value: 12.4,
      unit: '%',
      status: 'Low',
      color: 'amber',
      stroke: '#F59E0B',
      details: 'Average spin-up delay: ~240ms'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {gauges.map((g, idx) => {
        const Icon = g.icon;
        const radius = 38;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (g.value / 100) * circumference;

        return (
          <GlassCard key={idx} className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{g.title}</span>
              <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                <Icon className="w-4 h-4 text-slate-300" />
              </div>
            </div>

            {/* Circular Gauge */}
            <div className="my-4 flex items-center justify-center relative">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="text-slate-800"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke={g.stroke}
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-white font-mono">{g.value}{g.unit}</span>
                <span className="text-[10px] text-slate-400 font-medium">{g.status}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 text-center font-mono">
              {g.details}
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
