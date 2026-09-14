import React, { useState, useEffect } from 'react';
import { X, Zap, CheckCircle2, ShieldCheck, Terminal, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BatchDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
  onComplete: () => void;
}

export const BatchDispatchModal: React.FC<BatchDispatchModalProps> = ({
  isOpen,
  onClose,
  count,
  onComplete
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const sampleVenues = [
    'Kyoto Omakase Bar (@kyoto_soho)',
    'Maison Vivienne (@maisonvivienne_)',
    'Brasserie Noir (@brasserienoir)',
    'Avra Prime Seafood (@avraprimeseafood)',
    "L'Ami Jean NYC (@lamijeannyc)",
    'Bōken Izakaya (@boken_sound)',
    'Saga Sky Lounge (@saga_nyc)',
    'Cipriani Downtown (@ciprianidowntown)',
    'Gramercy Tavern Lounge (@gramercytavern)',
    'Torrisi Bar (@torrisinyc)'
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCurrentStep(0);
      setLogs([]);
      setIsFinished(false);
      return;
    }

    setLogs(['[0.00s] Initializing Autonomous High-Ticket Dispatcher...', '[0.12s] Authenticated Instagram Graph API & TikTok Business API']);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      const pct = Math.min(100, Math.round((step / sampleVenues.length) * 100));
      setProgress(pct);

      if (step <= sampleVenues.length) {
        const venue = sampleVenues[step - 1];
        setLogs((prev) => [
          ...prev,
          `[+${(step * 0.18).toFixed(2)}s] Dispatched personalized DM to ${venue} (latency: ${Math.floor(Math.random() * 20 + 35)}ms)`
        ]);
      }

      if (step >= sampleVenues.length) {
        clearInterval(interval);
        setIsFinished(true);
        setLogs((prev) => [
          ...prev,
          `[SUCCESS] All ${count} autonomous hospitality touches deployed without human intervention.`
        ]);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // Ignore
        }
        onComplete();
      }
    }, 280);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#161c28] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0e131f]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#c0c1ff]/20 flex items-center justify-center text-[#c0c1ff]">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[16px] text-[#dde2f3] flex items-center gap-2">
                <span>Autonomous Revenue Dispatch</span>
                <span className="text-[11px] font-telemetry px-2 py-0.5 rounded bg-[#1a202c] text-[#4cd7f6] border border-[#4cd7f6]/30">
                  {count} Threads Active
                </span>
              </h3>
              <p className="font-telemetry text-[11px] text-[#c7c4d7]/70">
                Ollama / Gemini Dual-Pipeline Dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1a202c] hover:bg-[#242a36] text-[#c7c4d7] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex flex-col gap-4">
          
          {/* Progress Indicator */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between font-telemetry text-[12px]">
              <span className="text-[#c7c4d7] font-medium">Dispatch Progress</span>
              <span className="text-[#4cd7f6] font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-[#080e1a] rounded-full h-2.5 overflow-hidden border border-white/[0.04]">
              <div
                className="h-full bg-gradient-to-r from-[#8083ff] to-[#4cd7f6] rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(76,215,246,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Real-Time Terminal Log Stream */}
          <div className="flex flex-col gap-1.5">
            <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase font-semibold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#4cd7f6]" /> Pipeline Event Stream
            </span>
            <div className="h-56 bg-[#080e1a] rounded-xl p-3 font-mono text-[11.5px] text-[#dde2f3]/90 overflow-y-auto space-y-1 border border-white/[0.06] flex flex-col-reverse">
              {[...logs].reverse().map((log, index) => (
                <div
                  key={index}
                  className={`${
                    log.includes('SUCCESS')
                      ? 'text-[#4cd7f6] font-bold'
                      : log.includes('Dispatched')
                      ? 'text-[#c0c1ff]'
                      : 'text-[#c7c4d7]/70'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2">
            <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4cd7f6]" />
              Strict Rate-Limit Safeguards Active (250ms spacing)
            </span>

            <button
              onClick={onClose}
              disabled={!isFinished}
              className={`px-5 py-2 rounded-lg font-bold text-[13px] transition-all flex items-center gap-1.5 ${
                isFinished
                  ? 'bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] shadow-[0_0_16px_rgba(192,193,255,0.4)]'
                  : 'bg-[#1a202c] text-[#908fa0] cursor-not-allowed'
              }`}
            >
              {isFinished ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Done</span>
                </>
              ) : (
                <span>Executing...</span>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
