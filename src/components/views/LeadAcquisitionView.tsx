import React, { useState } from 'react';
import { Users2, Search, Plus, Check, Globe, Sparkles, Filter } from 'lucide-react';
import { LEAD_ACQUISITION_TARGETS } from '../../data/initialData';
import { LeadAcquisitionCandidate } from '../../types';

interface LeadAcquisitionViewProps {
  onQueueCandidate: (candidate: LeadAcquisitionCandidate) => void;
}

export const LeadAcquisitionView: React.FC<LeadAcquisitionViewProps> = ({ onQueueCandidate }) => {
  const [candidates, setCandidates] = useState<LeadAcquisitionCandidate[]>(LEAD_ACQUISITION_TARGETS);
  const [filterCity, setFilterCity] = useState('All');
  const [search, setSearch] = useState('');

  const handleQueue = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          onQueueCandidate(c);
          return { ...c, status: 'queued' };
        }
        return c;
      })
    );
  };

  const filtered = candidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.neighborhood.toLowerCase().includes(search.toLowerCase());
    const matchesCity = filterCity === 'All' || c.city === filterCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="flex flex-col gap-6 max-w-[1728px] mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#161c28]/90 border border-white/[0.08] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4cd7f6]/20 flex items-center justify-center text-[#4cd7f6] border border-[#4cd7f6]/30">
            <Users2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#dde2f3]">
              Hospitality Lead Acquisition Engine
            </h2>
            <p className="text-[13px] text-[#c7c4d7]/70">
              Michelin Guide & High-Check Dining Social Intelligence Ingestion
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-[#908fa0] absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by venue or neighborhood..."
              className="bg-[#080e1a] text-[#dde2f3] text-[13px] pl-9 pr-4 py-2 rounded-lg border border-white/[0.08] focus:outline-none focus:border-[#8083ff]"
            />
          </div>
        </div>
      </div>

      {/* Target Candidates Table */}
      <div className="rounded-xl bg-[#161c28]/80 border border-white/[0.08] p-5 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#080e1a]/80 text-[#c7c4d7]/70 font-telemetry text-[11px] uppercase tracking-wider border-b border-white/[0.06]">
                <th className="py-3 px-4 rounded-l-lg">Restaurant Venue</th>
                <th className="py-3 px-4">Location & Michelin Status</th>
                <th className="py-3 px-4">Avg Check / Covers</th>
                <th className="py-3 px-4">Instagram Audience</th>
                <th className="py-3 px-4">Current Booking Engine</th>
                <th className="py-3 px-4 text-right rounded-r-lg">Autonomous Pipeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-[13px] text-[#dde2f3]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#242a36]/40 transition-colors">
                  
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-[14px] text-[#dde2f3]">{item.name}</span>
                      <span className="font-telemetry text-[11px] text-[#4cd7f6]">{item.instagramHandle}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-telemetry text-[12px]">{item.neighborhood}, {item.city}</span>
                      <span className="px-2 py-0.5 rounded bg-[#571bc1]/30 text-[#e9ddff] text-[10px] font-telemetry border border-[#c4abff]/30">
                        {item.michelinStatus}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-col font-telemetry text-[12px]">
                      <span className="text-[#dde2f3] font-bold">${item.avgCheck} / cover</span>
                      <span className="text-[#c7c4d7]/70 text-[11px]">{item.coversNight} covers/night</span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-telemetry text-[12px] text-[#c0c1ff] font-semibold">
                      {item.followers} followers
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-telemetry text-[12px] text-[#ffb4ab]">
                      {item.bookingProvider}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleQueue(item.id)}
                      disabled={item.status === 'queued'}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-telemetry font-semibold transition-all inline-flex items-center gap-1.5 ${
                        item.status === 'queued'
                          ? 'bg-[#4cd7f6]/20 text-[#4cd7f6] border border-[#4cd7f6]/30'
                          : 'bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] shadow-sm'
                      }`}
                    >
                      {item.status === 'queued' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Queued</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Queue for AI Outreach</span>
                        </>
                      )}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
