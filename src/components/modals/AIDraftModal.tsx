import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, Copy, Check, RefreshCw, Sliders } from 'lucide-react';
import { UrgentTarget } from '../../types';

interface AIDraftModalProps {
  target: UrgentTarget | null;
  onClose: () => void;
  onDeploy: (target: UrgentTarget, message: string) => void;
  aiEngine: 'ollama' | 'gemini';
}

export const AIDraftModal: React.FC<AIDraftModalProps> = ({
  target,
  onClose,
  onDeploy,
  aiEngine
}) => {
  const [tone, setTone] = useState<'casual_gourmet' | 'direct_roi' | 'founder'>('casual_gourmet');
  const [details, setDetails] = useState('');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deployed, setDeployed] = useState(false);

  useEffect(() => {
    if (target) {
      // Set initial smart draft
      setMessage(
        `Hey Chef! Saw your weekend special blown up on social. We built a sleek reservation funnel demo for ${target.name} so guests book directly off ${target.platform} rather than paying 3rd-party cover fees. Check it here?`
      );
      setDetails(target.subtext || '');
    }
  }, [target]);

  if (!target) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantName: target.name,
          handle: target.handle,
          platform: target.platform,
          cuisine: target.cuisine,
          stage: target.sequenceStage,
          tone,
          details
        })
      });
      const data = await response.json();
      if (data && data.message) {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeploy = () => {
    setDeployed(true);
    setTimeout(() => {
      onDeploy(target, message);
      onClose();
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#161c28] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0e131f]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8083ff]/20 flex items-center justify-center text-[#c0c1ff] border border-[#c0c1ff]/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[16px] text-[#dde2f3] flex items-center gap-2">
                <span>AI Follow-Up Generator</span>
                <span className="text-[11px] font-telemetry font-normal px-2 py-0.5 rounded bg-[#1a202c] text-[#4cd7f6] border border-[#4cd7f6]/30">
                  {aiEngine === 'gemini' ? 'Gemini 3.8 Flash' : 'Ollama Qwen-2.5'}
                </span>
              </h3>
              <p className="font-telemetry text-[11px] text-[#c7c4d7]/70">
                Target: {target.name} ({target.handle} • {target.sequenceStage})
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

        {/* Form Body */}
        <div className="p-6 flex flex-col gap-4">
          
          {/* Tone Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase tracking-wider font-semibold">
              Persuasion Angle & Tone
            </label>
            <div className="grid grid-cols-3 gap-2 font-telemetry text-[11px]">
              <button
                type="button"
                onClick={() => setTone('casual_gourmet')}
                className={`py-2 px-3 rounded-lg border transition-all ${
                  tone === 'casual_gourmet'
                    ? 'bg-[#8083ff]/30 text-[#c0c1ff] border-[#c0c1ff] font-bold'
                    : 'bg-[#1a202c] text-[#c7c4d7] border-white/[0.06]'
                }`}
              >
                Casual Gourmet Peer
              </button>
              <button
                type="button"
                onClick={() => setTone('direct_roi')}
                className={`py-2 px-3 rounded-lg border transition-all ${
                  tone === 'direct_roi'
                    ? 'bg-[#8083ff]/30 text-[#c0c1ff] border-[#c0c1ff] font-bold'
                    : 'bg-[#1a202c] text-[#c7c4d7] border-white/[0.06]'
                }`}
              >
                Direct Commission ROI
              </button>
              <button
                type="button"
                onClick={() => setTone('founder')}
                className={`py-2 px-3 rounded-lg border transition-all ${
                  tone === 'founder'
                    ? 'bg-[#8083ff]/30 text-[#c0c1ff] border-[#c0c1ff] font-bold'
                    : 'bg-[#1a202c] text-[#c7c4d7] border-white/[0.06]'
                }`}
              >
                Hospitality Founder
              </button>
            </div>
          </div>

          {/* Context Details */}
          <div className="flex flex-col gap-1.5">
            <label className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase tracking-wider font-semibold">
              Hook / Dish Context (Optional)
            </label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="e.g. Michelin 2024 win, weekend truffle gnocchi story drop, new chef counter"
              className="bg-[#1a202c] text-[#dde2f3] placeholder:text-[#908fa0] text-[13px] px-3.5 py-2 rounded-lg border border-white/[0.08] focus:outline-none focus:border-[#8083ff]"
            />
          </div>

          {/* Generate Action Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="self-end px-3.5 py-1.5 rounded-lg bg-[#242a36] hover:bg-[#343946] text-[#4cd7f6] font-telemetry text-[12px] font-semibold border border-[#4cd7f6]/30 flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing with AI...' : 'Regenerate Draft'}</span>
          </button>

          {/* Message Text Area */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between font-telemetry text-[11px] text-[#c7c4d7]/70">
              <span className="uppercase tracking-wider font-semibold">Generated Outreach Copy</span>
              <span>{message.length} / 280 chars</span>
            </div>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#080e1a] text-[#dde2f3] text-[13.5px] p-3.5 rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#8083ff] font-mono leading-relaxed resize-none"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 gap-3">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-lg bg-[#1a202c] hover:bg-[#242a36] text-[#dde2f3] text-[12px] font-telemetry flex items-center gap-1.5 border border-white/[0.08] transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#4cd7f6]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-[#c7c4d7] hover:text-white text-[13px] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeploy}
                disabled={deployed}
                className="px-5 py-2 rounded-lg bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] font-bold text-[13px] shadow-[0_0_16px_rgba(192,193,255,0.3)] transition-all flex items-center gap-1.5"
              >
                {deployed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Dispatched!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 fill-current" />
                    <span>Deploy to {target.platform}</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
