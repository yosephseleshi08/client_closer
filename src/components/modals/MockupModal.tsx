import React, { useState } from 'react';
import { X, ExternalLink, Smartphone, Check, Calendar, Clock, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { UrgentTarget } from '../../types';

interface MockupModalProps {
  target: UrgentTarget | null;
  onClose: () => void;
}

export const MockupModal: React.FC<MockupModalProps> = ({ target, onClose }) => {
  const [selectedParty, setSelectedParty] = useState(2);
  const [selectedTime, setSelectedTime] = useState('7:30 PM');
  const [reserved, setReserved] = useState(false);

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#161c28] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0e131f]/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#242a36] flex items-center justify-center text-[#4cd7f6] border border-[#4cd7f6]/20">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-[16px] text-[#dde2f3]">
                  {target.mockupTitle}
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#1a202c] text-[#4cd7f6] font-telemetry text-[10px] border border-[#4cd7f6]/30">
                  {target.mockupFile}
                </span>
              </div>
              <p className="font-telemetry text-[11px] text-[#c7c4d7]/70">
                Figma High-Fidelity Prototype • Direct Social-to-Cover Engine
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

        {/* Main Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left: Mobile Phone Device Frame (5 cols) */}
          <div className="md:col-span-6 flex justify-center">
            <div className="w-[310px] h-[580px] rounded-[36px] bg-[#080e1a] border-4 border-[#242a36] shadow-[0_0_35px_rgba(76,215,246,0.15)] flex flex-col overflow-hidden relative">
              
              {/* Dynamic Island / Notch */}
              <div className="w-24 h-4 bg-[#242a36] rounded-full mx-auto mt-2 shrink-0"></div>

              {/* In-App Browser Header */}
              <div className="px-4 py-2 flex items-center justify-between border-b border-white/[0.06] text-[11px] font-telemetry text-[#c7c4d7]/70">
                <span className="truncate">{target.handle}</span>
                <span className="text-[#4cd7f6] text-[10px] font-bold">VERIFIED VIP</span>
              </div>

              {/* Mobile Content */}
              <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto">
                <div className="flex flex-col gap-3">
                  <div className="h-28 rounded-xl bg-[#242a36] relative overflow-hidden flex items-end p-3">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                    <div className="relative z-20">
                      <span className="font-display font-bold text-white text-[15px] block">{target.name}</span>
                      <span className="text-[11px] text-[#c7c4d7]">{target.location} • {target.cuisine}</span>
                    </div>
                  </div>

                  {/* Party Size Selector */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-telemetry text-[#c7c4d7]/70 uppercase">Party Size</span>
                    <div className="grid grid-cols-3 gap-1.5 font-telemetry text-[11px]">
                      {[2, 4, 6].map((num) => (
                        <button
                          key={num}
                          onClick={() => setSelectedParty(num)}
                          className={`py-1.5 rounded-lg transition-all border ${
                            selectedParty === num
                              ? 'bg-[#c0c1ff] text-[#1000a9] font-bold border-[#c0c1ff]'
                              : 'bg-[#161c28] text-[#dde2f3] border-white/[0.06]'
                          }`}
                        >
                          {num} Guests
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selector */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-telemetry text-[#c7c4d7]/70 uppercase">Tonight's Prime Seating</span>
                    <div className="grid grid-cols-2 gap-1.5 font-telemetry text-[11px]">
                      {['6:00 PM', '7:30 PM', '8:45 PM', '9:30 PM VIP'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-1.5 px-2 rounded-lg text-left transition-all border flex items-center justify-between ${
                            selectedTime === t
                              ? 'bg-[#8083ff]/30 text-[#c0c1ff] font-bold border-[#8083ff]'
                              : 'bg-[#161c28] text-[#dde2f3] border-white/[0.06]'
                          }`}
                        >
                          <span>{t}</span>
                          <Clock className="w-3 h-3 text-[#908fa0]" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Direct Benefit Callout */}
                  <div className="p-2.5 rounded-lg bg-[#009eb9]/15 border border-[#4cd7f6]/30 text-[11px] text-[#4cd7f6] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Direct reservation. Zero 3rd-party fee. Instant confirmation.</span>
                  </div>
                </div>

                {/* Instant Action CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => setReserved(true)}
                    className="w-full py-2.5 rounded-xl bg-[#c0c1ff] text-[#1000a9] hover:bg-[#e1e0ff] font-bold text-[13px] shadow-[0_0_15px_rgba(192,193,255,0.3)] transition-all flex items-center justify-center gap-1.5"
                  >
                    {reserved ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Confirmed: {selectedTime}!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 fill-current" />
                        <span>Book Instant Table ({selectedParty}p)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Technical Pitch & ROI Specs (6 cols) */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-[#1a202c] border border-white/[0.08]">
              <h4 className="font-display font-bold text-[15px] text-[#dde2f3] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c0c1ff]" />
                Value Proposition Sent to {target.name}
              </h4>
              <p className="text-[13px] text-[#c7c4d7] leading-relaxed">
                Most Michelin and fine-dining restaurants pay <strong>$3.00 to $7.50 per cover</strong> to OpenTable and Resy, while losing ownership of guest data.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 font-telemetry text-[11px]">
                <div className="p-2.5 rounded bg-[#080e1a] border border-white/[0.04]">
                  <span className="text-[#c7c4d7]/60 block">SAVINGS PER MONTH</span>
                  <span className="text-[#4cd7f6] text-[14px] font-bold">$3,840 - $7,200</span>
                </div>
                <div className="p-2.5 rounded bg-[#080e1a] border border-white/[0.04]">
                  <span className="text-[#c7c4d7]/60 block">GUEST CONVERSION</span>
                  <span className="text-[#c0c1ff] text-[14px] font-bold">+28.6% from Social</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#1a202c] border border-white/[0.08]">
              <h4 className="font-telemetry text-[12px] font-bold text-[#dde2f3] uppercase tracking-wider mb-2">
                Included High-Ticket Features
              </h4>
              <ul className="space-y-1.5 text-[12.5px] text-[#c7c4d7]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4cd7f6]" /> Direct Instagram Bio Link & DM deep-link routing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4cd7f6]" /> Apple Pay & Stripe deposit lock for high-ticket tables
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4cd7f6]" /> Native SevenRooms / POS calendar webhook sync
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#4cd7f6]" /> VIP concierge SMS notifications
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] hover:text-[#1000a9] font-bold text-[13px] transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
