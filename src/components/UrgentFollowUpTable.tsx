import React, { useState } from 'react';
import { Search, Filter, Sparkles, Send, MessageSquare, ExternalLink, Check, Eye } from 'lucide-react';
import { UrgentTarget, FollowupStage } from '../types';

interface UrgentFollowUpTableProps {
  targets: UrgentTarget[];
  onOpenDraft: (target: UrgentTarget) => void;
  onSendDirect: (target: UrgentTarget) => void;
  onOpenChat: (target: UrgentTarget) => void;
  onOpenMockup: (target: UrgentTarget) => void;
  totalUrgentCount: number;
}

export const UrgentFollowUpTable: React.FC<UrgentFollowUpTableProps> = ({
  targets,
  onOpenDraft,
  onSendDirect,
  onOpenChat,
  onOpenMockup,
  totalUrgentCount
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredTargets = targets.filter((target) => {
    const matchesSearch = 
      target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = stageFilter === 'all' || target.sequenceStage.includes(stageFilter);

    return matchesSearch && matchesStage;
  });

  const totalPages = Math.ceil(filteredTargets.length / itemsPerPage) || 1;
  const paginatedTargets = filteredTargets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getSlaBadge = (target: UrgentTarget) => {
    switch (target.slaSeverity) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad6] font-telemetry text-[10px] font-bold flex items-center gap-1.5 w-fit border border-[#ffb4ab]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-ping"></span>
            {target.overdueSla}
          </span>
        );
      case 'warning':
        return (
          <span className="px-2 py-0.5 rounded bg-[#ffb4ab]/20 text-[#ffb4ab] font-telemetry text-[10px] font-bold flex items-center gap-1.5 w-fit border border-[#ffb4ab]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]"></span>
            {target.overdueSla}
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded bg-[#1a202c] text-[#c7c4d7] font-telemetry text-[10px] font-medium flex items-center gap-1.5 w-fit border border-white/[0.06]">
            {target.overdueSla}
          </span>
        );
    }
  };

  const getStageBadge = (stage: FollowupStage) => {
    if (stage.includes('Final')) {
      return 'bg-[#571bc1]/30 text-[#e9ddff] border-[#c4abff]/30';
    }
    if (stage.includes('2 of 3')) {
      return 'bg-[#8083ff]/20 text-[#c0c1ff] border-[#c0c1ff]/30';
    }
    return 'bg-[#1a202c] text-[#dde2f3] border-white/[0.08]';
  };

  return (
    <section className="flex flex-col rounded-xl bg-[#161c28]/90 backdrop-blur-xl p-5 sm:p-6 border border-white/[0.08] shadow-xl overflow-hidden">
      
      {/* Top Table Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#dde2f3] tracking-tight">
              Urgent Follow-Up Command Board
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#93000a] text-[#ffdad6] font-telemetry text-[10px] font-bold border border-[#ffb4ab]/30 animate-pulse">
              {totalUrgentCount} DUE NOW
            </span>
          </div>
          <p className="text-[13px] text-[#c7c4d7]/70 mt-0.5">
            Targeted restaurant accounts requiring immediate engagement sequence execution
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          {/* Search filter */}
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#908fa0]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Filter targets..."
              className="w-full bg-[#1a202c] text-[#dde2f3] placeholder:text-[#908fa0] font-telemetry text-[12px] pl-8 pr-3 py-1.5 rounded-lg border border-white/[0.08] focus:outline-none focus:border-[#8083ff]"
            />
          </div>

          {/* Stage filter dropdown */}
          <select
            value={stageFilter}
            onChange={(e) => {
              setStageFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#1a202c] text-[#dde2f3] font-telemetry text-[12px] border border-white/[0.08] focus:outline-none focus:border-[#8083ff]"
          >
            <option value="all">All Stages</option>
            <option value="1 of 3">Follow-up 1</option>
            <option value="2 of 3">Follow-up 2</option>
            <option value="3 of 3">Follow-up 3 (Final)</option>
          </select>
        </div>
      </div>

      {/* Precision Data Grid */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#080e1a]/80 text-[#c7c4d7]/70 font-telemetry text-[10px] uppercase tracking-wider border-y border-white/[0.06]">
              <th className="py-3 px-4 rounded-l-lg font-semibold">Target Establishment</th>
              <th className="py-3 px-4 font-semibold">Platform & Handle</th>
              <th className="py-3 px-4 font-semibold">Overdue SLA</th>
              <th className="py-3 px-4 font-semibold">Sequence Stage</th>
              <th className="py-3 px-4 font-semibold">Mockup Preview</th>
              <th className="py-3 px-4 text-right rounded-r-lg font-semibold">Autonomous Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-[13px] text-[#dde2f3]">
            {paginatedTargets.map((target) => (
              <tr key={target.id} className="hover:bg-[#242a36]/40 transition-colors group">
                
                {/* 1. Target Establishment */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center font-display text-[15px] font-bold border border-white/[0.1] shrink-0"
                      style={{ backgroundColor: '#1a202c', color: target.avatarColor }}
                    >
                      {target.avatarChar}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-display text-[14px] font-bold text-[#dde2f3] group-hover:text-[#c0c1ff] transition-colors truncate">
                        {target.name}
                      </span>
                      <span className="font-telemetry text-[11px] text-[#c7c4d7]/70 truncate">
                        {target.subtext}
                      </span>
                    </div>
                  </div>
                </td>

                {/* 2. Platform & Handle */}
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-telemetry uppercase font-bold border ${
                      target.platform === 'TikTok'
                        ? 'bg-[#571bc1]/20 text-[#e9ddff] border-[#c4abff]/20'
                        : 'bg-[#009eb9]/20 text-[#4cd7f6] border-[#4cd7f6]/20'
                    }`}>
                      {target.platform}
                    </span>
                    <span className="font-telemetry text-[12px] text-[#dde2f3]">
                      {target.handle}
                    </span>
                  </div>
                </td>

                {/* 3. Overdue SLA */}
                <td className="py-3 px-4 whitespace-nowrap">
                  {getSlaBadge(target)}
                </td>

                {/* 4. Sequence Stage */}
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 rounded-full font-telemetry text-[11px] font-semibold border ${getStageBadge(target.sequenceStage)}`}>
                    {target.sequenceStage}
                  </span>
                </td>

                {/* 5. Mockup Preview */}
                <td className="py-3 px-4 whitespace-nowrap">
                  <button
                    onClick={() => onOpenMockup(target)}
                    className="inline-flex items-center gap-1.5 text-[#4cd7f6] hover:text-[#acedff] font-telemetry text-[12px] group/link"
                  >
                    <Eye className="w-3.5 h-3.5 group-hover/link:scale-110 transition-transform" />
                    <span className="underline decoration-[#4cd7f6]/40">{target.mockupFile}</span>
                  </button>
                </td>

                {/* 6. Autonomous Actions */}
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5">
                    {/* AI Draft Button */}
                    <button
                      onClick={() => onOpenDraft(target)}
                      className="px-2.5 py-1 rounded bg-[#242a36] hover:bg-[#343946] text-[#c0c1ff] font-telemetry text-[11px] font-medium border border-[#c0c1ff]/20 transition-all flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>AI Draft</span>
                    </button>

                    {/* Direct Sent Button */}
                    <button
                      onClick={() => onSendDirect(target)}
                      className={`px-2.5 py-1 rounded font-telemetry text-[11px] font-semibold transition-all flex items-center gap-1 shadow-sm ${
                        target.status === 'sent'
                          ? 'bg-[#4cd7f6] text-[#003640]'
                          : 'bg-[#c0c1ff] text-[#1000a9] hover:bg-[#e1e0ff]'
                      }`}
                    >
                      {target.status === 'sent' ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Sent</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3 fill-current" />
                          <span>Sent</span>
                        </>
                      )}
                    </button>

                    {/* Chat Thread Button */}
                    <button
                      onClick={() => onOpenChat(target)}
                      className="p-1.5 rounded bg-[#1a202c] hover:bg-[#242a36] text-[#c7c4d7] hover:text-white border border-white/[0.06] transition-all"
                      title="Open Direct Message Thread"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-telemetry text-[12px] text-[#c7c4d7]/70">
        <span>
          Showing {paginatedTargets.length} of {filteredTargets.length} high-priority follow-ups
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-[#1a202c] hover:bg-[#242a36] text-[#dde2f3] disabled:opacity-40 border border-white/[0.06] transition-all"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`w-7 h-7 rounded flex items-center justify-center font-bold text-[12px] transition-all ${
                currentPage === p
                  ? 'bg-[#8083ff] text-[#0d0096] shadow-sm'
                  : 'text-[#c7c4d7] hover:bg-[#1a202c]'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-[#1a202c] hover:bg-[#242a36] text-[#dde2f3] disabled:opacity-40 border border-white/[0.06] transition-all"
          >
            Next
          </button>
        </div>
      </div>

    </section>
  );
};
