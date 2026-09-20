import React, { createContext, useContext, useState, useEffect } from 'react';
import { CLOUD_FUNCTIONS } from '../data/functionsData';
import { simulateFunctionExecution } from '../utils/executionSimulator';

const CloudContext = createContext(null);

const INITIAL_HISTORY = [
  {
    id: 'exec-init-1',
    traceId: '1-65fd21a0-89bc32d1ef894101',
    functionId: 'fn-sentiment-ai',
    functionName: 'NLP Sentiment Analyzer',
    category: 'AI & Machine Learning',
    runtime: 'Python 3.11',
    status: 'SUCCESS',
    httpStatus: 200,
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    isColdStart: false,
    durationMs: 74,
    billedDurationMs: 74,
    memoryMb: 512,
    memoryPeakMb: 242,
    gbSeconds: 0.037,
    costUsd: 0.00000062,
    inputPayload: { text: "Cloud function latency dropped by 45%!" },
    outputResult: { sentiment: "POSITIVE", confidence: 0.942 }
  },
  {
    id: 'exec-init-2',
    traceId: '1-65fd2177-33fa88d9bc412398',
    functionId: 'fn-image-thumbnailer',
    functionName: 'Smart Image Resizer & Optimizer',
    category: 'Media Processing',
    runtime: 'Node.js 20.x',
    status: 'SUCCESS',
    httpStatus: 200,
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    isColdStart: true,
    durationMs: 350,
    billedDurationMs: 350,
    memoryMb: 1024,
    memoryPeakMb: 480,
    gbSeconds: 0.35,
    costUsd: 0.00000583,
    inputPayload: { object_key: "hero-showcase-4k.png", target_format: "webp" },
    outputResult: { status: "SUCCESS", compressionRatio: "94.6%" }
  },
  {
    id: 'exec-init-3',
    traceId: '1-65fd2150-11ff99aa3312bb44',
    functionId: 'fn-iot-telemetry',
    functionName: 'IoT Telemetry Stream Anomaly Detector',
    category: 'Data & Stream Processing',
    runtime: 'Go 1.22',
    status: 'SUCCESS',
    httpStatus: 200,
    timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    isColdStart: false,
    durationMs: 19,
    billedDurationMs: 19,
    memoryMb: 256,
    memoryPeakMb: 68,
    gbSeconds: 0.00475,
    costUsd: 0.00000008,
    inputPayload: { device_id: "TURBINE-SENSOR-X9", metrics: { temperature_c: 84.5 } },
    outputResult: { anomaly_detected: true, z_score: 3.42 }
  },
  {
    id: 'exec-init-4',
    traceId: '1-65fd20f0-44ee8812bb33cc11',
    functionId: 'fn-auth-token',
    name: 'Zero-Trust JWT Token Validator',
    functionName: 'Zero-Trust JWT Token Validator',
    category: 'Security & Auth',
    runtime: 'Rust / WASM',
    status: 'SUCCESS',
    httpStatus: 200,
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    isColdStart: false,
    durationMs: 9,
    billedDurationMs: 9,
    memoryMb: 128,
    memoryPeakMb: 24,
    gbSeconds: 0.00112,
    costUsd: 0.00000002,
    inputPayload: { auth_header: "Bearer eyJhbGci..." },
    outputResult: { is_authorized: true, policy_decision: "ALLOW" }
  },
  {
    id: 'exec-init-5',
    traceId: '1-65fd20a1-77bb5511aa22dd33',
    functionId: 'fn-pdf-generator',
    name: 'PDF Invoice & Report Generator',
    functionName: 'PDF Invoice & Report Generator',
    category: 'Document Automation',
    runtime: 'Node.js 20.x',
    status: 'SUCCESS',
    httpStatus: 200,
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    isColdStart: true,
    durationMs: 680,
    billedDurationMs: 680,
    memoryMb: 1536,
    memoryPeakMb: 890,
    gbSeconds: 1.02,
    costUsd: 0.00001700,
    inputPayload: { invoice_number: "INV-2026-0982", total: 25.10 },
    outputResult: { status: "RENDERED", file_size_kb: 412.8 }
  }
];

export function CloudProvider({ children }) {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'dashboard' | 'selector' | 'execute' | 'monitor' | 'history' | 'pricing' | 'architecture' | 'concept-lab'
  const [selectedFunction, setSelectedFunction] = useState(CLOUD_FUNCTIONS[0]);
  const [executionHistory, setExecutionHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_cloud_history');
      return saved ? JSON.parse(saved) : INITIAL_HISTORY;
    } catch {
      return INITIAL_HISTORY;
    }
  });

  const [isExecuting, setIsExecuting] = useState(false);
  const [currentPipelineStatus, setCurrentPipelineStatus] = useState(null);
  const [liveMetrics, setLiveMetrics] = useState({
    totalInvocations: 1248920,
    successRate: 99.86,
    avgLatencyMs: 64,
    activeInstances: 18,
    warmRatio: 94.2,
    estimatedHourlyCost: 0.142
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smart_cloud_history', JSON.stringify(executionHistory));
    } catch (e) {
      console.warn("Local storage save failed", e);
    }
  }, [executionHistory]);

  // Periodic subtle live metric simulation for vitality
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        totalInvocations: prev.totalInvocations + Math.floor(Math.random() * 4 + 1),
        avgLatencyMs: Math.round(62 + Math.random() * 6),
        activeInstances: Math.min(48, Math.max(12, prev.activeInstances + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Quick navigation helper
  const navigateTo = (tab, functionToSelect = null) => {
    if (functionToSelect) {
      const found = CLOUD_FUNCTIONS.find(f => f.id === functionToSelect.id || f.id === functionToSelect);
      if (found) setSelectedFunction(found);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger Execution
  const runExecution = async (customPayload = null, options = {}) => {
    if (isExecuting) return;
    setIsExecuting(true);
    setCurrentPipelineStatus({ stageId: 0, stageName: 'Initializing request...', progress: 5, currentLog: null });

    const payload = customPayload || selectedFunction.defaultPayload;

    try {
      const record = await simulateFunctionExecution(
        selectedFunction,
        payload,
        options,
        (progressState) => {
          setCurrentPipelineStatus(progressState);
        }
      );

      setExecutionHistory(prev => [record, ...prev]);
      setLiveMetrics(prev => ({
        ...prev,
        totalInvocations: prev.totalInvocations + 1,
        avgLatencyMs: Math.round((prev.avgLatencyMs * 0.95) + (record.durationMs * 0.05))
      }));
      return record;
    } catch (err) {
      console.error("Execution error", err);
    } finally {
      setIsExecuting(false);
    }
  };

  const clearHistory = () => {
    setExecutionHistory([]);
  };

  const resetToSampleHistory = () => {
    setExecutionHistory(INITIAL_HISTORY);
  };

  return (
    <CloudContext.Provider value={{
      activeTab,
      setActiveTab,
      navigateTo,
      selectedFunction,
      setSelectedFunction,
      executionHistory,
      setExecutionHistory,
      isExecuting,
      currentPipelineStatus,
      runExecution,
      liveMetrics,
      clearHistory,
      resetToSampleHistory,
      cloudFunctions: CLOUD_FUNCTIONS
    }}>
      {children}
    </CloudContext.Provider>
  );
}

export function useCloud() {
  const context = useContext(CloudContext);
  if (!context) {
    throw new Error('useCloud must be used within a CloudProvider');
  }
  return context;
}
