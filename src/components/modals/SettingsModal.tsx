import React, { useState } from 'react';
import { X, SlidersHorizontal, Cpu, Shield, Zap, Check } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiEngine: 'ollama' | 'gemini';
  onToggleAi: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  aiEngine,
  onToggleAi
}) => {
  const [rateLimitSpacing, setRateLimitSpacing] = useState('250ms');
  const [maxBatchSize, setMaxBatchSize] = useState('50');
  const [enableSmartRetry, setEnableSmartRetry] = useState(true);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#161c28] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0e131f]">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-[#c0c1ff]" />
            <h3 className="font-display font-bold text-[16px] text-[#dde2f3]">
              Autonomous Engine Settings
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1a202c] hover:bg-[#242a36] text-[#c7c4d7] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 font-telemetry text-[12px]">
          
          {/* AI Engine Selection */}
          <div className="p-3.5 rounded-xl bg-[#1a202c] border border-white/[0.06] flex items-center justify-between">
            <div>
              <span className="font-display font-bold text-[14px] text-[#dde2f3] block">
                Primary Inference Engine
              </span>
              <span className="text-[11px] text-[#c7c4d7]/70">
                {aiEngine === 'gemini' ? 'Gemini 3.8 Flash (Cloud)' : 'Ollama Qwen-2.5:3b (Local)'}
              </span>
            </div>

            <button
              onClick={onToggleAi}
              className="px-3 py-1.5 rounded-lg bg-[#242a36] hover:bg-[#343946] text-[#4cd7f6] font-semibold border border-[#4cd7f6]/30 transition-all"
            >
              Switch Engine
            </button>
          </div>

          {/* Rate Limiting */}
          <div className="space-y-1.5">
            <label className="text-[#c7c4d7]/70 uppercase font-semibold text-[10px]">
              API Dispatch Throttle
            </label>
            <select
              value={rateLimitSpacing}
              onChange={(e) => setRateLimitSpacing(e.target.value)}
              className="w-full bg-[#1a202c] text-[#dde2f3] p-2.5 rounded-lg border border-white/[0.08] focus:outline-none"
            >
              <option value="150ms">Aggressive (150ms delay)</option>
              <option value="250ms">Recommended (250ms delay)</option>
              <option value="500ms">Safe Anti-Ban Mode (500ms delay)</option>
            </select>
          </div>

          {/* Batch Size */}
          <div className="space-y-1.5">
            <label className="text-[#c7c4d7]/70 uppercase font-semibold text-[10px]">
              Max Concurrent Threads
            </label>
            <select
              value={maxBatchSize}
              onChange={(e) => setMaxBatchSize(e.target.value)}
              className="w-full bg-[#1a202c] text-[#dde2f3] p-2.5 rounded-lg border border-white/[0.08] focus:outline-none"
            >
              <option value="25">25 Threads / Cycle</option>
              <option value="50">50 Threads / Cycle</option>
              <option value="100">100 Threads / Cycle</option>
            </select>
          </div>

          {/* Smart Retry */}
          <label className="flex items-center gap-3 p-3 rounded-lg bg-[#1a202c] cursor-pointer border border-white/[0.04]">
            <input
              type="checkbox"
              checked={enableSmartRetry}
              onChange={(e) => setEnableSmartRetry(e.target.checked)}
              className="w-4 h-4 rounded text-[#8083ff] focus:ring-0"
            />
            <div className="flex flex-col">
              <span className="text-[#dde2f3] font-semibold">Autonomous SLA Rescheduling</span>
              <span className="text-[11px] text-[#c7c4d7]/70">Automatically bumps unopened DMs after 48 hours</span>
            </div>
          </label>

          {/* Save Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] font-bold text-[13px] transition-all flex items-center gap-1.5"
            >
              {saved ? <Check className="w-4 h-4" /> : null}
              <span>{saved ? 'Saved' : 'Save Configuration'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
