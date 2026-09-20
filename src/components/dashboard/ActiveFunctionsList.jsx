import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useCloud } from '../../context/CloudContext';
import { PlayCircle, Cpu, Clock, Layers, Sparkles } from 'lucide-react';
import { RUNTIME_COLORS } from '../../data/functionsData';

export function ActiveFunctionsList() {
  const { cloudFunctions, navigateTo, setSelectedFunction } = useCloud();

  const handleQuickExecute = (fn) => {
    setSelectedFunction(fn);
    navigateTo('execute');
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" /> Deployed Serverless Functions
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Active serverless micro-services running on the virtualized cluster.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={Sparkles}
          onClick={() => navigateTo('selector')}
          className="text-xs"
        >
          Smart Selector
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {cloudFunctions.map((fn) => {
          const runtimeClass = RUNTIME_COLORS[fn.runtime] || 'bg-slate-800 text-slate-300';

          return (
            <div
              key={fn.id}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {fn.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{fn.description}</p>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${runtimeClass}`}>
                    {fn.runtime}
                  </span>
                </div>

                {/* Specs row */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded text-[11px] font-mono">
                    <Cpu className="w-3 h-3 text-cyan-400" /> {fn.memoryMb} MB
                  </span>
                  <span className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded text-[11px] font-mono">
                    <Clock className="w-3 h-3 text-purple-400" /> ~{fn.warmExecutionMs}ms
                  </span>
                  <span className="text-[11px] text-slate-400 border border-slate-700/60 px-2 py-0.5 rounded">
                    {fn.triggerType.split('/')[0]}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  Cold: <span className="text-amber-400">{fn.coldStartMs}ms</span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  icon={PlayCircle}
                  onClick={() => handleQuickExecute(fn)}
                  className="text-xs py-1 px-3 border-cyan-500/30"
                >
                  Execute
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
