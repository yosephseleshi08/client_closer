import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, Zap, CheckCircle, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Timeframe, HospitalityFilter, VaultMode } from '../types';

interface TacticalBarProps {
  timeframe: Timeframe;
  onTimeframeChange: (timeframe: Timeframe) => void;
  hospitalityFilter: HospitalityFilter;
  onFilterChange: (filter: HospitalityFilter) => void;
  urgentCount: number;
  onBatchDispatch: () => void;
  isDispatching: boolean;
  vaultMode: VaultMode;
  onToggleVaultMode: () => void;
}

export const TacticalBar: React.FC<TacticalBarProps> = ({
  timeframe,
  onTimeframeChange,
  hospitalityFilter,
  onFilterChange,
  urgentCount,
  onBatchDispatch,
  isDispatching,
  vaultMode,
  onToggleVaultMode
}) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filterLabels: Record<HospitalityFilter, string> = {
    'all': 'All Hospitality Categories',
    'michelin': 'Michelin & Fine Dining',
    'fine-dining': 'High-Ticket Hospitality',
    'nightclub-lounges': 'Nightclub & Vinyl Lounges',
    'multi-location': 'Multi-Location Restaurant Groups'
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Demo Sandbox Alert Banner (Safe Presentation Mode) */}
      {vaultMode === 'demo' ? (
        <div className="px-4 py-2.5 rounded-xl bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-[0_0_24px_rgba(255,180,171,0.08)]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#ffb4ab] shrink-0" />
            <span className="font-telemetry text-[12px] text-[#ffdad6]">
              <strong className="font-bold uppercase tracking-wider text-[#ffb4ab]">Demo Presentation Mode Active:</strong> Seeded strictly with simulated restaurant targets. Real confidential leads are isolated and locked behind master credentials.
            </span>
          </div>
          <button
            onClick={onToggleVaultMode}
            className="px-3 py-1 rounded-lg bg-[#242a36] hover:bg-[#343946] text-[#c0c1ff] font-telemetry text-[11px] font-bold border border-white/[0.1] transition-all flex items-center gap-1 shrink-0"
          >
            <span>Unlock Real Vault</span>
            <ArrowRight className="w-3 h-3 text-[#c0c1ff]" />
          </button>
        </div>
      ) : (
        <div className="px-3.5 py-1.5 rounded-lg bg-[#1a202c]/70 border border-[#8083ff]/30 flex items-center justify-between text-[11px] font-telemetry text-[#c7c4d7]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4cd7f6]" />
            <span><strong className="text-[#dde2f3]">Private CRM Vault:</strong> Connected securely with real lead persistence.</span>
          </div>
          <button
            onClick={onToggleVaultMode}
            className="text-[#ffb4ab] hover:underline flex items-center gap-1 font-semibold"
            title="Switch to Demo Mode if you want to showcase the UI without revealing real leads"
          >
            <Sparkles className="w-3 h-3" />
            <span>Switch to Demo Mode (Safe to Show)</span>
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-2">
        {/* Left Title & Status */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-[#1a202c] text-[#c0c1ff] font-telemetry text-[10px] font-semibold tracking-widest uppercase border border-[#c0c1ff]/20">
              Autonomous Revenue Engine
            </span>
            <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping"></span>
              CLUSTER-US-EAST // SYNCHRONIZED
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#dde2f3] tracking-tight flex flex-wrap items-baseline gap-2">
            <span>Executive Revenue Telemetry</span>
            <span className="text-lg sm:text-xl text-[#c7c4d7]/70 font-normal">| Q1 High-Ticket Trajectory</span>
          </h1>
        </div>

      {/* Right Controls */}
      <div className="flex flex-wrap items-center gap-2.5 self-stretch lg:self-auto">
        
        {/* Hospitality Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a202c] hover:bg-[#242a36] text-[#dde2f3] border border-white/[0.08] text-[12px] font-telemetry transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#4cd7f6]" />
            <span className="font-medium">{filterLabels[hospitalityFilter]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#908fa0]" />
          </button>

          {showFilterMenu && (
            <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-[#161c28] border border-white/[0.1] shadow-2xl py-1 z-30 font-telemetry text-[12px]">
              {(['fine-dining', 'michelin', 'nightclub-lounges', 'multi-location', 'all'] as HospitalityFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    onFilterChange(f);
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 transition-colors flex items-center justify-between ${
                    hospitalityFilter === f ? 'bg-[#8083ff]/20 text-[#c0c1ff] font-semibold' : 'text-[#c7c4d7] hover:bg-[#1a202c]'
                  }`}
                >
                  <span>{filterLabels[f]}</span>
                  {hospitalityFilter === f && <span className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff]"></span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center p-1 rounded-lg bg-[#080e1a] border border-white/[0.08]">
          {(['Real-time', '7D', '30D', 'Quarter'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-2.5 py-1 rounded text-[12px] font-telemetry transition-all ${
                timeframe === tf
                  ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-sm'
                  : 'text-[#c7c4d7] hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Primary CTA: Batch Dispatch */}
        <button
          onClick={onBatchDispatch}
          disabled={isDispatching || urgentCount === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#c0c1ff] text-[#1000a9] hover:bg-[#e1e0ff] disabled:opacity-50 text-[13px] font-bold shadow-[0_0_20px_rgba(192,193,255,0.35)] active:scale-95 transition-all"
        >
          {isDispatching ? (
            <>
              <span className="w-4 h-4 border-2 border-[#1000a9] border-t-transparent rounded-full animate-spin"></span>
              <span>Dispatching {urgentCount} Threads...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-current" />
              <span>Batch Dispatch AI ({urgentCount})</span>
            </>
          )}
        </button>

      </div>
    </div>
    </div>
  );
};
