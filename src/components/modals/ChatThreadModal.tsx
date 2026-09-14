import React, { useState } from 'react';
import { X, Send, Sparkles, User, CheckCheck, Clock } from 'lucide-react';
import { UrgentTarget, InboundSignal } from '../../types';

interface ChatThreadModalProps {
  item: UrgentTarget | InboundSignal | null;
  onClose: () => void;
  onSendMessage: (text: string) => void;
}

export const ChatThreadModal: React.FC<ChatThreadModalProps> = ({ item, onClose, onSendMessage }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'prospect'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Hey Chef! Saw your weekend truffle course blew up. Built you a sleek direct reservation funnel demo so guests book directly off social rather than paying 3rd-party cover fees. Check it here?',
      time: '10:45 AM'
    },
    {
      sender: 'prospect',
      text: item && 'intent' in item 
        ? item.message 
        : 'Hey! Thanks for reaching out. We actually lose quite a bit to Resy monthly. Does this link integrate with SevenRooms?',
      time: '11:12 AM'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  if (!item) return null;

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    const newMsg = {
      sender: 'ai' as const,
      text: inputMessage.trim(),
      time: 'Just now'
    };
    setMessages((prev) => [...prev, newMsg]);
    onSendMessage(inputMessage.trim());
    setInputMessage('');

    // Simulate instant intelligent response after 1.5s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'prospect',
          text: 'Sounds great. Send over the contract & onboarding link, I will have our General Manager review this afternoon.',
          time: 'Just now'
        }
      ]);
    }, 1500);
  };

  const name = 'restaurantName' in item ? item.restaurantName : item.name;
  const handle = item.handle;
  const platform = item.platform;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#161c28] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
        
        {/* Chat Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-[#0e131f]/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#8083ff]/20 flex items-center justify-center font-bold text-[#c0c1ff] border border-[#c0c1ff]/20">
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="font-display font-bold text-[15px] text-[#dde2f3] flex items-center gap-2">
                <span>{name}</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-telemetry font-semibold bg-[#1a202c] text-[#4cd7f6] border border-[#4cd7f6]/20">
                  {platform}
                </span>
              </h3>
              <p className="font-telemetry text-[11px] text-[#c7c4d7]/70">
                {handle} • Active Thread
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

        {/* Message History */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 bg-[#080e1a]/50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col max-w-[82%] ${
                msg.sender === 'ai' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <div
                className={`p-3 rounded-2xl text-[13px] leading-relaxed ${
                  msg.sender === 'ai'
                    ? 'bg-[#8083ff] text-[#0d0096] font-medium rounded-br-none shadow-md shadow-[#8083ff]/20'
                    : 'bg-[#1a202c] text-[#dde2f3] rounded-bl-none border border-white/[0.08]'
                }`}
              >
                {msg.text}
              </div>
              <span className="font-telemetry text-[10px] text-[#c7c4d7]/60 mt-1 px-1">
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-[#0e131f] border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-telemetry text-[10px] text-[#c7c4d7]/60 shrink-0">AI Quick Reply:</span>
          <button
            onClick={() => setInputMessage("Yes! We have a native 2-way SevenRooms webhook integration.")}
            className="px-2.5 py-1 rounded-full bg-[#1a202c] hover:bg-[#242a36] text-[#4cd7f6] text-[11px] font-telemetry border border-[#4cd7f6]/20 shrink-0 transition-colors"
          >
            SevenRooms Integration
          </button>
          <button
            onClick={() => setInputMessage("Here is the 1-page agreement with zero monthly SaaS fee, just 1.5% on direct tables.")}
            className="px-2.5 py-1 rounded-full bg-[#1a202c] hover:bg-[#242a36] text-[#c0c1ff] text-[11px] font-telemetry border border-[#c0c1ff]/20 shrink-0 transition-colors"
          >
            Send Contract Proposal
          </button>
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 bg-[#161c28] border-t border-white/[0.08] flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type follow-up response or instruction..."
            className="flex-1 bg-[#080e1a] text-[#dde2f3] placeholder:text-[#908fa0] text-[13px] px-3.5 py-2 rounded-lg border border-white/[0.08] focus:outline-none focus:border-[#8083ff]"
          />
          <button
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            className="p-2 rounded-lg bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] disabled:opacity-40 transition-all font-bold"
          >
            <Send className="w-4 h-4 fill-current" />
          </button>
        </div>

      </div>
    </div>
  );
};
