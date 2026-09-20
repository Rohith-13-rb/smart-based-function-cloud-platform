import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Code, Play, Flame, RefreshCw, Check, AlertCircle, Copy } from 'lucide-react';
import { RUNTIME_COLORS } from '../../data/functionsData';

export function PayloadEditor({
  selectedFunction,
  onExecute,
  isExecuting,
  isColdStart,
  setIsColdStart
}) {
  const [payloadText, setPayloadText] = useState('');
  const [jsonError, setJsonError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedFunction) {
      setPayloadText(JSON.stringify(selectedFunction.defaultPayload, null, 2));
      setJsonError(null);
    }
  }, [selectedFunction]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setPayloadText(val);
    try {
      JSON.parse(val);
      setJsonError(null);
    } catch (err) {
      setJsonError(err.message);
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(payloadText);
      setPayloadText(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (err) {
      setJsonError("Cannot format invalid JSON");
    }
  };

  const handleReset = () => {
    setPayloadText(JSON.stringify(selectedFunction.defaultPayload, null, 2));
    setJsonError(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(payloadText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    try {
      const parsed = JSON.parse(payloadText);
      onExecute(parsed, { isColdStart });
    } catch (err) {
      setJsonError("Please fix the JSON syntax before triggering execution.");
    }
  };

  const runtimeBadgeClass = RUNTIME_COLORS[selectedFunction.runtime] || 'bg-slate-800 text-slate-300';

  return (
    <GlassCard className="p-6 flex flex-col justify-between h-full">
      <div>
        {/* Function Meta Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{selectedFunction.name}</h3>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${runtimeBadgeClass}`}>
                {selectedFunction.runtime}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{selectedFunction.description}</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
              Allocated: <strong className="text-cyan-400">{selectedFunction.memoryMb} MB</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
              vCPU: <strong className="text-purple-400">{selectedFunction.cpuShares}</strong>
            </span>
          </div>
        </div>

        {/* Cold Start Simulator Toggle */}
        <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isColdStart ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Force Cold Start Simulation</div>
              <div className="text-[11px] text-slate-400">
                {isColdStart 
                  ? `Simulates microVM boot & container spin-up (+${selectedFunction.coldStartMs}ms penalty)` 
                  : 'Hits warm container pool (sub-millisecond boot latency)'}
              </div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isColdStart}
              onChange={(e) => setIsColdStart(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        {/* JSON Editor Controls */}
        <div className="mt-4 flex items-center justify-between text-xs">
          <label className="font-bold text-slate-300 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-cyan-400" /> Event Ingress Payload (JSON):
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-white flex items-center gap-1 hover:bg-slate-800 px-2 py-1 rounded transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleFormat}
              className="text-slate-400 hover:text-white flex items-center gap-1 hover:bg-slate-800 px-2 py-1 rounded transition-colors"
            >
              Format
            </button>
            <button
              onClick={handleReset}
              className="text-slate-400 hover:text-white flex items-center gap-1 hover:bg-slate-800 px-2 py-1 rounded transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Textarea for JSON */}
        <div className="mt-2 relative">
          <textarea
            value={payloadText}
            onChange={handleTextChange}
            rows={9}
            className="w-full rounded-xl bg-slate-950/90 border border-slate-800 p-3 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 resize-none transition-all"
            placeholder="Enter JSON payload..."
            spellCheck="false"
          />
          {jsonError && (
            <div className="mt-1.5 flex items-center gap-1.5 text-rose-400 text-xs bg-rose-950/30 p-2 rounded-lg border border-rose-900/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="font-mono text-[11px] truncate">{jsonError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Execution Trigger Bar */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Trigger Method: <strong className="text-slate-200">{selectedFunction.triggerType}</strong>
        </div>

        <Button
          variant={isColdStart ? 'gradient-pink' : 'primary'}
          size="md"
          icon={Play}
          loading={isExecuting}
          onClick={handleSubmit}
          className="shadow-lg"
        >
          {isExecuting ? 'Simulating Pipeline...' : isColdStart ? 'Execute (Cold Boot)' : 'Execute Function'}
        </Button>
      </div>
    </GlassCard>
  );
}
