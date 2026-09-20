/**
 * Cloud Serverless Pricing Rates (Standard Global Tier - Tier 1)
 */
export const PRICING_CONSTANTS = {
  AWS: {
    name: 'AWS Lambda (x86/Arm Graviton2 avg)',
    costPerMillionRequests: 0.20,
    costPerGbSecond: 0.0000166667,
    freeTierRequests: 1000000,
    freeTierGbSeconds: 400000,
    egressPerGb: 0.09,
    color: '#F59E0B' // Amber
  },
  GCP: {
    name: 'Google Cloud Functions (2nd Gen)',
    costPerMillionRequests: 0.40,
    costPerGbSecond: 0.00001650,
    costPerGhzSecond: 0.00002400,
    freeTierRequests: 2000000,
    freeTierGbSeconds: 400000,
    egressPerGb: 0.085,
    color: '#06B6D4' // Cyan
  },
  AZURE: {
    name: 'Azure Functions (Consumption Plan)',
    costPerMillionRequests: 0.20,
    costPerGbSecond: 0.000016,
    freeTierRequests: 1000000,
    freeTierGbSeconds: 400000,
    egressPerGb: 0.087,
    color: '#8B5CF6' // Purple
  }
};

/**
 * Computes estimated cloud costs across AWS, GCP, Azure and compares with a Traditional 24/7 EC2 VM.
 */
export function calculateCloudCosts({
  monthlyRequests = 2000000,
  durationMs = 150,
  memoryMb = 512,
  dataTransferGb = 10,
  applyFreeTier = true
}) {
  const durationSeconds = durationMs / 1000;
  const memoryGb = memoryMb / 1024;
  const totalGbSeconds = monthlyRequests * durationSeconds * memoryGb;

  const results = {};

  Object.entries(PRICING_CONSTANTS).forEach(([providerKey, provider]) => {
    // 1. Invocations Cost
    const billableRequests = applyFreeTier 
      ? Math.max(0, monthlyRequests - provider.freeTierRequests)
      : monthlyRequests;
    const requestCost = (billableRequests / 1000000) * provider.costPerMillionRequests;

    // 2. Compute (GB-s) Cost
    const billableGbSeconds = applyFreeTier
      ? Math.max(0, totalGbSeconds - provider.freeTierGbSeconds)
      : totalGbSeconds;
    const computeCost = billableGbSeconds * provider.costPerGbSecond;

    // 3. Egress Network Cost
    const egressCost = dataTransferGb * provider.egressPerGb;

    const totalCost = requestCost + computeCost + egressCost;

    results[providerKey] = {
      name: provider.name,
      requestCost: Number(requestCost.toFixed(4)),
      computeCost: Number(computeCost.toFixed(4)),
      egressCost: Number(egressCost.toFixed(4)),
      totalCost: Number(totalCost.toFixed(2)),
      totalGbSeconds: Math.round(totalGbSeconds),
      color: provider.color
    };
  });

  // Equivalent 24/7 Monolith Virtual Machine (e.g. 2 x AWS t4g.medium instances + load balancer)
  const traditionalServerCost = 28.50 + (dataTransferGb * 0.09) + 16.20; // 2 instances + ALB + network
  const avgServerlessCost = (results.AWS.totalCost + results.GCP.totalCost + results.AZURE.totalCost) / 3;
  const monthlySavings = Math.max(0, traditionalServerCost - avgServerlessCost);
  const savingsPercent = traditionalServerCost > 0 ? Math.round((monthlySavings / traditionalServerCost) * 100) : 0;

  return {
    providers: results,
    metrics: {
      monthlyRequests,
      durationMs,
      memoryMb,
      dataTransferGb,
      totalGbSeconds: Math.round(totalGbSeconds),
      traditionalServerCost: Number(traditionalServerCost.toFixed(2)),
      monthlySavings: Number(monthlySavings.toFixed(2)),
      savingsPercent
    }
  };
}
