import React, { useState, useMemo } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { calculateCloudCosts } from '../utils/costCalculator';
import { 
  Calculator, 
  DollarSign, 
  TrendingDown, 
  Server, 
  Zap, 
  Clock, 
  Cpu, 
  HardDrive, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

export function CostEstimatorView() {
  const [monthlyRequests, setMonthlyRequests] = useState(2500000); // 2.5M
  const [durationMs, setDurationMs] = useState(120); // 120ms
  const [memoryMb, setMemoryMb] = useState(512); // 512MB
  const [dataTransferGb, setDataTransferGb] = useState(15); // 15GB
  const [applyFreeTier, setApplyFreeTier] = useState(true);

  const costData = useMemo(() => {
    return calculateCloudCosts({
      monthlyRequests,
      durationMs,
      memoryMb,
      dataTransferGb,
      applyFreeTier
    });
  }, [monthlyRequests, durationMs, memoryMb, dataTransferGb, applyFreeTier]);

  const { providers, metrics } = costData;

  const maxTotalCost = Math.max(
    providers.AWS.totalCost,
    providers.GCP.totalCost,
    providers.AZURE.totalCost,
    metrics.traditionalServerCost
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="amber">FinOps Cost Modeler</Badge>
            <span className="text-xs font-mono text-slate-400">Pricing Schema: Global Tier 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Calculator className="w-7 h-7 text-amber-400" /> Multi-Cloud Cost Estimator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Calculate sub-millisecond execution billing across AWS Lambda, Google Cloud Functions, and Azure Functions.
          </p>
        </div>

        {/* Free tier toggle */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={applyFreeTier}
              onChange={(e) => setApplyFreeTier(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700"
            />
            <span>Apply Cloud Free Tier Discounts</span>
          </label>
        </div>
      </div>

      {/* INPUT SLIDERS PANEL */}
      <GlassCard className="p-6">
        <h3 className="text-base font-bold text-white pb-4 border-b border-slate-800 flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" /> Workload Compute Parameters
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Monthly Invocations Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-300 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> Monthly Invocations:
              </label>
              <span className="font-mono text-cyan-400 font-bold">
                {(monthlyRequests / 1000000).toFixed(2)}M req
              </span>
            </div>
            <input
              type="range"
              min="100000"
              max="25000000"
              step="100000"
              value={monthlyRequests}
              onChange={(e) => setMonthlyRequests(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>100K</span>
              <span>12.5M</span>
              <span>25M</span>
            </div>
          </div>

          {/* Execution Duration Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-400" /> Avg Duration:
              </label>
              <span className="font-mono text-purple-400 font-bold">
                {durationMs} ms
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="2000"
              step="10"
              value={durationMs}
              onChange={(e) => setDurationMs(Number(e.target.value))}
              className="w-full accent-purple-400 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>20 ms</span>
              <span>1,000 ms</span>
              <span>2,000 ms</span>
            </div>
          </div>

          {/* Allocated RAM Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-300 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-pink-400" /> Memory Size:
              </label>
              <span className="font-mono text-pink-400 font-bold">
                {memoryMb} MB
              </span>
            </div>
            <input
              type="range"
              min="128"
              max="3072"
              step="128"
              value={memoryMb}
              onChange={(e) => setMemoryMb(Number(e.target.value))}
              className="w-full accent-pink-400 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>128 MB</span>
              <span>1536 MB</span>
              <span>3072 MB</span>
            </div>
          </div>

          {/* Outbound Egress Transfer */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-300 flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" /> Outbound Egress:
              </label>
              <span className="font-mono text-emerald-400 font-bold">
                {dataTransferGb} GB/mo
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={dataTransferGb}
              onChange={(e) => setDataTransferGb(Number(e.target.value))}
              className="w-full accent-emerald-400 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 GB</span>
              <span>50 GB</span>
              <span>100 GB</span>
            </div>
          </div>

        </div>

        {/* Computed GB-seconds banner */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
          <div>
            Total Compute Metric: <strong className="text-white">{metrics.totalGbSeconds.toLocaleString()} GB-seconds</strong>
          </div>
          <div>
            Billing Precision: <strong className="text-cyan-400">1-millisecond increments</strong>
          </div>
        </div>
      </GlassCard>

      {/* MULTI-CLOUD PRICE COMPARISON CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* AWS Lambda */}
        <GlassCard className="p-5 border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-sm text-white">AWS Lambda</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                x86 & Graviton
              </span>
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold text-white font-mono">
                ${providers.AWS.totalCost.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 ml-1">/ month</span>
            </div>

            <div className="mt-4 space-y-1.5 text-xs text-slate-400 font-mono pt-3 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Requests:</span>
                <span className="text-slate-200">${providers.AWS.requestCost.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Compute (GB-s):</span>
                <span className="text-slate-200">${providers.AWS.computeCost.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Egress Transfer:</span>
                <span className="text-slate-200">${providers.AWS.egressCost.toFixed(3)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
            Includes 1M Free Invocations + 400k GB-s
          </div>
        </GlassCard>

        {/* GCP Cloud Functions */}
        <GlassCard className="p-5 border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-sm text-white">Google Cloud Functions</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                2nd Gen (Cloud Run)
              </span>
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold text-white font-mono">
                ${providers.GCP.totalCost.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 ml-1">/ month</span>
            </div>

            <div className="mt-4 space-y-1.5 text-xs text-slate-400 font-mono pt-3 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Requests:</span>
                <span className="text-slate-200">${providers.GCP.requestCost.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Compute (GB-s):</span>
                <span className="text-slate-200">${providers.GCP.computeCost.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Egress Transfer:</span>
                <span className="text-slate-200">${providers.GCP.egressCost.toFixed(3)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
            Includes 2M Free Invocations tier
          </div>
        </GlassCard>

        {/* Azure Functions */}
        <GlassCard className="p-5 border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-sm text-white">Azure Functions</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Consumption Plan
              </span>
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold text-white font-mono">
                ${providers.AZURE.totalCost.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 ml-1">/ month</span>
            </div>

            <div className="mt-4 space-y-1.5 text-xs text-slate-400 font-mono pt-3 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Requests:</span>
                <span className="text-slate-200">${providers.AZURE.requestCost.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Compute (GB-s):</span>
                <span className="text-slate-200">${providers.AZURE.computeCost.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Egress Transfer:</span>
                <span className="text-slate-200">${providers.AZURE.egressCost.toFixed(3)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
            Includes 1M Free Invocations tier
          </div>
        </GlassCard>

        {/* Traditional Monolith VM Comparison */}
        <GlassCard className="p-5 border-rose-500/30 bg-rose-950/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-sm text-white">24/7 Dedicated VM</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                2x EC2 + ALB
              </span>
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold text-rose-400 font-mono">
                ${metrics.traditionalServerCost.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 ml-1">/ month</span>
            </div>

            <div className="mt-4 space-y-1.5 text-xs text-slate-400 font-mono pt-3 border-t border-slate-800">
              <div className="flex justify-between">
                <span>VM Rentals (24/7):</span>
                <span className="text-slate-200">$28.50</span>
              </div>
              <div className="flex justify-between">
                <span>Load Balancer:</span>
                <span className="text-slate-200">$16.20</span>
              </div>
              <div className="flex justify-between">
                <span>Idle Waste:</span>
                <span className="text-rose-400">Paid 100% idle</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
            Baseline fixed cost regardless of 0 traffic
          </div>
        </GlassCard>

      </div>

      {/* ROI & SAVINGS BANNER */}
      <GlassCard className="p-6 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border-emerald-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4" /> Serverless TCO Efficiency Advantage
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Estimated Monthly Savings: <span className="text-emerald-400 font-mono">${metrics.monthlySavings.toFixed(2)}</span> ({metrics.savingsPercent}% Cost Reduction)
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              By adopting scale-to-zero serverless microVMs over permanently provisioned virtual machines, you only pay for exact milliseconds of execution.
            </p>
          </div>

          <div className="shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center font-mono">
              <span className="text-[10px] uppercase text-slate-400 block">FinOps Grade</span>
              <span className="text-2xl font-black text-emerald-400">OPTIMAL</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
