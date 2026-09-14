import React, { useState } from 'react';
import { Sparkles, Activity, Eye, MessageSquare, MonitorPlay, Award } from 'lucide-react';
import { FunnelStage } from '../types';

interface ConversionFunnelProps {
  stages: FunnelStage[];
  onSelectStage: (stage: FunnelStage) => void;
  selectedStageId?: string;
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({
  stages,
  onSelectStage,
  selectedStageId
}) => {
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);

  const stageIcons: Record<string, React.ReactNode> = {
    '01': <Activity className="w-3.5 h-3.5" />,
    '02': <Eye className="w-3.5 h-3.5" />,
    '03': <MessageSquare className="w-3.5 h-3.5" />,
    '04': <MonitorPlay className="w-3.5 h-3.5" />,
    '05': <Award className="w-3.5 h-3.5" />
  };

  const getBarWidth = (stageNumber: string) => {
    switch (stageNumber) {
      case '01': return '100%';
      case '02': return '73%';
      case '03': return '28.6%';
      case '04': return '15.1%';
      case '05': return '4.8%';
      default: return '50%';
    }
  };

  return (
    <div className="flex flex-col rounded-xl bg-[#161c28]/80 backdrop-blur-xl p-5 sm:p-6 border border-white/[0.08] shadow-xl">
      
      {/* Funnel Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#dde2f3] tracking-tight">
              Pipeline Conversion Funnel
            </h2>
            <span className="px-2 py-0.5 rounded bg-[#242a36] text-[#c0c1ff] font-telemetry text-[10px] uppercase font-semibold border border-[#c0c1ff]/20">
              Telemetry v4
            </span>
          </div>
          <p className="text-[13px] text-[#c7c4d7]/70 mt-0.5">
            Step-by-step attrition across 1,428 hospitality leads this cycle
          </p>
        </div>

        <div className="flex items-center gap-2 font-telemetry text-[12px] text-[#c7c4d7]/80">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#c0c1ff]"></span> Volume
          </span>
          <span className="flex items-center gap-1.5 ml-3">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6]"></span> Velocity
          </span>
        </div>
      </div>

      {/* Funnel Bars List */}
      <div className="flex flex-col gap-3.5 pt-2">
        {stages.map((stage) => {
          const isSelected = selectedStageId === stage.id;
          const isHovered = hoveredStageId === stage.id;
          const barWidth = getBarWidth(stage.number);

          return (
            <div
              key={stage.id}
              onClick={() => onSelectStage(stage)}
              onMouseEnter={() => setHoveredStageId(stage.id)}
              onMouseLeave={() => setHoveredStageId(null)}
              className={`p-3 rounded-lg transition-all cursor-pointer border ${
                isSelected 
                  ? 'bg-[#242a36] border-[#8083ff]/50 shadow-[0_0_15px_rgba(128,131,255,0.2)]'
                  : 'bg-[#1a202c]/60 hover:bg-[#1a202c] border-white/[0.04]'
              }`}
            >
              {/* Top Row: Stage Name & Metrics */}
              <div className="flex flex-wrap items-center justify-between font-telemetry text-[12px] mb-2 gap-2">
                <div className="flex items-center gap-2.5">
                  <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                    stage.number === '05' 
                      ? 'bg-[#571bc1] text-[#e9ddff]' 
                      : stage.number === '03'
                      ? 'bg-[#242a36] text-[#4cd7f6]'
                      : 'bg-[#242a36] text-[#c0c1ff]'
                  }`}>
                    {stage.number}
                  </span>
                  <span className="font-display text-[14px] sm:text-[15px] font-semibold text-[#dde2f3]">
                    {stage.name}
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                  <span className="font-display text-[14px] sm:text-[15px] font-bold text-[#dde2f3]">
                    {stage.number === '05' ? `${stage.leadsCount} deals` : `${stage.leadsCount.toLocaleString()} leads`}
                  </span>
                  {stage.dropRate ? (
                    <span className="text-[#ffb4ab] font-telemetry text-[11px] font-semibold">
                      {stage.dropRate}
                    </span>
                  ) : (
                    <span className="text-[#c7c4d7]/60 font-telemetry text-[11px]">
                      {stage.badgeLabel}
                    </span>
                  )}
                  <span className="text-[#4cd7f6] font-telemetry text-[11px] font-medium">
                    {stage.avgVelocity}
                  </span>
                </div>
              </div>

              {/* Progress Bar with Gradient */}
              <div className="w-full h-5 rounded-md bg-[#080e1a] overflow-hidden relative border border-white/[0.04]">
                <div
                  className={`h-full rounded-md bg-gradient-to-r ${stage.gradient} transition-all duration-700`}
                  style={{
                    width: barWidth,
                    boxShadow: isHovered || isSelected ? `0 0 16px ${stage.shadowColor}` : 'none'
                  }}
                ></div>

                {/* Percentage Tag Placed on or Beside the Bar */}
                {stage.number === '01' && (
                  <span className="absolute inset-y-0 right-3 flex items-center font-telemetry text-[10px] font-bold text-[#0d0096]">
                    100.0%
                  </span>
                )}
                {stage.number === '02' && (
                  <span className="absolute inset-y-0 left-[75%] flex items-center font-telemetry text-[10px] font-semibold text-[#dde2f3]">
                    73.0% of total
                  </span>
                )}
                {stage.number === '03' && (
                  <span className="absolute inset-y-0 left-[30.5%] flex items-center font-telemetry text-[10px] font-semibold text-[#4cd7f6]">
                    28.6% active
                  </span>
                )}
                {stage.number === '04' && (
                  <span className="absolute inset-y-0 left-[17%] flex items-center font-telemetry text-[10px] font-semibold text-[#e9ddff]">
                    15.1% value demo
                  </span>
                )}
                {stage.number === '05' && (
                  <span className="absolute inset-y-0 left-[6.5%] flex items-center font-telemetry text-[10px] font-bold text-[#e9ddff]">
                    4.8% net ARR yield
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Diagnostic Insights Banner */}
      <div className="mt-5 p-3.5 sm:p-4 rounded-lg bg-[#080e1a] border border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#8083ff]/15 flex items-center justify-center text-[#c0c1ff] shrink-0 border border-[#c0c1ff]/20">
            <Sparkles className="w-4 h-4 text-[#c0c1ff]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] text-[#dde2f3] font-semibold">
              AI Funnel Optimization Diagnostic
            </span>
            <span className="font-telemetry text-[11px] text-[#c7c4d7]/70">
              Step 3 → Step 4 response latency decreased by 18% post Qwen-2.5 / Gemini upgrade
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-telemetry text-[11px] self-end md:self-auto">
          <span className="text-[#c7c4d7]/70">Conversion Health:</span>
          <span className="text-[#4cd7f6] font-bold uppercase bg-[#009eb9]/20 px-2 py-0.5 rounded border border-[#4cd7f6]/30">
            Exceptional (Grade A+)
          </span>
        </div>
      </div>

    </div>
  );
};
