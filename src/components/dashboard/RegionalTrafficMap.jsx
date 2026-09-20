import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Globe, Server, CheckCircle2, Zap } from 'lucide-react';

export function RegionalTrafficMap() {
  const regions = [
    { id: 'us-east-1', name: 'US East (N. Virginia)', nodes: 14, latency: '12ms', load: '68%', status: 'Healthy', color: 'text-cyan-400' },
    { id: 'eu-central-1', name: 'EU Central (Frankfurt)', nodes: 8, latency: '24ms', load: '45%', status: 'Healthy', color: 'text-purple-400' },
    { id: 'ap-south-1', name: 'Asia South (Mumbai)', nodes: 12, latency: '18ms', load: '82%', status: 'Optimal', color: 'text-emerald-400' },
    { id: 'ap-northeast-1', name: 'Asia NE (Tokyo)', nodes: 6, latency: '35ms', load: '38%', status: 'Healthy', color: 'text-pink-400' },
    { id: 'us-west-2', name: 'US West (Oregon)', nodes: 9, latency: '28ms', load: '52%', status: 'Healthy', color: 'text-amber-400' }
  ];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" /> Multi-Region Edge Mesh & Cluster Health
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Global Anycast edge routers dispatching requests to localized Warm Pools.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" /> 5 / 5 Regions Operational
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {regions.map((reg) => (
          <div
            key={reg.id}
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                <Server className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-200">{reg.name}</div>
                <div className="text-[11px] text-slate-400 font-mono">{reg.id} • {reg.nodes} MicroVM Nodes</div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono">
              <div className="text-slate-400">
                Latency: <span className="text-white font-semibold">{reg.latency}</span>
              </div>
              
              <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full"
                  style={{ width: reg.load }}
                />
              </div>

              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                {reg.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
