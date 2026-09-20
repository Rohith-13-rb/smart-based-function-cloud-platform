import React, { useState, useEffect, useRef } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Terminal, Copy, Check, Download, Zap, Database } from 'lucide-react';

export function LogTerminal({ currentExecution, currentStatus, isExecuting }) {
  const [activeView, setActiveView] = useState('logs'); // 'logs' | 'output' | 'raw'
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef(null);

  const logs = currentExecution?.logs || (currentStatus?.currentLog ? [currentStatus.currentLog] : []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, currentStatus]);

  const handleCopyLogs = () => {
    const text = activeView === 'output' && currentExecution?.outputResult 
      ? JSON.stringify(currentExecution.outputResult, null, 2)
      : logs.map(l => `[${l.timestamp}] [${l.stage}] [${l.level}] ${l.message}`).join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = JSON.stringify(currentExecution || { logs }, null, 2);
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trace-${currentExecution?.traceId || 'sim'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLevelColor = (level, stage) => {
    if (level === 'ERROR') return 'text-rose-400 bg-rose-950/30';
    if (stage === 'COLD-START' || stage === 'HYPERVISOR') return 'text-amber-400';
    if (stage === 'AUTH') return 'text-purple-400';
    if (stage === 'TELEMETRY' || stage === 'FINOPS') return 'text-emerald-400';
    if (stage === 'USER_LOG') return 'text-cyan-300';
    return 'text-slate-300';
  };

  return (
    <GlassCard className="p-0 overflow-hidden flex flex-col h-full border-slate-800">
      {/* Terminal Header */}
      <div className="bg-slate-950/90 border-b border-slate-800 p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-200">
            cloud-runtime-stdout <span className="text-slate-500">:: telemetry stream</span>
          </span>
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
            <button
              onClick={() => setActiveView('logs')}
              className={`px-2.5 py-0.5 rounded ${activeView === 'logs' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Stream Logs
            </button>
            <button
              onClick={() => setActiveView('output')}
              className={`px-2.5 py-0.5 rounded ${activeView === 'output' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Response Output
            </button>
          </div>

          <button
            onClick={handleCopyLogs}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Copy"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleDownload}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Download Trace JSON"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 bg-[#050811] flex-1 overflow-y-auto font-mono text-xs text-slate-300 min-h-[320px] max-h-[440px]">
        {activeView === 'logs' ? (
          <div className="space-y-1.5">
            {logs.length === 0 ? (
              <div className="text-slate-500 italic py-8 text-center">
                Ready to invoke. Click "Execute Function" above to initialize sandbox telemetry stream.
              </div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed hover:bg-slate-900/40 p-0.5 rounded flex items-start gap-2">
                  <span className="text-slate-600 select-none text-[11px] shrink-0">
                    {log.timestamp || '00:00:00.000'}
                  </span>
                  <span className="text-purple-400 font-bold shrink-0 text-[11px]">
                    [{log.stage}]
                  </span>
                  <span className={`${getLevelColor(log.level, log.stage)} break-all`}>
                    {log.message}
                  </span>
                </div>
              ))
            )}
            {isExecuting && (
              <div className="flex items-center gap-2 text-cyan-400 animate-pulse pt-2">
                <span className="inline-block w-2 h-4 bg-cyan-400"></span>
                <span>Streaming live execution telemetry...</span>
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>
        ) : (
          <div>
            {currentExecution?.outputResult ? (
              <pre className="text-cyan-300 text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(currentExecution.outputResult, null, 2)}
              </pre>
            ) : (
              <div className="text-slate-500 italic py-8 text-center">
                No response payload yet. Execute the function to view output serialization.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Terminal Footer Telemetry Bar */}
      {currentExecution && (
        <div className="bg-slate-950 border-t border-slate-800 p-2.5 px-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
          <div>
            TraceId: <span className="text-cyan-400">{currentExecution.traceId}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Duration: <strong className="text-white">{currentExecution.durationMs}ms</strong></span>
            <span>Peak RAM: <strong className="text-purple-400">{currentExecution.memoryPeakMb}MB</strong></span>
            <span>Est Cost: <strong className="text-emerald-400">${currentExecution.costUsd}</strong></span>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
