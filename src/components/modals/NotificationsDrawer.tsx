import React from 'react';
import { X, Bell, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { InboundSignal } from '../../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  signals: InboundSignal[];
  onSelectSignal: (signal: InboundSignal) => void;
  onMarkAllRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  signals,
  onSelectSignal,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#161c28] border-l border-white/[0.1] h-full shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#0e131f]">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-[#c0c1ff]" />
            <h3 className="font-display font-bold text-[16px] text-[#dde2f3]">
              Inbound Signals & Alerts
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-[11px] font-telemetry text-[#4cd7f6] hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#c7c4d7] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Signals List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {signals.map((signal) => (
            <div
              key={signal.id}
              onClick={() => {
                onSelectSignal(signal);
                onClose();
              }}
              className="p-3.5 rounded-xl bg-[#1a202c] hover:bg-[#242a36] border border-white/[0.06] cursor-pointer transition-all flex flex-col gap-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-[13.5px] text-[#dde2f3]">
                    {signal.restaurantName}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-telemetry bg-[#080e1a] text-[#4cd7f6]">
                    {signal.platform}
                  </span>
                </div>
                <span className="text-[11px] font-telemetry text-[#c7c4d7]/70">
                  {signal.timeAgo}
                </span>
              </div>

              <p className="text-[12.5px] text-[#c7c4d7] leading-relaxed">
                {signal.message}
              </p>

              <div className="flex items-center justify-between pt-1">
                <span className="font-telemetry text-[10px] text-[#e9ddff] font-bold">
                  Intent: {signal.intent}
                </span>
                <span className="text-[#c0c1ff] text-[11px] font-telemetry flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Open Thread</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
