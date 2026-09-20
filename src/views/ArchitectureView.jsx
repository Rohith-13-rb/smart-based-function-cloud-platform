import React from 'react';
import { InteractiveArchitecture } from '../components/architecture/InteractiveArchitecture';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useCloud } from '../context/CloudContext';
import { Network, PlayCircle, ShieldCheck, Box, Zap, Cpu } from 'lucide-react';

export function ArchitectureView() {
  const { navigateTo } = useCloud();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan">System Architecture</Badge>
            <span className="text-xs font-mono text-slate-400">Specification: RFC-Cloud-FaaS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Network className="w-7 h-7 text-cyan-400" /> Cloud Platform Architecture
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deconstruction of the distributed ingress routing, container placement scheduling, microVM sandboxes, and OpenTelemetry instrumentation.
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

      {/* Interactive 4-tier Architectural Blueprint */}
      <InteractiveArchitecture />

      {/* ISOLATION COMPARISON MATRIX */}
      <GlassCard className="p-6">
        <h3 className="text-base font-bold text-white pb-4 border-b border-slate-800 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-400" /> Sandbox Isolation Technologies Comparison
        </h3>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Technology</th>
                <th className="py-3 px-4">Startup Latency</th>
                <th className="py-3 px-4">Memory Overhead</th>
                <th className="py-3 px-4">Security Boundary</th>
                <th className="py-3 px-4">Density (per Host)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="bg-cyan-950/20 text-cyan-200">
                <td className="py-3 px-4 font-bold font-sans">
                  Firecracker MicroVM (This Platform)
                </td>
                <td className="py-3 px-4 text-emerald-400 font-bold">&lt; 5 ms</td>
                <td className="py-3 px-4">&lt; 5 MB</td>
                <td className="py-3 px-4 text-emerald-400">Hardware KVM Hypervisor</td>
                <td className="py-3 px-4 font-bold">4,000+ VMs/host</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold font-sans">
                  Docker / OCI Containers (runc)
                </td>
                <td className="py-3 px-4 text-amber-400">100 - 500 ms</td>
                <td className="py-3 px-4">~30 - 50 MB</td>
                <td className="py-3 px-4 text-amber-400">Shared Linux Kernel (cgroups)</td>
                <td className="py-3 px-4">~200 - 500 containers</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold font-sans">
                  Traditional Heavy VM (QEMU / ESXi)
                </td>
                <td className="py-3 px-4 text-rose-400">15,000 - 60,000 ms</td>
                <td className="py-3 px-4 text-rose-400">1,024 - 4,096 MB</td>
                <td className="py-3 px-4 text-emerald-400">Hardware Hypervisor</td>
                <td className="py-3 px-4">~20 - 50 VMs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
