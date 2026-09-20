import React from 'react';
import { GlassCard } from './GlassCard';

export function MetricCard({
  title,
  value,
  subtitle,
  change,
  isPositive,
  icon: Icon,
  color = 'cyan', // 'cyan' | 'purple' | 'pink' | 'emerald' | 'amber'
  className = '',
}) {
  const colorMap = {
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      glow: 'glow-cyan',
      glowBorder: 'border-cyan-500/30'
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      glow: 'glow-purple',
      glowBorder: 'border-purple-500/30'
    },
    pink: {
      text: 'text-pink-400',
      bg: 'bg-pink-500/10 border-pink-500/20',
      glow: 'glow-pink',
      glowBorder: 'border-pink-500/30'
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      glow: 'glow-emerald',
      glowBorder: 'border-emerald-500/30'
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      glow: 'glow-amber',
      glowBorder: 'border-amber-500/30'
    }
  };

  const currentTheme = colorMap[color] || colorMap.cyan;

  return (
    <GlassCard className={`p-5 transition-all duration-300 hover:border-slate-600 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{value}</h3>
          </div>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${currentTheme.bg} ${currentTheme.text}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-800/80">
        <span className="text-slate-400">{subtitle}</span>
        {change && (
          <span className={`font-semibold flex items-center gap-0.5 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositive ? '▲' : '▼'} {change}
          </span>
        )}
      </div>
    </GlassCard>
  );
}
