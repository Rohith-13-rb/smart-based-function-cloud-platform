import React from 'react';
import { Zap, Clock, ShieldCheck, Flame, Cpu, DollarSign } from 'lucide-react';
import { MetricCard } from '../common/MetricCard';
import { useCloud } from '../../context/CloudContext';

export function MetricsOverview() {
  const { liveMetrics, executionHistory } = useCloud();

  // Calculate live aggregates
  const totalRuns = liveMetrics.totalInvocations;
  const recentColdStarts = executionHistory.filter(h => h.isColdStart).length;
  const coldRatio = executionHistory.length > 0 
    ? Math.round((recentColdStarts / executionHistory.length) * 100) 
    : 12;

  const totalCalculatedCost = executionHistory.reduce((acc, h) => acc + (h.costUsd || 0.000001), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <MetricCard
        title="Total Invocations"
        value={totalRuns.toLocaleString()}
        subtitle="Throughput: 42.8 req/s"
        change="+14.2%"
        isPositive={true}
        icon={Zap}
        color="cyan"
      />
      <MetricCard
        title="Avg Latency (Warm)"
        value={`${liveMetrics.avgLatencyMs} ms`}
        subtitle="P99: 142 ms"
        change="-8.4%"
        isPositive={true}
        icon={Clock}
        color="purple"
      />
      <MetricCard
        title="Success Rate"
        value={`${liveMetrics.successRate}%`}
        subtitle="SLO: > 99.50%"
        change="+0.02%"
        isPositive={true}
        icon={ShieldCheck}
        color="emerald"
      />
      <MetricCard
        title="Active MicroVMs"
        value={liveMetrics.activeInstances.toString()}
        subtitle="Warm Pool: 92%"
        change="Auto-scaled"
        isPositive={true}
        icon={Cpu}
        color="pink"
      />
      <MetricCard
        title="Cold Start Ratio"
        value={`${coldRatio}%`}
        subtitle="Avg Cold: 280ms"
        change="-3.1%"
        isPositive={true}
        icon={Flame}
        color="amber"
      />
      <MetricCard
        title="Hourly Burn Rate"
        value={`$${liveMetrics.estimatedHourlyCost.toFixed(3)}`}
        subtitle="GB-sec: 24,100"
        change="Optimized"
        isPositive={true}
        icon={DollarSign}
        color="cyan"
      />
    </div>
  );
}
