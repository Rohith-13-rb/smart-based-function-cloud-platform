import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { QUIZ_QUESTIONS } from '../../data/conceptsData';
import { GraduationCap, Award, CheckCircle, XCircle, RefreshCw, ChevronRight, Check } from 'lucide-react';

export function ServerlessQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('CSE Student');
  const [showCertificate, setShowCertificate] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setShowCertificate(false);
  };

  // Calculate score
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach(q => {
    if (selectedAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = scorePercentage >= 70;

  return (
    <GlassCard className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-400" /> Serverless Cloud Computing Knowledge Assessment
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Test your understanding of FaaS architecture, cold starts, concurrency models, and FinOps billing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="purple">CSE-702 Module</Badge>
          <span className="text-xs font-mono text-cyan-400">
            {isSubmitted ? `Score: ${scorePercentage}%` : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
          </span>
        </div>
      </div>

      {!isSubmitted ? (
        <div className="mt-6">
          {/* Question Text */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-mono text-cyan-400 font-bold">QUESTION {currentQuestionIndex + 1}:</span>
            <h4 className="text-sm sm:text-base font-bold text-white mt-1 leading-snug">
              {currentQ.question}
            </h4>
          </div>

          {/* Options Grid */}
          <div className="mt-4 space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected 
                      ? 'bg-cyan-950/40 border-cyan-400/60 text-white shadow-md shadow-cyan-500/10' 
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 font-mono text-[10px] font-bold ${
                    isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950' : 'border-slate-700 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>

            <div className="flex gap-1">
              {QUIZ_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === currentQuestionIndex 
                      ? 'bg-cyan-400' 
                      : selectedAnswers[QUIZ_QUESTIONS[i].id] !== undefined 
                        ? 'bg-purple-500' 
                        : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button
                variant="primary"
                size="sm"
                icon={ChevronRight}
                iconPosition="right"
                onClick={handleNext}
                disabled={selectedAnswers[currentQ.id] === undefined}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="gradient-purple"
                size="sm"
                icon={Check}
                onClick={handleFinish}
                disabled={selectedAnswers[currentQ.id] === undefined}
              >
                Submit Assessment
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="mt-6 space-y-6">
          <div className={`p-6 rounded-2xl border text-center ${
            isPassed 
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' 
              : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
          }`}>
            <Award className="w-12 h-12 mx-auto mb-2 text-current" />
            <h4 className="text-xl font-extrabold text-white">
              {isPassed ? 'Assessment Passed! 🎉' : 'Assessment Completed'}
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              You scored <strong className="text-white text-base">{correctCount}</strong> out of <strong className="text-white text-base">{totalQuestions}</strong> ({scorePercentage}%)
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {isPassed && (
                <Button
                  variant="primary"
                  size="sm"
                  icon={Award}
                  onClick={() => setShowCertificate(true)}
                >
                  View Certificate of Completion
                </Button>
              )}
              <Button
                variant="secondary"
                size="sm"
                icon={RefreshCw}
                onClick={handleReset}
              >
                Retake Quiz
              </Button>
            </div>
          </div>

          {/* Question by question review */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detailed Question Review & Explanations:</h4>
            {QUIZ_QUESTIONS.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;

              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-white">
                      Q{idx + 1}: {q.question}
                    </span>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px] shrink-0">
                        <CheckCircle className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-400 font-mono text-[11px] shrink-0">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-300 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-cyan-400 font-bold">Explanation: </span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-xl w-full p-8 rounded-3xl bg-[#0F172A] border-2 border-cyan-400/60 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center mx-auto text-cyan-400">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-[11px] uppercase tracking-widest font-mono text-cyan-400 font-bold block">
              CERTIFICATE OF COMPLETION
            </span>

            <h3 className="text-2xl font-black text-white">Smart-Based Function Cloud Platform</h3>

            <p className="text-xs text-slate-400">
              This acknowledges that the student has successfully demonstrated theoretical and operational mastery of Serverless Architecture, MicroVMs, Cold Starts, and FinOps Metrics.
            </p>

            <div className="py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Final Score: <strong className="text-emerald-400">{scorePercentage}%</strong></span>
              <span className="text-slate-400">Status: <strong className="text-cyan-400">CERTIFIED</strong></span>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowCertificate(false)}
              className="mt-4"
            >
              Close Certificate
            </Button>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
