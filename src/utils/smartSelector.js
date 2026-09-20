import { CLOUD_FUNCTIONS } from '../data/functionsData';

/**
 * Smart Function Recommendation Engine
 */
export function recommendFunctions({
  domain = 'all',
  latencyRequirement = 'balanced', // 'ultra-low' | 'balanced' | 'batch'
  memoryRequirement = 'medium',    // 'low' (<=256) | 'medium' (512-1024) | 'high' (>=1536)
  triggerFilter = 'all',           // 'all' | 'http' | 'storage' | 'stream' | 'async'
  runtimeFilter = 'all'            // 'all' | 'python' | 'node' | 'go' | 'rust'
}) {
  return CLOUD_FUNCTIONS.map(fn => {
    let score = 70;
    const reasons = [];

    // Domain Match
    if (domain === 'all' || fn.domain === domain) {
      score += 15;
      reasons.push(`Perfect domain match for ${fn.category}`);
    } else {
      score -= 10;
    }

    // Latency Requirement Match
    if (latencyRequirement === 'ultra-low') {
      if (fn.warmExecutionMs < 50 || fn.runtime.includes('Rust') || fn.runtime.includes('Go')) {
        score += 12;
        reasons.push(`Sub-50ms execution profile matching ultra-low latency requirement`);
      } else {
        score -= 8;
      }
    } else if (latencyRequirement === 'batch') {
      if (fn.complexity === 'High' || fn.memoryMb >= 1024) {
        score += 10;
        reasons.push(`High throughput batch-oriented compute capacity`);
      }
    } else {
      score += 5;
    }

    // Memory Tier Match
    if (memoryRequirement === 'low' && fn.memoryMb <= 256) {
      score += 8;
      reasons.push(`Ultra-lean memory footprint (${fn.memoryMb} MB) minimizing GB-sec cost`);
    } else if (memoryRequirement === 'medium' && fn.memoryMb >= 512 && fn.memoryMb <= 1024) {
      score += 8;
      reasons.push(`Balanced compute & memory tier (${fn.memoryMb} MB)`);
    } else if (memoryRequirement === 'high' && fn.memoryMb >= 1536) {
      score += 8;
      reasons.push(`High-memory allocation (${fn.memoryMb} MB) with allocated multi-vCPU`);
    }

    // Trigger match
    if (triggerFilter !== 'all') {
      if (triggerFilter === 'http' && fn.triggerType.toLowerCase().includes('http')) {
        score += 6;
      } else if (triggerFilter === 'storage' && fn.triggerType.toLowerCase().includes('storage')) {
        score += 6;
      } else if (triggerFilter === 'stream' && fn.triggerType.toLowerCase().includes('stream')) {
        score += 6;
      }
    }

    // Runtime match
    if (runtimeFilter !== 'all') {
      if (fn.runtime.toLowerCase().includes(runtimeFilter.toLowerCase())) {
        score += 6;
        reasons.push(`Preferred runtime match (${fn.runtime})`);
      }
    }

    // Clamp score between 65 and 99
    const matchScore = Math.min(99, Math.max(62, score));

    return {
      ...fn,
      matchScore,
      reasons: reasons.slice(0, 3)
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
