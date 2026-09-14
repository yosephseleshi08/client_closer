import React, { useState } from 'react';
import { Sparkles, Gauge, ShieldCheck, Send, RefreshCw, Edit3, CheckCircle2 } from 'lucide-react';
import { QueuedCopilotAction } from '../types';

interface AICopilotLivePulseProps {
  queue: QueuedCopilotAction[];
  onDeploy: (action: QueuedCopilotAction) => void;
  onRegenerate: (action: QueuedCopilotAction) => Promise<void>;
  onEdit: (action: QueuedCopilotAction) => void;
  aiEngine: 'ollama' | 'gemini';
  isRegenerating: boolean;
}

export const AICopilotLivePulse: React.FC<AICopilotLivePulseProps> = ({
  queue,
  onDeploy,
  onRegenerate,
  onEdit,
  aiEngine,
  isRegenerating
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeploying, setIsDeploying] = useState(false);
  const [justDeployed, setJustDeployed] = useState(false);

  const currentAction = queue[currentIndex] || queue[0];

  if (!currentAction) {
    return (
      <div className="rounded-xl bg-[#161c28]/80 backdrop-blur-xl p-5 border border-white/[0.08] shadow-xl text-center py-10">
        <Sparkles className="w-8 h-8 text-[#4cd7f6] mx-auto mb-2" />
        <h3 className="font-display font-bold text-lg text-[#dde2f3]">Queue All Clear</h3>
        <p className="text-[13px] text-[#c7c4d7]/70 mt-1">All high-priority hospitality follow-ups dispatched.</p>
      </div>
    );
  }

  const handleDeployClick = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setJustDeployed(true);
      onDeploy(currentAction);

      setTimeout(() => {
        setJustDeployed(false);
        if (queue.length > 1) {
          setCurrentIndex((prev) => (prev + 1) % queue.length);
        }
      }, 1400);
    }, 600);
  };

  return (
    <div className="rounded-xl bg-[#161c28]/80 backdrop-blur-xl p-4 sm:p-5 border border-white/[0.08] shadow-xl flex flex-col gap-3.5">
      
      {/* Pulse Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
          <span className="font-display text-[16px] text-[#dde2f3] font-bold">
            AI Copilot Live Pulse
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1a202c] text-[#4cd7f6] font-telemetry text-[10px] border border-[#4cd7f6]/30">
          <span>{aiEngine === 'gemini' ? 'Gemini 3.8 Flash' : 'Ollama qwen2.5:3b'}</span>
        </div>
      </div>

      {/* Latency & Confidence Metrics */}
      <div className="grid grid-cols-2 gap-2 font-telemetry text-[11px]">
        <div className="p-2 rounded bg-[#1a202c] flex flex-col border border-white/[0.04]">
          <span className="text-[#c7c4d7]/60 text-[9px] uppercase font-semibold">INFERENCE LATENCY</span>
          <span className="text-[#dde2f3] font-bold flex items-center gap-1 mt-0.5">
            <Gauge className="w-3.5 h-3.5 text-[#4cd7f6]" /> 42ms
          </span>
        </div>

        <div className="p-2 rounded bg-[#1a202c] flex flex-col border border-white/[0.04]">
          <span className="text-[#c7c4d7]/60 text-[9px] uppercase font-semibold">AUTONOMOUS CONFIDENCE</span>
          <span className="text-[#dde2f3] font-bold flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c0c1ff]" /> 99.4%
          </span>
        </div>
      </div>

      {/* Queued Action Card */}
      <div className="p-3.5 rounded-lg bg-[#242a36]/70 border border-white/[0.06] flex flex-col gap-3">
        
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded bg-[#571bc1] text-[#c4abff] font-telemetry text-[10px] uppercase font-bold border border-[#c4abff]/30">
            {currentAction.badge}
          </span>
          <span className="font-telemetry text-[11px] text-[#c7c4d7]/70">
            {currentAction.stageName}
          </span>
        </div>

        {/* Restaurant Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-[#2f3542] border border-white/[0.1]">
            <img
              src={currentAction.imageUrl}
              alt={currentAction.restaurantName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display text-[15px] font-bold text-[#dde2f3] truncate">
              {currentAction.restaurantName}
            </span>
            <span className="font-telemetry text-[11px] text-[#4cd7f6] truncate">
              {currentAction.handle} • {currentAction.subBadge}
            </span>
          </div>
        </div>

        {/* Generated DM Box */}
        <div className="p-3 rounded bg-[#080e1a] text-[#c7c4d7] text-[12px] leading-relaxed border border-white/[0.04]">
          <p className="text-[#dde2f3] font-semibold mb-1 flex items-center gap-1.5 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#c0c1ff]" /> Generated Casual DM:
          </p>
          <p className="italic text-[#dde2f3]/90 font-mono text-[11.5px]">
            {isRegenerating ? (
              <span className="inline-flex items-center gap-1 text-[#4cd7f6]">
                <RefreshCw className="w-3 h-3 animate-spin" /> Synthesizing fresh angle...
              </span>
            ) : (
              currentAction.generatedDM
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-0.5">
          <button
            onClick={handleDeployClick}
            disabled={isDeploying || justDeployed}
            className={`flex-1 py-2 rounded-lg text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${
              justDeployed
                ? 'bg-[#4cd7f6] text-[#003640]'
                : 'bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] shadow-[#c0c1ff]/20'
            }`}
          >
            {isDeploying ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#1000a9] border-t-transparent rounded-full animate-spin"></span>
                <span>Deploying to IG API...</span>
              </>
            ) : justDeployed ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Dispatched to {currentAction.restaurantName}!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 fill-current" />
                <span>Deploy Message</span>
              </>
            )}
          </button>

          {/* Regenerate Button */}
          <button
            onClick={() => onRegenerate(currentAction)}
            disabled={isRegenerating}
            className="p-2 rounded-lg bg-[#1a202c] hover:bg-[#343946] text-[#dde2f3] border border-white/[0.08] transition-all flex items-center justify-center"
            title="Regenerate with AI"
          >
            <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin text-[#4cd7f6]' : ''}`} />
          </button>

          {/* Edit Draft Button */}
          <button
            onClick={() => onEdit(currentAction)}
            className="p-2 rounded-lg bg-[#1a202c] hover:bg-[#343946] text-[#dde2f3] border border-white/[0.08] transition-all flex items-center justify-center"
            title="Customize & Edit Draft"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
