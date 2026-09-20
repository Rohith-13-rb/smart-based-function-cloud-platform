import React from 'react';
import { MetricsOverview } from '../components/dashboard/MetricsOverview';
import { InvocationsChart } from '../components/dashboard/InvocationsChart';
import { ActiveFunctionsList } from '../components/dashboard/ActiveFunctionsList';
import { RegionalTrafficMap } from '../components/dashboard/RegionalTrafficMap';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useCloud } from '../context/CloudContext';
import { Activity, PlayCircle, Sparkles } from 'lucide-react';

export function DashboardView() {
  const { navigateTo } = useCloud();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan">Operations Console</Badge>
            <span className="text-xs font-mono text-slate-400">Cluster: prod-us-east-mesh</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Activity className="w-7 h-7 text-cyan-400" /> Cloud Function Telemetry Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor real-time invocations, warm microVM pools, cold-start latency distributions, and regional nodes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={Sparkles}
            onClick={() => navigateTo('selector')}
          >
            Smart Selector
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={PlayCircle}
            onClick={() => navigateTo('execute')}
          >
            Execute Function
          </Button>
        </div>
      </div>

      {/* 6 Key Metric Cards */}
      <MetricsOverview />

      {/* Live Invocations Chart */}
      <InvocationsChart />

      {/* Grid: Active Functions Catalog & Regional Traffic Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActiveFunctionsList />
        <RegionalTrafficMap />
      </div>
    </div>
  );
}
