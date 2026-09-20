import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';
import { Activity, Play, Pause, Zap, Flame, RefreshCw } from 'lucide-react';

export function InvocationsChart() {
  const [dataPoints, setDataPoints] = useState(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      invocations: Math.floor(180 + Math.sin(i / 3) * 80 + Math.random() * 40),
      coldStarts: Math.floor(8 + Math.random() * 6),
      errors: Math.random() > 0.8 ? Math.floor(Math.random() * 3 + 1) : 0
    }));
  });

  const [isLive, setIsLive] = useState(true);
  const [activeMetric, setActiveMetric] = useState('invocations'); // 'invocations' | 'coldStarts' | 'errors'

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const nextTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const lastInvocations = prev[prev.length - 1]?.invocations || 200;
        const newInvocations = Math.max(50, Math.min(450, Math.round(lastInvocations + (Math.random() - 0.48) * 35)));
        const newCold = Math.floor(newInvocations * 0.05 + Math.random() * 4);
        const newErrors = Math.random() > 0.85 ? Math.floor(Math.random() * 4) : 0;

        const updated = [...prev.slice(1), { time: nextTime, invocations: newInvocations, coldStarts: newCold, errors: newErrors }];
        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isLive]);

  const triggerTrafficBurst = () => {
    setDataPoints(prev => {
      const burst = prev.map((pt, idx) => {
        if (idx >= prev.length - 5) {
          return {
            ...pt,
            invocations: pt.invocations + Math.floor(Math.random() * 120 + 80),
            coldStarts: pt.coldStarts + Math.floor(Math.random() * 15 + 10)
          };
        }
        return pt;
      });
      return burst;
    });
  };

  const maxValue = Math.max(...dataPoints.map(d => d.invocations), 350);

  return (
    <GlassCard className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" /> Real-Time Invocations & Traffic Mesh
            </h3>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Feed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing dynamic request distribution, cold start spikes, and microVM instance scaling.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector */}
          <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs">
            <button
              onClick={() => setActiveMetric('invocations')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeMetric === 'invocations' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Invocations
            </button>
            <button
              onClick={() => setActiveMetric('coldStarts')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeMetric === 'coldStarts' 
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cold Starts
            </button>
            <button
              onClick={() => setActiveMetric('errors')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeMetric === 'errors' 
                  ? 'bg-pink-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Errors
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={Zap}
            onClick={triggerTrafficBurst}
            className="text-xs border-cyan-500/40"
          >
            Simulate Surge
          </Button>

          <button
            onClick={() => setIsLive(!isLive)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
            title={isLive ? 'Pause Stream' : 'Resume Stream'}
          >
            {isLive ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* SVG Time Series Chart */}
      <div className="mt-6">
        <div className="h-56 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 220" preserveAspectRatio="none">
            <defs>
              <linearGradient id="invocationsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="coldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => (
              <line
                key={idx}
                x1="0"
                y1={200 * ratio + 10}
                x2="1000"
                y2={200 * ratio + 10}
                stroke="#1E293B"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Line / Area calculations */}
            {(() => {
              const points = dataPoints.map((d, i) => {
                const x = (i / (dataPoints.length - 1)) * 1000;
                let val = d.invocations;
                if (activeMetric === 'coldStarts') val = d.coldStarts * 8;
                if (activeMetric === 'errors') val = d.errors * 50;
                const y = 200 - (val / maxValue) * 180 + 10;
                return { x, y, raw: d };
              });

              const pathD = points.reduce((acc, p, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
              const areaD = `${pathD} L 1000 210 L 0 210 Z`;

              const strokeColor = activeMetric === 'invocations' 
                ? '#06B6D4' 
                : activeMetric === 'coldStarts' 
                  ? '#F59E0B' 
                  : '#EC4899';

              const fillGrad = activeMetric === 'invocations' 
                ? 'url(#invocationsGradient)' 
                : activeMetric === 'coldStarts' 
                  ? 'url(#coldGradient)' 
                  : 'rgba(236,72,153,0.15)';

              return (
                <>
                  <path d={areaD} fill={fillGrad} />
                  <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Data Point Dots */}
                  {points.map((p, idx) => (
                    <circle
                      key={idx}
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      className="transition-all hover:r-6 cursor-pointer"
                      fill="#070B14"
                      stroke={strokeColor}
                      strokeWidth="2.5"
                    />
                  ))}
                </>
              );
            })()}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-3 text-[11px] text-slate-500 font-mono">
          <span>{dataPoints[0]?.time || '00:00'}</span>
          <span>{dataPoints[Math.floor(dataPoints.length / 2)]?.time || '12:00'}</span>
          <span>{dataPoints[dataPoints.length - 1]?.time || 'Now'}</span>
        </div>
      </div>

      {/* Legend & Summary Info */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400">Current Rate</div>
          <div className="text-cyan-400 font-bold font-mono text-sm sm:text-base mt-0.5">
            {dataPoints[dataPoints.length - 1]?.invocations} req/s
          </div>
        </div>
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400">Cold Invocations</div>
          <div className="text-amber-400 font-bold font-mono text-sm sm:text-base mt-0.5">
            {dataPoints[dataPoints.length - 1]?.coldStarts} active
          </div>
        </div>
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-400">Error Rate</div>
          <div className="text-emerald-400 font-bold font-mono text-sm sm:text-base mt-0.5">
            0.04% (Nominal)
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
