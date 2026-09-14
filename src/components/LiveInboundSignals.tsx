import React from 'react';
import { Radio, PlusCircle, MessageSquare, ExternalLink, ArrowRight } from 'lucide-react';
import { InboundSignal } from '../types';

interface LiveInboundSignalsProps {
  signals: InboundSignal[];
  onSelectSignal: (signal: InboundSignal) => void;
  onSimulateInbound: () => void;
}

export const LiveInboundSignals: React.FC<LiveInboundSignalsProps> = ({
  signals,
  onSelectSignal,
  onSimulateInbound
}) => {
  const getIntentBadge = (intent: string) => {
    switch (intent) {
      case 'High-Ticket Contract':
        return 'text-[#e9ddff] bg-[#571bc1]/30 border-[#c4abff]/30';
      case 'Tech Feasibility':
        return 'text-[#4cd7f6] bg-[#009eb9]/20 border-[#4cd7f6]/30';
      case 'Demo Booked':
        return 'text-[#c0c1ff] bg-[#8083ff]/20 border-[#c0c1ff]/30';
      default:
        return 'text-[#c7c4d7] bg-[#242a36] border-white/[0.08]';
    }
  };

  return (
    <div className="rounded-xl bg-[#161c28]/80 backdrop-blur-xl p-4 sm:p-5 border border-white/[0.08] shadow-xl flex flex-col gap-3">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <span className="font-display text-[16px] text-[#dde2f3] font-bold">
            Live Inbound Signals
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSimulateInbound}
            title="Simulate a new incoming restaurant DM"
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#1a202c] hover:bg-[#242a36] text-[#c0c1ff] font-telemetry text-[10px] border border-white/[0.08] transition-all"
          >
            <PlusCircle className="w-3 h-3" />
            <span>Simulate Inbound</span>
          </button>

          <span className="font-telemetry text-[11px] text-[#4cd7f6] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span> Streaming
          </span>
        </div>
      </div>

      {/* Signals List */}
      <div className="flex flex-col gap-2.5">
        {signals.map((signal) => (
          <div
            key={signal.id}
            onClick={() => onSelectSignal(signal)}
            className="p-3 rounded-lg bg-[#1a202c]/50 hover:bg-[#1a202c] border border-white/[0.04] hover:border-white/[0.1] transition-all flex flex-col gap-1.5 cursor-pointer group"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md overflow-hidden bg-[#2f3542] border border-white/[0.1] shrink-0">
                  <img
                    src={signal.avatarUrl}
                    alt={signal.restaurantName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[13px] font-bold text-[#dde2f3] group-hover:text-[#c0c1ff] transition-colors">
                  {signal.restaurantName}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-telemetry font-bold border ${
                  signal.platform === 'TikTok' 
                    ? 'bg-[#571bc1]/30 text-[#e9ddff] border-[#c4abff]/30' 
                    : 'bg-[#009eb9]/20 text-[#4cd7f6] border-[#4cd7f6]/30'
                }`}>
                  {signal.platform === 'TikTok' ? 'TikTok DM' : 'IG DM'}
                </span>
              </div>

              <span className="font-telemetry text-[11px] text-[#c7c4d7]/70">
                {signal.timeAgo}
              </span>
            </div>

            {/* Message Body */}
            <p className="text-[12.5px] text-[#dde2f3]/90 pl-8 leading-relaxed font-normal">
              {signal.message}
            </p>

            {/* Intent Badge */}
            <div className="pl-8 flex items-center justify-between pt-0.5">
              <span className={`font-telemetry text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getIntentBadge(signal.intent)}`}>
                Intent: {signal.intent}
              </span>

              <span className="opacity-0 group-hover:opacity-100 font-telemetry text-[11px] text-[#c0c1ff] flex items-center gap-1 transition-opacity">
                <span>Reply</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
