import React, { useState } from 'react';
import { Kanban, Plus, ArrowRight, DollarSign, Sparkles, CheckCircle } from 'lucide-react';
import { UrgentTarget } from '../../types';

interface CRMViewProps {
  targets: UrgentTarget[];
  onOpenMockup: (target: UrgentTarget) => void;
  onOpenDraft: (target: UrgentTarget) => void;
}

export const CRMView: React.FC<CRMViewProps> = ({ targets, onOpenMockup, onOpenDraft }) => {
  // 5 Stages
  const columns = [
    { id: 'initial', title: '1. Initial Outbound', count: 1428, color: '#c0c1ff' },
    { id: 'viewed', title: '2. Opened & Viewed', count: 1042, color: '#8083ff' },
    { id: 'replied', title: '3. Conversation Active', count: 408, color: '#4cd7f6' },
    { id: 'mockup', title: '4. Redesign Delivered', count: 215, color: '#571bc1' },
    { id: 'closed', title: '5. Contract Closed Won', count: 68, color: '#e9ddff' }
  ];

  const [localTargets, setLocalTargets] = useState(targets);

  const moveTargetNext = (targetId: string) => {
    setLocalTargets((prev) =>
      prev.map((t) => {
        if (t.id === targetId) {
          return {
            ...t,
            sequenceStage: t.sequenceStage.includes('1 of 3')
              ? 'Follow-up 2 of 3'
              : t.sequenceStage.includes('2 of 3')
              ? 'Follow-up 3 of 3 (Final)'
              : 'Closed Won'
          };
        }
        return t;
      })
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1728px] mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#161c28]/90 border border-white/[0.08] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c0c1ff]/20 flex items-center justify-center text-[#c0c1ff] border border-[#c0c1ff]/30">
            <Kanban className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#dde2f3]">
              CRM Master Pipeline
            </h2>
            <p className="text-[13px] text-[#c7c4d7]/70">
              High-Ticket Hospitality Stage Flow ($148,500 Locked ARR • 68 Closed Won Deals)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-telemetry text-[12px] text-[#4cd7f6] bg-[#009eb9]/20 px-3 py-1 rounded-lg border border-[#4cd7f6]/30">
            Average Deal Size: $6,187 ARR
          </span>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col, colIndex) => {
          // Filter some sample cards into this column
          const columnTargets = localTargets.filter((_, idx) => (idx % 5) === colIndex);

          return (
            <div
              key={col.id}
              className="flex flex-col rounded-xl bg-[#161c28]/80 border border-white/[0.08] p-3.5 gap-3 min-w-[260px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: col.color }}
                  ></span>
                  <span className="font-display font-bold text-[13px] text-[#dde2f3] truncate">
                    {col.title}
                  </span>
                </div>
                <span className="font-telemetry text-[11px] font-bold text-[#c7c4d7]/70 px-1.5 py-0.2 rounded bg-[#080e1a]">
                  {col.count}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="flex flex-col gap-2.5">
                {columnTargets.map((target) => (
                  <div
                    key={target.id}
                    className="p-3.5 rounded-lg bg-[#1a202c] hover:bg-[#242a36] border border-white/[0.06] hover:border-white/[0.12] transition-all flex flex-col gap-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-[13.5px] text-[#dde2f3] truncate">
                        {target.name}
                      </span>
                      <span className="text-[10px] font-telemetry px-1.5 py-0.5 rounded bg-[#080e1a] text-[#4cd7f6]">
                        {target.platform}
                      </span>
                    </div>

                    <span className="text-[11.5px] text-[#c7c4d7]/70 font-telemetry">
                      {target.location} • Check ${target.avgCheck}
                    </span>

                    <div className="flex items-center justify-between pt-1 font-telemetry text-[11px]">
                      <button
                        onClick={() => onOpenMockup(target)}
                        className="text-[#4cd7f6] hover:underline"
                      >
                        {target.mockupFile}
                      </button>

                      <button
                        onClick={() => moveTargetNext(target.id)}
                        className="p-1 rounded bg-[#242a36] hover:bg-[#343946] text-[#c0c1ff] transition-all"
                        title="Advance to next stage"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {columnTargets.length === 0 && (
                  <div className="text-center py-6 text-[12px] text-[#c7c4d7]/40 font-telemetry">
                    No active leads in this queue
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
