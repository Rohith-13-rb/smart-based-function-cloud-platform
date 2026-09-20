import React, { useState, useMemo } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useCloud } from '../context/CloudContext';
import { 
  History, 
  Search, 
  Filter, 
  Trash2, 
  RefreshCw, 
  Download, 
  PlayCircle, 
  Eye, 
  Clock, 
  Cpu, 
  DollarSign, 
  Flame, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { RUNTIME_COLORS } from '../data/functionsData';

export function HistoryView() {
  const { 
    executionHistory, 
    clearHistory, 
    resetToSampleHistory, 
    setSelectedFunction, 
    navigateTo 
  } = useCloud();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'cold' | 'warm'
  const [selectedTrace, setSelectedTrace] = useState(null);

  const filteredHistory = useMemo(() => {
    return executionHistory.filter(item => {
      const matchSearch = 
        (item.functionName && item.functionName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.traceId && item.traceId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.runtime && item.runtime.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchStatus = 
        statusFilter === 'all' ? true :
        statusFilter === 'cold' ? item.isColdStart :
        statusFilter === 'warm' ? !item.isColdStart : true;

      return matchSearch && matchStatus;
    });
  }, [executionHistory, searchTerm, statusFilter]);

  const handleReplay = (item) => {
    const fn = {
      id: item.functionId,
      name: item.functionName,
      category: item.category,
      runtime: item.runtime,
      defaultPayload: item.inputPayload || {}
    };
    setSelectedFunction(fn);
    navigateTo('execute');
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(filteredHistory, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cloud-execution-history-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalCost = executionHistory.reduce((acc, h) => acc + (h.costUsd || 0.0000001), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan">Audit & Compliance</Badge>
            <span className="text-xs font-mono text-slate-400">Tracing: OpenTelemetry v1.28</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <History className="w-7 h-7 text-cyan-400" /> Execution History & Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Immutable log of simulated cloud function invocations, trace spans, memory usage, and FinOps costs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={handleExportJson}
            disabled={executionHistory.length === 0}
            className="text-xs"
          >
            Export JSON
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={RefreshCw}
            onClick={resetToSampleHistory}
            className="text-xs text-slate-400 hover:text-white"
          >
            Reset
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={clearHistory}
            disabled={executionHistory.length === 0}
            className="text-xs"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Summary Stats Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <GlassCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Total Invocations</span>
            <strong className="text-lg font-bold text-white font-mono">{executionHistory.length}</strong>
          </div>
          <History className="w-5 h-5 text-cyan-400" />
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Cold Start Runs</span>
            <strong className="text-lg font-bold text-amber-400 font-mono">
              {executionHistory.filter(h => h.isColdStart).length}
            </strong>
          </div>
          <Flame className="w-5 h-5 text-amber-400" />
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Warm Cache Hits</span>
            <strong className="text-lg font-bold text-emerald-400 font-mono">
              {executionHistory.filter(h => !h.isColdStart).length}
            </strong>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Accumulated Cost</span>
            <strong className="text-lg font-bold text-purple-400 font-mono">
              ${totalCost.toFixed(6)}
            </strong>
          </div>
          <DollarSign className="w-5 h-5 text-purple-400" />
        </GlassCard>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <GlassCard className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by function name, runtime, or Trace ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="all">All Invocations</option>
              <option value="warm">Warm Pool Hits Only</option>
              <option value="cold">Cold Starts Only</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* AUDIT LOG TABLE */}
      <GlassCard className="p-0 overflow-hidden border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Function Name</th>
                <th className="py-3.5 px-4 font-bold">Runtime</th>
                <th className="py-3.5 px-4 font-bold">Duration</th>
                <th className="py-3.5 px-4 font-bold">Memory Peak</th>
                <th className="py-3.5 px-4 font-bold">FinOps Cost</th>
                <th className="py-3.5 px-4 font-bold">Timestamp</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-slate-500 italic">
                    No execution records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => {
                  const runtimeClass = RUNTIME_COLORS[item.runtime] || 'bg-slate-800 text-slate-300';

                  return (
                    <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4">
                        {item.isColdStart ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px]">
                            <Flame className="w-3 h-3" /> Cold Start
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]">
                            <CheckCircle2 className="w-3 h-3" /> 200 OK
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-sans font-bold text-white">
                        <div>{item.functionName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{item.traceId}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${runtimeClass}`}>
                          {item.runtime}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-cyan-300 font-bold">
                        {item.durationMs} ms
                      </td>

                      <td className="py-3 px-4 text-purple-300">
                        {item.memoryPeakMb || item.memoryMb} MB
                      </td>

                      <td className="py-3 px-4 text-emerald-400">
                        ${item.costUsd ? item.costUsd.toFixed(7) : '0.0000005'}
                      </td>

                      <td className="py-3 px-4 text-slate-400 text-[11px]">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </td>

                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedTrace(item)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
                          title="Inspect Trace Spans"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReplay(item)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
                          title="Replay Execution"
                        >
                          <PlayCircle className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* TRACE INSPECT MODAL */}
      <Modal
        isOpen={!!selectedTrace}
        onClose={() => setSelectedTrace(null)}
        title={selectedTrace ? `Trace Details: ${selectedTrace.functionName}` : ''}
        maxWidth="max-w-3xl"
      >
        {selectedTrace && (
          <div className="space-y-4 font-mono text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div>
                <span className="text-[10px] text-slate-500 uppercase">Duration</span>
                <div className="text-sm font-bold text-cyan-400">{selectedTrace.durationMs}ms</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase">Provisioning</span>
                <div className="text-sm font-bold text-amber-400">{selectedTrace.isColdStart ? 'Cold Boot' : 'Warm Pool'}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase">Peak Memory</span>
                <div className="text-sm font-bold text-purple-400">{selectedTrace.memoryPeakMb || selectedTrace.memoryMb} MB</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase">Billed Cost</span>
                <div className="text-sm font-bold text-emerald-400">${selectedTrace.costUsd || '0.0000005'}</div>
              </div>
            </div>

            <div>
              <span className="font-bold text-white block mb-1">Trace ID:</span>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300">
                {selectedTrace.traceId}
              </div>
            </div>

            {/* Input Payload */}
            <div>
              <span className="font-bold text-white block mb-1">Input Ingress Event:</span>
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 overflow-x-auto max-h-40">
                {JSON.stringify(selectedTrace.inputPayload, null, 2)}
              </pre>
            </div>

            {/* Output Result */}
            <div>
              <span className="font-bold text-white block mb-1">Output Result Payload:</span>
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 overflow-x-auto max-h-48">
                {JSON.stringify(selectedTrace.outputResult, null, 2)}
              </pre>
            </div>

            <div className="pt-2 flex justify-end gap-2 font-sans">
              <Button
                variant="primary"
                size="sm"
                icon={PlayCircle}
                onClick={() => {
                  handleReplay(selectedTrace);
                  setSelectedTrace(null);
                }}
              >
                Replay in Execution Studio
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
