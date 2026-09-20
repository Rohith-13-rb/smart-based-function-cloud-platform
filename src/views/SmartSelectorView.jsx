import React, { useState, useMemo } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { WORKLOAD_DOMAINS, RUNTIME_COLORS } from '../data/functionsData';
import { recommendFunctions } from '../utils/smartSelector';
import { useCloud } from '../context/CloudContext';
import { 
  Sparkles, 
  Cpu, 
  Clock, 
  Zap, 
  PlayCircle, 
  Layers, 
  Filter, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Flame
} from 'lucide-react';

export function SmartSelectorView() {
  const { setSelectedFunction, navigateTo } = useCloud();

  // Selector filters
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [latencyRequirement, setLatencyRequirement] = useState('balanced');
  const [memoryRequirement, setMemoryRequirement] = useState('medium');
  const [triggerFilter, setTriggerFilter] = useState('all');
  const [runtimeFilter, setRuntimeFilter] = useState('all');

  const rankedResults = useMemo(() => {
    return recommendFunctions({
      domain: selectedDomain,
      latencyRequirement,
      memoryRequirement,
      triggerFilter,
      runtimeFilter
    });
  }, [selectedDomain, latencyRequirement, memoryRequirement, triggerFilter, runtimeFilter]);

  const handleLaunch = (fn) => {
    setSelectedFunction(fn);
    navigateTo('execute');
  };

  const handleResetFilters = () => {
    setSelectedDomain('all');
    setLatencyRequirement('balanced');
    setMemoryRequirement('medium');
    setTriggerFilter('all');
    setRuntimeFilter('all');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple">Intelligent Workload Engine</Badge>
            <span className="text-xs font-mono text-slate-400">Match Algorithm v3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-purple-400" /> Smart Function Selector
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Input your task workload requirements, latency tolerances, and runtime constraints to get AI-powered FaaS recommendations.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleResetFilters}
          className="text-xs self-start sm:self-auto"
        >
          Reset Filters
        </Button>
      </div>

      {/* FILTER CONTROLS PANEL */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-cyan-400" /> Workload Profile & Constraints
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {rankedResults.length} Candidate Functions Evaluated
          </span>
        </div>

        {/* Domain Filter Pills */}
        <div className="mt-4">
          <label className="text-xs font-bold text-slate-300 block mb-2">Target Workload Domain:</label>
          <div className="flex flex-wrap gap-2">
            {WORKLOAD_DOMAINS.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDomain(d.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedDomain === d.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-parameter options */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Latency priority */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Latency Sensitivity:</label>
            <select
              value={latencyRequirement}
              onChange={(e) => setLatencyRequirement(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="ultra-low">Ultra-Low Latency (&lt; 50ms)</option>
              <option value="balanced">Balanced Production (50 - 200ms)</option>
              <option value="batch">High Throughput Batch (&gt; 200ms)</option>
            </select>
          </div>

          {/* Memory Footprint */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Memory Footprint Tier:</label>
            <select
              value={memoryRequirement}
              onChange={(e) => setMemoryRequirement(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="low">Lean Memory (128 - 256 MB)</option>
              <option value="medium">Standard Balanced (512 - 1024 MB)</option>
              <option value="high">High Compute / Heavy (1536 - 3072 MB)</option>
            </select>
          </div>

          {/* Trigger Event Protocol */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Trigger Protocol:</label>
            <select
              value={triggerFilter}
              onChange={(e) => setTriggerFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="all">All Ingress Triggers</option>
              <option value="http">Synchronous HTTP / API Gateway</option>
              <option value="storage">Object Storage Event (S3/GCS)</option>
              <option value="stream">Event Stream (Kafka / Kinesis)</option>
            </select>
          </div>

          {/* Preferred Runtime */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Preferred Runtime:</label>
            <select
              value={runtimeFilter}
              onChange={(e) => setRuntimeFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="all">Any Runtime</option>
              <option value="python">Python 3.11</option>
              <option value="node">Node.js 20.x</option>
              <option value="go">Go 1.22</option>
              <option value="rust">Rust / WASM</option>
            </select>
          </div>

        </div>
      </GlassCard>

      {/* RANKED RECOMMENDATIONS RESULTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Ranked Function Recommendations
          </h3>
          <span className="text-xs text-slate-400">
            Ordered by Smart Fit Match Score
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rankedResults.map((fn, index) => {
            const isTopMatch = index === 0;
            const runtimeBadgeClass = RUNTIME_COLORS[fn.runtime] || 'bg-slate-800 text-slate-300';

            return (
              <GlassCard
                key={fn.id}
                hoverEffect={true}
                className={`p-6 flex flex-col justify-between relative ${isTopMatch ? 'border-cyan-500/50 glow-cyan' : ''}`}
              >
                {isTopMatch && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider font-mono">
                    ★ Top AI Match
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">{fn.name}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{fn.description}</p>
                    </div>
                  </div>

                  {/* Fit Score Gauge */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-mono">Smart Fit Score:</span>
                      <strong className={`text-xl font-mono ${fn.matchScore >= 90 ? 'text-emerald-400' : fn.matchScore >= 80 ? 'text-cyan-400' : 'text-amber-400'}`}>
                        {fn.matchScore}%
                      </strong>
                    </div>

                    <div className="flex flex-wrap gap-1.5 justify-end">
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${runtimeBadgeClass}`}>
                        {fn.runtime}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {fn.memoryMb} MB
                      </span>
                    </div>
                  </div>

                  {/* Match Rationale */}
                  <div className="mt-3 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Matching Insights:</span>
                    {fn.reasons?.map((r, rIdx) => (
                      <div key={rIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    Warm Latency: <strong className="text-white">~{fn.warmExecutionMs}ms</strong>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={PlayCircle}
                    onClick={() => handleLaunch(fn)}
                    className="text-xs"
                  >
                    Launch in Studio
                  </Button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
