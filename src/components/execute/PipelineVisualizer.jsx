import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { PIPELINE_STAGES } from '../../data/architectureData';
import { ShieldCheck, Cpu, Box, Play, FileCheck, Receipt, CheckCircle, Clock } from 'lucide-react';

const ICON_MAP = {
  ShieldCheck,
  Cpu,
  Box,
  Play,
  FileCheck,
  Receipt
};

export function PipelineVisualizer({ currentStatus, isExecuting }) {
  const currentStageId = currentStatus?.stageId || 0;
  const progressPercent = currentStatus?.progress || 0;

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" /> Multi-Stage Execution Pipeline
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing the end-to-end lifecycle of a serverless microVM container invocation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isExecuting ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono animate-pulse">
              <Clock className="w-3.5 h-3.5" /> Pipeline Active ({progressPercent}%)
            </span>
          ) : currentStageId === 6 ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
              <CheckCircle className="w-3.5 h-3.5" /> Completed (100%)
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-xs font-mono">
              Idle / Ready
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Pipeline Stage Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {PIPELINE_STAGES.map((stage) => {
          const Icon = ICON_MAP[stage.icon] || Cpu;
          const isDone = currentStageId > stage.id || (currentStageId === 6 && !isExecuting);
          const isCurrent = currentStageId === stage.id && isExecuting;

          let stateStyle = 'border-slate-800 bg-slate-900/40 text-slate-500';
          if (isCurrent) {
            stateStyle = 'border-cyan-500/60 bg-cyan-950/40 text-cyan-300 ring-2 ring-cyan-500/20 glow-cyan';
          } else if (isDone) {
            stateStyle = 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300';
          }

          return (
            <div
              key={stage.id}
              className={`p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${stateStyle}`}
            >
              {isCurrent && (
                <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-full m-2 animate-ping" />
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isDone ? 'bg-emerald-500/20 text-emerald-400' : isCurrent ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800/80">
                    STAGE 0{stage.id}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-slate-200 mt-1 line-clamp-1">
                  {stage.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {stage.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] font-mono flex items-center justify-between">
                <span>Status:</span>
                <strong className={isDone ? 'text-emerald-400' : isCurrent ? 'text-cyan-400' : 'text-slate-400'}>
                  {isDone ? 'PASSED' : isCurrent ? 'RUNNING...' : 'PENDING'}
                </strong>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
