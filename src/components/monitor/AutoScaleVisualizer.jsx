import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';
import { Server, Zap, RefreshCw, Layers, ShieldCheck, Flame } from 'lucide-react';

export function AutoScaleVisualizer() {
  const [trafficRps, setTrafficRps] = useState(250); // 10 to 1500 req/s
  const [provisionedWarm, setProvisionedWarm] = useState(4);

  // Concurrency calculation: Concurrency = RPS * avg_duration(0.1s)
  const computedInstances = Math.min(36, Math.max(2, Math.ceil((trafficRps * 0.08) + provisionedWarm)));

  // Generate dynamic microVM grid
  const instances = Array.from({ length: computedInstances }, (_, i) => {
    const isProvisioned = i < provisionedWarm;
    const isUnderHeavyLoad = i < Math.floor(computedInstances * 0.7);
    const id = `microvm-${1000 + i}`;
    return {
      id,
      index: i + 1,
      type: isProvisioned ? 'PROVISIONED_WARM' : 'DYNAMIC_SCALED',
      state: isUnderHeavyLoad ? 'BUSY' : 'IDLE_WARM',
      cpu: isUnderHeavyLoad ? `${Math.floor(65 + (i % 30))}%` : '5%',
      ram: `${Math.floor(180 + (i * 12) % 300)} MB`,
    };
  });

  return (
    <GlassCard className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-pink-400" /> Dynamic Horizontal Auto-Scaling Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Watch Firecracker microVM instances scale horizontally from 0 to N based on real-time traffic demand.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <span className="text-slate-400">Total MicroVMs:</span>
            <span className="text-pink-400 font-bold text-sm">{computedInstances}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <span className="text-slate-400">Scale-to-Zero:</span>
            <span className="text-emerald-400 font-bold">Supported</span>
          </div>
        </div>
      </div>

      {/* Traffic Slider Controls */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div>
          <div className="flex justify-between items-center text-xs mb-2">
            <label className="font-bold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" /> Simulated Ingress Throughput:
            </label>
            <span className="font-mono text-cyan-400 font-bold">{trafficRps} req/sec</span>
          </div>
          <input
            type="range"
            min="10"
            max="1200"
            step="10"
            value={trafficRps}
            onChange={(e) => setTrafficRps(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer h-2"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>10 req/s (Idle)</span>
            <span>600 req/s (Peak)</span>
            <span>1200 req/s (Surge)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs mb-2">
            <label className="font-bold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Baseline Provisioned Warm Concurrency:
            </label>
            <span className="font-mono text-purple-400 font-bold">{provisionedWarm} instances</span>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={provisionedWarm}
            onChange={(e) => setProvisionedWarm(Number(e.target.value))}
            className="w-full accent-purple-400 bg-slate-800 rounded-lg cursor-pointer h-2"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>0 (Pure Scale-to-Zero)</span>
            <span>6 (Balanced)</span>
            <span>12 (Low Latency Guarantee)</span>
          </div>
        </div>
      </div>

      {/* MicroVM Cluster Pods Grid */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span>Active Container Sandboxes ({computedInstances} Pods)</span>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Busy Executing
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span> Warm / Standby
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-[360px] overflow-y-auto p-1">
          {instances.map((inst) => {
            const isBusy = inst.state === 'BUSY';

            return (
              <div
                key={inst.id}
                className={`p-2.5 rounded-xl border transition-all text-xs font-mono flex flex-col justify-between ${
                  isBusy 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] truncate">#{inst.id}</span>
                  <span className={`w-2 h-2 rounded-full ${isBusy ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`}></span>
                </div>

                <div className="mt-2 space-y-0.5 text-[10px] text-slate-400">
                  <div className="flex justify-between">
                    <span>CPU:</span>
                    <strong className={isBusy ? 'text-emerald-300' : 'text-slate-300'}>{inst.cpu}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>RAM:</span>
                    <strong className="text-purple-300">{inst.ram}</strong>
                  </div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-800 text-[9px] uppercase tracking-wider text-slate-500">
                  {inst.type === 'PROVISIONED_WARM' ? '⚡ Warm Pool' : '🚀 Auto-Scaled'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
