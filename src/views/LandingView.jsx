import React from 'react';
import { 
  Cloud, 
  Sparkles, 
  Zap, 
  Activity, 
  PlayCircle, 
  Gauge, 
  Calculator, 
  Network, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Cpu,
  CheckCircle2,
  Lock,
  Boxes
} from 'lucide-react';
import { useCloud } from '../context/CloudContext';
import { Button } from '../components/common/Button';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';

export function LandingView() {
  const { navigateTo, liveMetrics, cloudFunctions } = useCloud();

  const highlights = [
    {
      title: 'Smart Function Matcher',
      desc: 'Algorithmic matching engine analyzing workload parameters, latency constraints, and runtime memory to recommend optimal FaaS templates.',
      icon: Sparkles,
      color: 'text-cyan-400',
      tab: 'selector',
      badge: 'Smart Engine'
    },
    {
      title: '6-Stage Execution Pipeline',
      desc: 'Interactive execution simulation showing trigger ingress, microVM container spin-up, memory binding, live log streaming, and telemetry serialization.',
      icon: PlayCircle,
      color: 'text-pink-400',
      tab: 'execute',
      badge: 'Live Simulation'
    },
    {
      title: 'Real-time Resource Monitor',
      desc: 'Live CPU gauges, RAM watermarks, active microVM auto-scaling (0 to N instances), and cold-start distribution waterfall.',
      icon: Gauge,
      color: 'text-purple-400',
      tab: 'monitor',
      badge: 'Observability'
    },
    {
      title: 'Multi-Cloud FinOps Estimator',
      desc: 'Compare sub-millisecond execution costs across AWS Lambda, Google Cloud Functions, and Azure Functions with instant ROI analytics.',
      icon: Calculator,
      color: 'text-amber-400',
      tab: 'pricing',
      badge: 'Cost Intelligence'
    },
    {
      title: 'MicroVM Architecture Blueprint',
      desc: 'Detailed architectural decomposition of Firecracker hypervisors, distributed schedulers, and zero-trust IAM authorization layers.',
      icon: Network,
      color: 'text-emerald-400',
      tab: 'architecture',
      badge: 'Deep-Dive'
    },
    {
      title: 'CSE Serverless Concept Lab',
      desc: 'Educational learning laboratory with interactive Cold Start vs Warm Start benchmarks, idempotency simulations, and quiz certification.',
      icon: GraduationCap,
      color: 'text-indigo-400',
      tab: 'concept-lab',
      badge: 'Academic Studio'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      
      {/* HERO SECTION */}
      <div className="relative pt-6 pb-12 sm:pt-12 sm:pb-20 overflow-hidden">
        {/* Glowing background ambient lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/20 via-purple-600/20 to-pink-500/20 blur-[120px] -z-10 rounded-full pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 shadow-inner backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-semibold text-slate-300">Next-Generation Serverless FaaS Cloud Platform</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">CSE-702</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
            SMART-BASED <br />
            <span className="gradient-text-cyber">FUNCTION CLOUD</span> PLATFORM
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            An intelligent, zero-server cloud execution platform. Select optimal cloud functions, simulate multi-stage microVM pipelines, observe live cluster telemetry, and estimate multi-cloud FinOps costs.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={PlayCircle}
              onClick={() => navigateTo('execute')}
              className="shadow-xl shadow-cyan-500/25 text-sm sm:text-base font-bold"
            >
              Launch Execution Studio
            </Button>

            <Button
              variant="secondary"
              size="lg"
              icon={Sparkles}
              onClick={() => navigateTo('selector')}
              className="text-sm sm:text-base font-bold"
            >
              Smart Function Selector
            </Button>

            <Button
              variant="outline"
              size="lg"
              icon={Calculator}
              onClick={() => navigateTo('pricing')}
              className="text-sm sm:text-base font-bold"
            >
              Estimate Cloud Cost
            </Button>
          </div>

          {/* Hero Live Metric Pills */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
              <span className="text-slate-400 block text-[11px]">Active Invocations</span>
              <strong className="text-cyan-400 text-sm sm:text-base">{liveMetrics.totalInvocations.toLocaleString()}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
              <span className="text-slate-400 block text-[11px]">Avg Warm Latency</span>
              <strong className="text-purple-400 text-sm sm:text-base">{liveMetrics.avgLatencyMs} ms</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
              <span className="text-slate-400 block text-[11px]">Warm Container Ratio</span>
              <strong className="text-emerald-400 text-sm sm:text-base">{liveMetrics.warmRatio}%</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
              <span className="text-slate-400 block text-[11px]">System Reliability</span>
              <strong className="text-pink-400 text-sm sm:text-base">{liveMetrics.successRate}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* CORE CAPABILITIES GRID */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="purple" className="mb-2">Platform Capabilities</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Engineered for Cloud Computing Excellence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Every feature is designed to showcase modern distributed systems and serverless paradigms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassCard
                key={idx}
                hoverEffect={true}
                className="p-6 flex flex-col justify-between group cursor-pointer"
                onClick={() => navigateTo(item.tab)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <Badge variant="slate">{item.badge}</Badge>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span>Explore Module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE SERVERLESS WORKFLOW PREVIEW */}
      <GlassCard className="p-8 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Badge variant="cyan">Zero-Server Workflow</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              From Trigger to Sub-Millisecond Execution
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When an event occurs—such as a file upload to S3, a REST API call, or an IoT sensor stream—the Smart Scheduler matches the payload to an isolated MicroVM container.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Hardware Isolation:</strong> Firecracker MicroVMs prevent noisy-neighbor memory leaks.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Scale to Absolute Zero:</strong> Pay \$0 when inactive, automatically scaling to thousands of concurrent runs.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Sub-Millisecond FinOps Metering:</strong> Exact billing on 1ms duration increments.</span>
              </li>
            </ul>

            <div className="pt-2 flex gap-3">
              <Button variant="primary" size="md" onClick={() => navigateTo('execute')}>
                Try Interactive Demo
              </Button>
              <Button variant="secondary" size="md" onClick={() => navigateTo('architecture')}>
                View Architecture
              </Button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
              <span className="text-cyan-400 font-bold">faas-cluster-event-mesh</span>
              <span>v2.4.0</span>
            </div>
            
            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="text-emerald-400">✓ Ingress: POST /v1/functions/sentiment-ai [200 OK]</div>
              <div className="text-purple-400">→ Scheduler: Matched warm container #vm-8491 (affinity=0.98)</div>
              <div className="text-cyan-300">→ Hypervisor: Bound 512MB RAM / 0.5 vCPU</div>
              <div className="text-pink-400">→ Execution: Handler output returned in 64.2ms</div>
              <div className="text-amber-400">→ FinOps: Billed 0.0321 GB-s ($0.00000053 USD)</div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
              <span>Status: NOMINAL</span>
              <span className="text-emerald-400 font-bold">100% SUCCESS RATE</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* TECH STACK FOOTER CAROUSEL */}
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold font-mono">
          Powered by Modern Cloud & Web Technologies
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-300">
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800">React 18</span>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800">Vite 5</span>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800">Tailwind CSS</span>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800">Lucide React</span>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800">Firecracker MicroVMs</span>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800">OpenTelemetry</span>
        </div>
      </div>

    </div>
  );
}
