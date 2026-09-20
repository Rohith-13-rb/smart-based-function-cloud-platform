import React from 'react';
import { ResourceGauges } from '../components/monitor/ResourceGauges';
import { AutoScaleVisualizer } from '../components/monitor/AutoScaleVisualizer';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useCloud } from '../context/CloudContext';
import { Gauge, Cpu, PlayCircle, Zap, ShieldCheck, HardDrive } from 'lucide-react';

export function MonitorView() {
  const { navigateTo } = useCloud();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald">Cluster Telemetry</Badge>
            <span className="text-xs font-mono text-slate-400">Node Agent: cgroups-v2-ebpf</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Gauge className="w-7 h-7 text-emerald-400" /> Real-Time Resource Monitor
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Inspect real-time CPU throttling, container memory limits, horizontal auto-scaling, and microVM instance lifecycles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            icon={PlayCircle}
            onClick={() => navigateTo('execute')}
          >
            Launch Execution Studio
          </Button>
        </div>
      </div>

      {/* Resource Metric Circular Gauges */}
      <ResourceGauges />

      {/* Dynamic Auto-Scaling Visualizer */}
      <AutoScaleVisualizer />

      {/* Memory & Concurrency Profiling Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">CPU Quota & Bursting</h4>
              <p className="text-[11px] text-slate-400 font-mono">CFS Scheduler Quota</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Linux completely fair scheduler (CFS) allocates proportional vCPU slices based on memory provisioning. 1792 MB of RAM provides exactly 1.0 dedicated vCPU core.
          </p>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Ephemeral /tmp NVMe</h4>
              <p className="text-[11px] text-slate-400 font-mono">512MB to 10GB Scratch</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Non-persistent local scratch space mounted with sub-millisecond IOPS for temporary file transforms, PDF compilation, and machine learning model caches.
          </p>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">gVisor / seccomp Sandbox</h4>
              <p className="text-[11px] text-slate-400 font-mono">Syscall Interception</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All container syscalls are intercepted in user-space via Sentry, protecting host kernel rings from zero-day exploit execution and cross-tenant privilege attacks.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
