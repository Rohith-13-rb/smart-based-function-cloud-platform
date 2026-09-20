import React, { useState } from 'react';
import { useCloud } from '../context/CloudContext';
import { PipelineVisualizer } from '../components/execute/PipelineVisualizer';
import { PayloadEditor } from '../components/execute/PayloadEditor';
import { LogTerminal } from '../components/execute/LogTerminal';
import { Badge } from '../components/common/Badge';
import { PlayCircle, Sparkles } from 'lucide-react';

export function ExecutionView() {
  const {
    selectedFunction,
    setSelectedFunction,
    cloudFunctions,
    runExecution,
    isExecuting,
    currentPipelineStatus,
    executionHistory,
    navigateTo
  } = useCloud();

  const [isColdStart, setIsColdStart] = useState(false);
  const [latestExecutionRecord, setLatestExecutionRecord] = useState(() => executionHistory[0] || null);

  const handleExecute = async (payload, options) => {
    const result = await runExecution(payload, options);
    if (result) {
      setLatestExecutionRecord(result);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Function Picker Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan">Interactive Sandbox</Badge>
            <span className="text-xs font-mono text-slate-400">MicroVM Engine: Firecracker KVM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <PlayCircle className="w-7 h-7 text-cyan-400" /> Function Execution Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Execute serverless functions, observe real-time container sandboxing, stream live stdout telemetry, and analyze sub-millisecond FinOps metering.
          </p>
        </div>

        {/* Function Dropdown Selector */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Active Function:</span>
            <select
              value={selectedFunction.id}
              onChange={(e) => {
                const found = cloudFunctions.find(f => f.id === e.target.value);
                if (found) setSelectedFunction(found);
              }}
              className="bg-slate-900 border border-slate-700 text-slate-100 text-xs font-bold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-cyan-400 font-mono"
            >
              {cloudFunctions.map(fn => (
                <option key={fn.id} value={fn.id}>
                  {fn.name} ({fn.runtime})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 6-STAGE PIPELINE VISUALIZER */}
      <PipelineVisualizer
        currentStatus={currentPipelineStatus}
        isExecuting={isExecuting}
      />

      {/* TWO COLUMNS: PAYLOAD EDITOR & LOG TERMINAL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <PayloadEditor
          selectedFunction={selectedFunction}
          onExecute={handleExecute}
          isExecuting={isExecuting}
          isColdStart={isColdStart}
          setIsColdStart={setIsColdStart}
        />

        <LogTerminal
          currentExecution={latestExecutionRecord}
          currentStatus={currentPipelineStatus}
          isExecuting={isExecuting}
        />
      </div>
    </div>
  );
}
