import React, { useState } from 'react';
import { ColdStartSimulator } from '../components/concepts/ColdStartSimulator';
import { ServerlessQuiz } from '../components/concepts/ServerlessQuiz';
import { IdempotencyDemo } from '../components/concepts/IdempotencyDemo';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { SERVERLESS_CONCEPTS } from '../data/conceptsData';
import { GraduationCap, Flame, ShieldCheck, Award, BookOpen, CheckCircle2 } from 'lucide-react';

export function ConceptLabView() {
  const [activeConceptTab, setActiveConceptTab] = useState('benchmarks'); // 'benchmarks' | 'idempotency' | 'quiz' | 'handbook'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple">Academic & Research Studio</Badge>
            <span className="text-xs font-mono text-slate-400">Course: Distributed Cloud Systems</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-purple-400" /> Serverless Concept Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Interactive CSE cloud computing laboratory exploring microVM cold starts, idempotency patterns, and serverless assessment testing.
          </p>
        </div>

        {/* Lab Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveConceptTab('benchmarks')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeConceptTab === 'benchmarks' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Cold Start Lab
          </button>
          <button
            onClick={() => setActiveConceptTab('idempotency')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeConceptTab === 'idempotency' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Idempotency Demo
          </button>
          <button
            onClick={() => setActiveConceptTab('quiz')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeConceptTab === 'quiz' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Knowledge Quiz
          </button>
          <button
            onClick={() => setActiveConceptTab('handbook')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeConceptTab === 'handbook' ? 'bg-pink-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Theory Handbook
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE LAB MODULE */}
      {activeConceptTab === 'benchmarks' && <ColdStartSimulator />}
      {activeConceptTab === 'idempotency' && <IdempotencyDemo />}
      {activeConceptTab === 'quiz' && <ServerlessQuiz />}

      {/* THEORY HANDBOOK SECTION */}
      {activeConceptTab === 'handbook' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVERLESS_CONCEPTS.map((concept) => (
            <GlassCard key={concept.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${concept.color}`}>
                    {concept.tag}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">{concept.category}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{concept.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{concept.summary}</p>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Principles:</span>
                  {concept.keyPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {concept.benchmarkComparison && (
                <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] font-mono">
                  <div className="text-slate-400 mb-1">Cold vs Warm Runtime Benchmarks:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.entries(concept.benchmarkComparison).map(([lang, stats]) => (
                      <div key={lang} className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="font-bold text-white uppercase">{lang}</span>
                        <div className="text-amber-400">Cold: {stats.cold}</div>
                        <div className="text-emerald-400">Warm: {stats.warm}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
