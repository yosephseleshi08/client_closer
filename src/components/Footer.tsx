import React from 'react';
import { Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#080e1a] mt-12 py-6 border-t border-white/[0.06]">
      <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <div className="flex flex-wrap items-center gap-3 text-center md:text-left">
          <span className="font-display font-bold text-[14px] text-[#dde2f3] tracking-tight uppercase">
            Outreach Engine Pro
          </span>
          <span className="font-telemetry text-[12px] text-[#c7c4d7]/70">
            © 2025 Revenue Operations Core. High-Ticket Enterprise Architecture.
          </span>
        </div>

        {/* Right Status */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span className="font-telemetry text-[12px] text-[#4cd7f6]">
              LLM Pipeline Connected
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-telemetry text-[11px] text-[#c7c4d7]/70">
            <Lock className="w-3.5 h-3.5 text-[#908fa0]" />
            <span className="uppercase font-semibold tracking-wider">SOC2 Verified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
