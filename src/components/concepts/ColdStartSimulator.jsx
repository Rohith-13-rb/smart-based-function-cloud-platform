import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Flame, Play, Clock, Zap, CheckCircle2 } from 'lucide-react';

export function ColdStartSimulator() {
  const [selectedRuntime, setSelectedRuntime] = useState('rust');
  const [isProvisioned, setIsProvisioned] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [benchmarkResult, setBenchmarkResult] = useState(null);

  const runtimes = {
    rust: {
      name: 'Rust (Compiled Binary / WASM)',
      vmBootMs: 15,
      runtimeInitMs: 8,
      codeInitMs: 4,
      warmRunMs: 3,
      color: 'text-amber-400',
      badge: 'Fastest Cold Start'
    },
    go: {
      name: 'Go 1.22 (Static ELF Binary)',
      vmBootMs: 25,
      runtimeInitMs: 20,
      codeInitMs: 12,
      warmRunMs: 8,
      color: 'text-cyan-400',
      badge: 'Ultra-Lean Runtime'
    },
    nodejs: {
      name: 'Node.js 20.x (V8 Engine)',
      vmBootMs: 30,
      runtimeInitMs: 65,
      codeInitMs: 85,
      warmRunMs: 18,
      color: 'text-emerald-400',
      badge: 'Standard Microservices'
    },
    python: {
      name: 'Python 3.11 (CPython + ML Wheels)',
      vmBootMs: 35,
      runtimeInitMs: 95,
      codeInitMs: 150,
      warmRunMs: 28,
      color: 'text-purple-400',
      badge: 'Heavy Import Overhead'
    },
    java: {
      name: 'Java 21 (JVM Standard Hotspot)',
      vmBootMs: 45,
      runtimeInitMs: 420,
      codeInitMs: 380,
      warmRunMs: 12,
      color: 'text-pink-400',
      badge: 'Heavy JVM Startup'
    }
  };

  const handleRunBenchmark = async () => {
    setIsSimulating(true);
    setBenchmarkResult(null);

    const runtimeData = runtimes[selectedRuntime];
    await new Promise(r => setTimeout(r, 600));

    const totalCold = isProvisioned 
      ? runtimeData.warmRunMs 
      : runtimeData.vmBootMs + runtimeData.runtimeInitMs + runtimeData.codeInitMs + runtimeData.warmRunMs;

    setBenchmarkResult({
      ...runtimeData,
      totalLatencyMs: totalCold,
      isProvisioned
    });
    setIsSimulating(false);
  };

  const current = runtimes[selectedRuntime];

  return (
    <GlassCard className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" /> Cold Start vs Warm Start Benchmark Lab
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Compare hypervisor boot, language bootstrap init, and memory impact across runtime architectures.
          </p>
        </div>
        <Badge variant="amber">Interactive CSE Simulator</Badge>
      </div>

      {/* Runtime Selection */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {Object.entries(runtimes).map(([key, data]) => {
          const isSelected = selectedRuntime === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedRuntime(key)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-cyan-950/40 border-cyan-500/50 shadow-md shadow-cyan-500/10' 
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-slate-200">{data.name.split('(')[0]}</div>
              <div className={`text-[10px] font-mono mt-1 ${data.color}`}>{data.badge}</div>
            </button>
          );
        })}
      </div>

      {/* Options & Action */}
      <div className="mt-5 p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isProvisioned}
            onChange={(e) => setIsProvisioned(e.target.checked)}
            className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 focus:ring-cyan-500"
          />
          <div>
            <span className="text-xs font-bold text-white">Enable Provisioned Warm Concurrency</span>
            <span className="text-[11px] text-slate-400 block">Pre-warms microVM sandbox to eliminate hypervisor + runtime bootstrap delay</span>
          </div>
        </label>

        <Button
          variant="gradient-purple"
          size="sm"
          icon={Play}
          loading={isSimulating}
          onClick={handleRunBenchmark}
        >
          Run Benchmark
        </Button>
      </div>

      {/* Latency Waterfall Visualization */}
      <div className="mt-6 p-4 rounded-xl bg-slate-950/90 border border-slate-800">
        <h4 className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
          <span>Latency Timing Breakdown ({current.name})</span>
          {benchmarkResult && (
            <span className="text-cyan-400 font-mono">
              Total Latency: <strong>{benchmarkResult.totalLatencyMs} ms</strong> {isProvisioned ? '(Warm Hit)' : '(Cold Start)'}
            </span>
          )}
        </h4>

        <div className="space-y-3 font-mono text-xs">
          {/* MicroVM Boot */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>1. Firecracker MicroVM Boot</span>
              <span>{isProvisioned ? '0 ms (Skipped)' : `${current.vmBootMs} ms`}</span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: isProvisioned ? '0%' : `${Math.min(100, current.vmBootMs * 1.5)}%` }}
              />
            </div>
          </div>

          {/* Runtime Init */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>2. Language Runtime Engine Init</span>
              <span>{isProvisioned ? '0 ms (Pre-warmed)' : `${current.runtimeInitMs} ms`}</span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: isProvisioned ? '0%' : `${Math.min(100, current.runtimeInitMs * 0.5)}%` }}
              />
            </div>
          </div>

          {/* User Code Import */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>3. User Package & Dependency Imports</span>
              <span>{isProvisioned ? '0 ms (Pre-loaded)' : `${current.codeInitMs} ms`}</span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-pink-500 h-full rounded-full transition-all duration-500"
                style={{ width: isProvisioned ? '0%' : `${Math.min(100, current.codeInitMs * 0.4)}%` }}
              />
            </div>
          </div>

          {/* Actual Execution */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>4. Function Handler Execution</span>
              <span>{current.warmRunMs} ms</span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, current.warmRunMs * 2.5)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Academic Takeaway */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-200">CSE Takeaway:</strong> Compiled native runtimes (Rust/Go) provide optimal cold start performance for latency-critical microservices, while provisioned concurrency is required to eliminate cold start penalties for JVM/Python workloads.
        </div>
      </div>
    </GlassCard>
  );
}
