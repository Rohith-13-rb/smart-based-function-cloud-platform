/**
 * Realistic Cloud Function Execution Simulator
 */

function generateTraceId() {
  const hex = () => Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
  return `1-${hex()}-${hex()}${hex()}`;
}

export async function simulateFunctionExecution(fn, payload, options = {}, onProgress = () => {}) {
  const { isColdStart = false } = options;
  const traceId = generateTraceId();
  const startTime = Date.now();
  const logs = [];

  const addLog = (stage, message, level = 'INFO') => {
    const elapsed = (Date.now() - startTime).toFixed(1);
    const entry = {
      timestamp: new Date().toISOString().substring(11, 23),
      elapsedMs: `${elapsed}ms`,
      stage,
      level,
      message
    };
    logs.push(entry);
    return entry;
  };

  // Helper delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // STAGE 1: Trigger Arrival & Ingress Verification
  onProgress({ stageId: 1, stageName: 'Trigger Arrival & Auth', progress: 15, currentLog: addLog('INGRESS', `[GATEWAY] Received ${fn.triggerType} trigger event with traceId=${traceId}`) });
  await delay(250);
  addLog('AUTH', `[IAM] Token validated. Tenant policy: AUTHORIZED (Scope: EXECUTE)`);

  // STAGE 2: Container Scheduler & Cold/Warm Provisioning
  const coldDelay = isColdStart ? fn.coldStartMs * 0.8 : 40;
  onProgress({
    stageId: 2,
    stageName: 'Scheduler & Sandbox Provisioning',
    progress: 35,
    currentLog: addLog('SCHEDULER', isColdStart 
      ? `[COLD-START] No warm sandbox available. Provisioning Firecracker microVM for ${fn.runtime}... (+${fn.coldStartMs}ms)`
      : `[WARM-HIT] Re-attaching warm microVM container instance #vm-${Math.floor(Math.random() * 9000 + 1000)}`)
  });
  await delay(coldDelay);
  if (isColdStart) {
    addLog('HYPERVISOR', `[KVM] MicroVM kernel booted in ${Math.round(fn.coldStartMs * 0.4)}ms. Mounting rootfs and ${fn.runtime} runtime binaries.`);
  }

  // STAGE 3: Resource Sandbox Binding
  onProgress({
    stageId: 3,
    stageName: 'Resource Allocation & Environment Binding',
    progress: 55,
    currentLog: addLog('RESOURCE', `[CGROUPS] Memory limit set to ${fn.memoryMb} MB, CPU share: ${fn.cpuShares}. Mounted /tmp (512MB).`)
  });
  await delay(200);

  // STAGE 4: User Code Execution & Log Streaming
  onProgress({
    stageId: 4,
    stageName: 'Executing Function Handler',
    progress: 75,
    currentLog: addLog('RUNTIME', `[START] RequestId: ${traceId} Version: $LATEST Handler: ${fn.id}`)
  });
  
  // Real or slightly randomized execution time
  const actualExecMs = Math.max(12, Math.round(fn.warmExecutionMs * (0.9 + Math.random() * 0.25)));
  await delay(Math.min(actualExecMs + 200, 600));

  addLog('USER_LOG', `[HANDLER] Ingested input payload. Parsing JSON structure (${JSON.stringify(payload).length} bytes)...`);
  addLog('USER_LOG', `[HANDLER] Executing algorithmic compute pipeline with ${fn.runtime}...`);
  await delay(200);

  // STAGE 5: Result Serialization
  onProgress({
    stageId: 5,
    stageName: 'Result Serialization & Packaging',
    progress: 90,
    currentLog: addLog('SERIALIZE', `[OUTPUT] Computation completed with status 200 OK. Encoding response payload.`)
  });
  await delay(180);

  // STAGE 6: Telemetry & FinOps Metrics Emission
  const totalDurationMs = Math.round((Date.now() - startTime) + actualExecMs);
  const billedDurationMs = Math.ceil(totalDurationMs);
  const memoryUsedMb = Math.round(fn.memoryMb * (0.4 + Math.random() * 0.35));
  const gbSeconds = ((fn.memoryMb / 1024) * (billedDurationMs / 1000));
  const estimatedCostUsd = (gbSeconds * 0.0000166667) + 0.0000002;

  const resultPayload = {
    ...fn.mockResult,
    _meta: {
      traceId,
      executionTimestamp: new Date().toISOString(),
      runtimeEnvironment: fn.runtime,
      coldStart: isColdStart,
      memoryAllocatedMb: fn.memoryMb,
      memoryPeakMb: memoryUsedMb,
      billedDurationMs,
      computedGbSeconds: Number(gbSeconds.toFixed(6)),
      estimatedCostUsd: Number(estimatedCostUsd.toFixed(8))
    }
  };

  addLog('TELEMETRY', `[REPORT] RequestId: ${traceId} Duration: ${totalDurationMs} ms Billed Duration: ${billedDurationMs} ms Memory Size: ${fn.memoryMb} MB Max Memory Used: ${memoryUsedMb} MB`);
  addLog('FINOPS', `[BILLING] Billed Units: ${gbSeconds.toFixed(6)} GB-s ($${estimatedCostUsd.toFixed(7)})`);

  const executionRecord = {
    id: `exec-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    traceId,
    functionId: fn.id,
    functionName: fn.name,
    category: fn.category,
    runtime: fn.runtime,
    status: 'SUCCESS',
    httpStatus: 200,
    timestamp: new Date().toISOString(),
    isColdStart,
    durationMs: totalDurationMs,
    billedDurationMs,
    memoryMb: fn.memoryMb,
    memoryPeakMb: memoryUsedMb,
    gbSeconds: Number(gbSeconds.toFixed(6)),
    costUsd: Number(estimatedCostUsd.toFixed(8)),
    logs,
    inputPayload: payload,
    outputResult: resultPayload
  };

  onProgress({
    stageId: 6,
    stageName: 'Telemetry Emitted & Completed',
    progress: 100,
    currentLog: addLog('COMPLETED', `[SUCCESS] Execution pipeline finished in ${totalDurationMs}ms.`)
  });

  return executionRecord;
}
