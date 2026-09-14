import React, { useState } from 'react';
import { Sparkles, Send, RefreshCw, Bot, Shield, Check, Copy, Sliders, MessageSquare } from 'lucide-react';
import { UrgentTarget, QueuedCopilotAction } from '../../types';

interface CopilotViewProps {
  queue: QueuedCopilotAction[];
  targets: UrgentTarget[];
  onDeployAction: (action: QueuedCopilotAction) => void;
  aiEngine: 'ollama' | 'gemini';
}

export const CopilotView: React.FC<CopilotViewProps> = ({
  queue,
  targets,
  onDeployAction,
  aiEngine
}) => {
  const [selectedTarget, setSelectedTarget] = useState<UrgentTarget>(targets[0]);
  const [tone, setTone] = useState<'casual_gourmet' | 'direct_roi' | 'founder'>('casual_gourmet');
  const [generatedDraft, setGeneratedDraft] = useState(
    `Hey Chef Luigi! Saw your weekend truffle gnocchi drop blew up. Built you a sleek reservation funnel demo so guests book directly off Instagram rather than third-party platforms. Check it here?`
  );
  const [customInstructions, setCustomInstructions] = useState('Emphasize avoiding third-party platform cuts and mention our 30-second Figma mockup.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantName: selectedTarget.name,
          handle: selectedTarget.handle,
          platform: selectedTarget.platform,
          cuisine: selectedTarget.cuisine,
          stage: selectedTarget.sequenceStage,
          tone,
          details: customInstructions
        })
      });
      const data = await res.json();
      if (data && data.message) {
        setGeneratedDraft(data.message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      onDeployAction({
        restaurantName: selectedTarget.name,
        handle: selectedTarget.handle,
        badge: 'DISPATCHED',
        subBadge: selectedTarget.location,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS80IKfg2fiqc5SDH5MMCUug_JF34UiYwTr2m-pCuq23LLLKPtJ_KniRyA3ZjWGGF-gF1Kz0KGoCE0qxhm1BWxPbwIH9iVZ8nPRTjBuo-VkP1dme_cNGxHroTzwr3l_YQeCnfCVTWakUd-LkWq5cYzHI6CCeZ2MTlgWEyA_BJdb18wnYDJDD9FT8-4nKUjrrsx8PpBkX2hpjjHpHf7q8eqL2sWDaiZ0S2Us8sZCoEVCj39Se9dSMl8',
        stageName: selectedTarget.sequenceStage,
        generatedDM: generatedDraft,
        cuisine: selectedTarget.cuisine,
        suggestedFollowupDate: 'Today',
        hookAngle: 'AI Copilot Custom Delivery'
      });
      setTimeout(() => setSent(false), 2000);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1728px] mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#161c28]/90 border border-white/[0.08] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8083ff]/20 flex items-center justify-center text-[#c0c1ff] border border-[#c0c1ff]/30">
            <Bot className="w-5 h-5 text-[#c0c1ff]" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#dde2f3]">
              Follow-Up Copilot Studio
            </h2>
            <p className="text-[13px] text-[#c7c4d7]/70">
              Autonomous multi-channel sequence generator for high-ticket hospitality accounts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#080e1a] border border-white/[0.08] font-telemetry text-[12px]">
          <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
          <span className="text-[#dde2f3] font-bold">Active Engine:</span>
          <span className="text-[#4cd7f6]">{aiEngine === 'gemini' ? 'Gemini 3.8 Flash' : 'Ollama Qwen-2.5:3b'}</span>
        </div>
      </div>

      {/* Grid: Target Selector & Generative Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Target Accounts List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col rounded-xl bg-[#161c28]/80 border border-white/[0.08] p-4 gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-white/[0.06]">
            <span className="font-display font-bold text-[14px] text-[#dde2f3]">
              Queued Accounts ({targets.length})
            </span>
            <span className="text-[11px] font-telemetry text-[#4cd7f6]">Auto-Prioritized</span>
          </div>

          <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
            {targets.map((t) => {
              const isSelected = selectedTarget?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTarget(t);
                    setGeneratedDraft(
                      `Hey Chef! Follow-up for ${t.name}. We designed a zero-commission direct booking flow eliminating OpenTable/Resy fees. Mind if I drop the 30s screen preview?`
                    );
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#242a36] border-[#8083ff]/60 shadow-[0_0_12px_rgba(128,131,255,0.2)]'
                      : 'bg-[#1a202c]/60 hover:bg-[#1a202c] border-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-[13.5px] text-[#dde2f3]">{t.name}</span>
                    <span className="font-telemetry text-[10px] px-1.5 py-0.5 rounded bg-[#080e1a] text-[#4cd7f6]">
                      {t.platform}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-telemetry text-[11px] text-[#c7c4d7]/70">
                    <span>{t.handle}</span>
                    <span className="text-[#ffb4ab]">{t.overdueSla}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Generative Studio (8 cols) */}
        <div className="lg:col-span-8 flex flex-col rounded-xl bg-[#161c28]/80 border border-white/[0.08] p-6 gap-5">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-white/[0.06] gap-2">
            <div>
              <span className="font-display font-bold text-lg text-[#dde2f3] block">
                {selectedTarget.name}
              </span>
              <span className="font-telemetry text-[12px] text-[#4cd7f6]">
                {selectedTarget.handle} • {selectedTarget.location} • {selectedTarget.sequenceStage}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#c7c4d7]/70 font-telemetry">Mockup Attached:</span>
              <span className="px-2 py-0.5 rounded bg-[#1a202c] text-[#c0c1ff] font-telemetry text-[11px] border border-[#c0c1ff]/20">
                {selectedTarget.mockupFile}
              </span>
            </div>
          </div>

          {/* Persona & Tone controls */}
          <div className="flex flex-col gap-2">
            <label className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase font-semibold">
              Persuasion Archetype
            </label>
            <div className="grid grid-cols-3 gap-2 font-telemetry text-[12px]">
              <button
                onClick={() => setTone('casual_gourmet')}
                className={`p-2.5 rounded-lg border transition-all ${
                  tone === 'casual_gourmet'
                    ? 'bg-[#8083ff]/30 text-[#c0c1ff] border-[#c0c1ff] font-bold'
                    : 'bg-[#1a202c] text-[#c7c4d7] border-white/[0.06]'
                }`}
              >
                Casual Gourmet Peer
              </button>
              <button
                onClick={() => setTone('direct_roi')}
                className={`p-2.5 rounded-lg border transition-all ${
                  tone === 'direct_roi'
                    ? 'bg-[#8083ff]/30 text-[#c0c1ff] border-[#c0c1ff] font-bold'
                    : 'bg-[#1a202c] text-[#c7c4d7] border-white/[0.06]'
                }`}
              >
                Direct Commission ROI
              </button>
              <button
                onClick={() => setTone('founder')}
                className={`p-2.5 rounded-lg border transition-all ${
                  tone === 'founder'
                    ? 'bg-[#8083ff]/30 text-[#c0c1ff] border-[#c0c1ff] font-bold'
                    : 'bg-[#1a202c] text-[#c7c4d7] border-white/[0.06]'
                }`}
              >
                Hospitality Founder
              </button>
            </div>
          </div>

          {/* Context Tuning Prompt */}
          <div className="flex flex-col gap-1.5">
            <label className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase font-semibold">
              Context Prompt Directive
            </label>
            <input
              type="text"
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="bg-[#1a202c] text-[#dde2f3] text-[13px] px-3.5 py-2.5 rounded-lg border border-white/[0.08] focus:outline-none focus:border-[#8083ff]"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="self-end px-4 py-2 rounded-lg bg-[#242a36] hover:bg-[#343946] text-[#4cd7f6] font-telemetry text-[12px] font-bold border border-[#4cd7f6]/30 flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing with AI...' : 'Generate New Variation'}</span>
          </button>

          {/* Editor & Character Counter */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-telemetry text-[11px] text-[#c7c4d7]/70">
              <span className="uppercase font-semibold">Generated Outreach Draft</span>
              <span>{generatedDraft.length} / 280 chars</span>
            </div>
            <textarea
              rows={4}
              value={generatedDraft}
              onChange={(e) => setGeneratedDraft(e.target.value)}
              className="w-full bg-[#080e1a] text-[#dde2f3] text-[14px] p-4 rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#8083ff] font-mono leading-relaxed resize-none"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedDraft);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3.5 py-2 rounded-lg bg-[#1a202c] hover:bg-[#242a36] text-[#dde2f3] text-[12px] font-telemetry flex items-center gap-1.5 border border-white/[0.08] transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-[#4cd7f6]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleSend}
              disabled={sent}
              className="px-6 py-2.5 rounded-lg bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] font-bold text-[13px] shadow-[0_0_18px_rgba(192,193,255,0.35)] transition-all flex items-center gap-2"
            >
              {sent ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Dispatched to {selectedTarget.platform}!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 fill-current" />
                  <span>Dispatch via {selectedTarget.platform}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
