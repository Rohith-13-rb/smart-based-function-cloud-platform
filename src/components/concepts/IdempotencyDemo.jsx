import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ShieldCheck, RefreshCw, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export function IdempotencyDemo() {
  const [useIdempotencyKey, setUseIdempotencyKey] = useState(true);
  const [bankBalance, setBankBalance] = useState(1000);
  const [processedTransactions, setProcessedTransactions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulateDuplicateWebhook = async () => {
    setIsProcessing(true);
    const orderId = `order_${Math.floor(Math.random() * 8999 + 1000)}`;
    const idempotencyKey = useIdempotencyKey ? `idem_key_${orderId}` : null;
    const amount = 50;

    // Simulate 3 network duplicate dispatches of the same payment event
    for (let attempt = 1; attempt <= 3; attempt++) {
      await new Promise(r => setTimeout(r, 400));

      const isDuplicate = idempotencyKey && processedTransactions.some(t => t.idempotencyKey === idempotencyKey);

      if (isDuplicate) {
        setProcessedTransactions(prev => [
          {
            id: Date.now() + attempt,
            attempt,
            orderId,
            idempotencyKey,
            action: 'IGNORED_DUPLICATE_IDEMPOTENT_HIT',
            amount: 0,
            status: 'SKIPPED'
          },
          ...prev
        ]);
      } else {
        setBankBalance(prev => prev - amount);
        setProcessedTransactions(prev => [
          {
            id: Date.now() + attempt,
            attempt,
            orderId,
            idempotencyKey,
            action: 'DEBIT_PROCESSED_SUCCESS',
            amount,
            status: 'DEBITED'
          },
          ...prev
        ]);
      }
    }

    setIsProcessing(false);
  };

  const handleReset = () => {
    setBankBalance(1000);
    setProcessedTransactions([]);
  };

  return (
    <GlassCard className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Idempotency & Exactly-Once Semantics Lab
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Simulate network retries and duplicate webhooks to see how idempotency keys prevent double billing.
          </p>
        </div>
        <Badge variant="emerald">Fault-Tolerance Pattern</Badge>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Controls */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Account Balance:</span>
            <span className="text-xl font-bold font-mono text-emerald-400">${bankBalance}.00</span>
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-slate-950 border border-slate-800">
            <input
              type="checkbox"
              checked={useIdempotencyKey}
              onChange={(e) => setUseIdempotencyKey(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 bg-slate-800 border-slate-700"
            />
            <div>
              <span className="text-xs font-bold text-white">Enable Redis Idempotency Lock</span>
              <span className="text-[11px] text-slate-400 block">
                {useIdempotencyKey ? 'Prevents duplicate debits on retried webhooks' : '⚠️ Disabled! Duplicate events will double-charge account!'}
              </span>
            </div>
          </label>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              loading={isProcessing}
              onClick={handleSimulateDuplicateWebhook}
              className="w-full text-xs"
            >
              Simulate 3x Retry Storm ($50 payment)
            </Button>

            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={handleReset}
              className="shrink-0"
              title="Reset"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Transaction Stream */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-xs max-h-56 overflow-y-auto">
          <div className="text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
            Audit Stream ({processedTransactions.length} events logged):
          </div>

          <div className="mt-2 space-y-2">
            {processedTransactions.length === 0 ? (
              <div className="text-slate-500 italic py-6 text-center text-xs">
                No transactions yet. Click "Simulate 3x Retry Storm" above.
              </div>
            ) : (
              processedTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className={`p-2 rounded-lg border text-[11px] flex items-center justify-between ${
                    tx.status === 'DEBITED' 
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-300' 
                      : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  <div>
                    <span className="font-bold">Attempt #{tx.attempt}: </span>
                    <span>{tx.action}</span>
                  </div>
                  <strong className="shrink-0">
                    {tx.status === 'DEBITED' ? `-$${tx.amount}` : 'IGNORED ($0)'}
                  </strong>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
