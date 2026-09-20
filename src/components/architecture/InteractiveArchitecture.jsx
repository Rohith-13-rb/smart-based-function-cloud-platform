import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { ARCHITECTURE_LAYERS } from '../../data/architectureData';
import { Network, Server, ShieldCheck, Box, Clock, Cpu, ArrowRight, Info, Layers } from 'lucide-react';

export function InteractiveArchitecture() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-cyan-400" /> End-to-End Serverless Cloud Architecture
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Interactive architectural topology showing ingress routing, intelligent microVM scheduling, and sub-millisecond telemetry.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            Click any component for deep-dive technical specs
          </div>
        </div>

        {/* 4 Architectural Layers Stack */}
        <div className="mt-6 space-y-4">
          {ARCHITECTURE_LAYERS.map((layer, idx) => (
            <div
              key={layer.id}
              className={`p-5 rounded-2xl border transition-all duration-300 ${layer.color} relative overflow-hidden`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/40 uppercase tracking-wider text-slate-200">
                      {layer.badge}
                    </span>
                    <h4 className="text-base font-extrabold text-white">{layer.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{layer.description}</p>
                </div>
              </div>

              {/* Sub-components Grid */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {layer.components.map((comp, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => setSelectedComponent({ ...comp, layerTitle: layer.title, layerBadge: layer.badge })}
                    className="p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-white/10 hover:border-cyan-400/50 transition-all text-left group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {comp.name}
                        </span>
                        <Info className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{comp.type}</div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Latency: <strong className="text-white">{comp.latency}</strong></span>
                      <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">Details →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Deep-Dive Spec Modal */}
      <Modal
        isOpen={!!selectedComponent}
        onClose={() => setSelectedComponent(null)}
        title={selectedComponent ? `${selectedComponent.name}` : ''}
      >
        {selectedComponent && (
          <div className="space-y-4 text-xs leading-relaxed text-slate-300">
            <div className="flex items-center gap-2">
              <Badge variant="purple">{selectedComponent.layerBadge}</Badge>
              <Badge variant="cyan">{selectedComponent.type}</Badge>
              <span className="text-slate-400 font-mono text-[11px]">Overhead: {selectedComponent.latency}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <h5 className="font-bold text-white text-xs mb-1">Architecture Function & Responsibility</h5>
              <p className="text-slate-300">{selectedComponent.details}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Isolation Standard</span>
                <p className="text-cyan-300 font-mono text-xs mt-1">POSIX Sandbox / cgroups v2 / seccomp</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Target Protocol</span>
                <p className="text-purple-300 font-mono text-xs mt-1">HTTP/2 • gRPC • CloudEvents v1.0</p>
              </div>
            </div>

            <div className="pt-2 text-slate-400 text-[11px]">
              Part of the <strong>{selectedComponent.layerTitle}</strong> specification implemented in this platform.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
