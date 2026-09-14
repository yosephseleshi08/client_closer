import React from 'react';
import { Users, AlertTriangle, MessageSquare, TrendingUp, DollarSign } from 'lucide-react';
import { Timeframe } from '../types';

interface KPICardsProps {
  urgentCount: number;
  timeframe: Timeframe;
  onFilterUrgentOnly: () => void;
}

export const KPICards: React.FC<KPICardsProps> = ({ urgentCount, timeframe, onFilterUrgentOnly }) => {
  // Dynamic multipliers based on timeframe
  const multiplier = timeframe === 'Quarter' ? 3.2 : timeframe === '30D' ? 2.1 : timeframe === '7D' ? 1.0 : 0.85;

  const totalLeads = Math.round(1428 * multiplier);
  const activePipeline = Math.round(892 * multiplier);
  const igLeads = Math.round(614 * multiplier);
  const tiktokLeads = Math.round(278 * multiplier);
  const closedArr = Math.round(148500 * (timeframe === 'Quarter' ? 2.8 : 1.0));
  const dealsLocked = Math.round(24 * (timeframe === 'Quarter' ? 2.8 : 1.0));

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-5">
      
      {/* Card 1: Total Pipeline Leads */}
      <div className="group relative rounded-xl bg-[#161c28]/90 backdrop-blur-xl p-5 border border-white/[0.08] shadow-xl hover:border-[#c0c1ff]/30 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#c0c1ff] to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-start justify-between">
          <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase tracking-wider font-semibold">
            Total Pipeline Leads
          </span>
          <div className="w-7 h-7 rounded-md bg-[#242a36] flex items-center justify-center text-[#c0c1ff]">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3 flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-[#dde2f3] tracking-tight">
              {totalLeads.toLocaleString()}
            </span>
            <span className="font-telemetry text-[11px] text-[#4cd7f6] bg-[#009eb9]/25 px-1.5 py-0.5 rounded font-bold flex items-center border border-[#4cd7f6]/20">
              <TrendingUp className="w-3 h-3 mr-0.5" />+18.4%
            </span>
          </div>
          <span className="text-[12px] text-[#c7c4d7]/70 mt-0.5">7-day net velocity</span>
        </div>

        {/* Inline Sparkline SVG */}
        <div className="w-full pt-1">
          <svg className="w-full h-9 overflow-visible" fill="none" viewBox="0 0 160 36">
            <defs>
              <linearGradient id="gradIndigo" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#c0c1ff" stopOpacity="0.35"></stop>
                <stop offset="100%" stopColor="#c0c1ff" stopOpacity="0.0"></stop>
              </linearGradient>
            </defs>
            <path d="M0,28 Q20,24 40,26 T80,18 T120,12 T160,4 L160,36 L0,36 Z" fill="url(#gradIndigo)"></path>
            <path d="M0,28 Q20,24 40,26 T80,18 T120,12 T160,4" stroke="#c0c1ff" strokeLinecap="round" strokeWidth="2"></path>
            <circle className="animate-pulse" cx="160" cy="4" fill="#c0c1ff" r="3"></circle>
          </svg>
        </div>
      </div>

      {/* Card 2: Urgent Queue Due */}
      <div 
        onClick={onFilterUrgentOnly}
        className="group relative rounded-xl bg-[#161c28]/90 backdrop-blur-xl p-5 border border-white/[0.08] shadow-xl hover:border-[#ffb4ab]/40 cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#ffb4ab] to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-start justify-between">
          <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase tracking-wider font-semibold">
            Urgent Queue Due
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#93000a] text-[#ffdad6] font-telemetry text-[10px] font-bold border border-[#ffb4ab]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-ping"></span> HIGH SLA
          </span>
        </div>

        <div className="my-3 flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-[#ffb4ab] tracking-tight">
              {urgentCount}
            </span>
            <span className="font-telemetry text-[12px] text-[#c7c4d7]/70">/ 56 target</span>
          </div>
          <span className="text-[12px] text-[#c7c4d7]/70 mt-0.5">Action within &lt;2 hours</span>
        </div>

        <div>
          <div className="w-full bg-[#242a36] rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#ffb4ab] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(255,180,171,0.5)]"
              style={{ width: `${Math.min(100, Math.round((urgentCount / 56) * 100))}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center pt-2 font-telemetry text-[11px] text-[#c7c4d7]/70">
            <span>Critical SLA</span>
            <span className="text-[#ffb4ab] font-bold">60.7% capacity</span>
          </div>
        </div>
      </div>

      {/* Card 3: Active Pipeline */}
      <div className="group relative rounded-xl bg-[#161c28]/90 backdrop-blur-xl p-5 border border-white/[0.08] shadow-xl hover:border-[#4cd7f6]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#4cd7f6] to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-start justify-between">
          <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase tracking-wider font-semibold">
            Active Pipeline
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#242a36] text-[#4cd7f6] font-telemetry text-[10px] uppercase font-bold border border-[#4cd7f6]/30">
            ENGAGED
          </span>
        </div>

        <div className="my-3 flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-[#dde2f3] tracking-tight">
              {activePipeline.toLocaleString()}
            </span>
            <span className="font-telemetry text-[12px] text-[#4cd7f6] font-medium">Outreach Active</span>
          </div>
          <span className="text-[12px] text-[#c7c4d7]/70 mt-0.5">Across Instagram & TikTok DMs</span>
        </div>

        {/* Channel Breakdown */}
        <div className="grid grid-cols-2 gap-2 pt-1 font-telemetry text-[11px]">
          <div className="px-2 py-1 rounded bg-[#242a36] flex flex-col border border-white/[0.04]">
            <span className="text-[#c7c4d7]/60 text-[9px] uppercase tracking-wider font-semibold">INSTAGRAM</span>
            <span className="text-[#dde2f3] font-bold">{igLeads} leads</span>
          </div>
          <div className="px-2 py-1 rounded bg-[#242a36] flex flex-col border border-white/[0.04]">
            <span className="text-[#c7c4d7]/60 text-[9px] uppercase tracking-wider font-semibold">TIKTOK DM</span>
            <span className="text-[#dde2f3] font-bold">{tiktokLeads} leads</span>
          </div>
        </div>
      </div>

      {/* Card 4: Reply Conversion Rate */}
      <div className="group relative rounded-xl bg-[#161c28]/90 backdrop-blur-xl p-5 border border-white/[0.08] shadow-xl hover:border-[#4cd7f6]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#009eb9] to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-start justify-between">
          <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase tracking-wider font-semibold">
            Reply Conversion Rate
          </span>
          <div className="w-7 h-7 rounded-md bg-[#242a36] flex items-center justify-center text-[#4cd7f6]">
            <MessageSquare className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3 flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-[#4cd7f6] tracking-tight">
              28.6%
            </span>
            <span className="font-telemetry text-[11px] text-[#c0c1ff] bg-[#8083ff]/20 px-1.5 py-0.5 rounded font-bold border border-[#8083ff]/30">
              +4.2%
            </span>
          </div>
          <span className="text-[12px] text-[#c7c4d7]/70 mt-0.5">Vs industry benchmark (9.8%)</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <div className="flex-1 bg-[#242a36] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#4cd7f6] h-full rounded-full w-[78%] shadow-[0_0_8px_rgba(76,215,246,0.4)]"></div>
          </div>
          <span className="font-telemetry text-[11px] text-[#4cd7f6] font-bold">2.9x Avg</span>
        </div>
      </div>

      {/* Card 5: Closed Won ARR */}
      <div className="group relative rounded-xl bg-[#161c28]/90 backdrop-blur-xl p-5 border border-white/[0.08] shadow-xl hover:border-[#e9ddff]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#e9ddff] to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-start justify-between">
          <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 uppercase tracking-wider font-semibold">
            Closed Won ARR
          </span>
          <span className="px-2 py-0.5 rounded bg-[#571bc1] text-[#c4abff] font-telemetry text-[10px] font-bold border border-[#c4abff]/30">
            GOLD TIER
          </span>
        </div>

        <div className="my-3 flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-[#e9ddff] tracking-tight">
              ${closedArr.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 text-[12px]">
            <span className="text-[#e9ddff] font-semibold">{dealsLocked} deals locked</span>
            <span className="w-1 h-1 rounded-full bg-[#908fa0]"></span>
            <span className="font-telemetry text-[#c7c4d7]/70 text-[11px]">Avg: $6,187</span>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between font-telemetry text-[11px]">
          <span className="text-[#c7c4d7]/70">Goal: $150k</span>
          <span className="text-[#e9ddff] font-bold">99.0% attained</span>
        </div>
      </div>

    </section>
  );
};
