import React, { useState, useEffect } from 'react';
import { Search, X, Zap, Cpu, ArrowRight, LayoutDashboard, Bot, Kanban, Users2, BarChart3, GitBranch, Lock, Sparkles, Terminal } from 'lucide-react';
import { NavTab, UrgentTarget } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavTab) => void;
  targets: UrgentTarget[];
  onSelectTarget: (target: UrgentTarget) => void;
  onBatchDispatch: () => void;
  onToggleAi: () => void;
  onOpenGitHub: () => void;
  onOpenLogs?: () => void;
  onLockVault?: () => void;
  onToggleVaultMode?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  targets,
  onSelectTarget,
  onBatchDispatch,
  onToggleAi,
  onOpenGitHub,
  onOpenLogs,
  onLockVault,
  onToggleVaultMode
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTargets = targets.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.handle.toLowerCase().includes(query.toLowerCase()) ||
      t.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#161c28] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-white/[0.08] bg-[#0e131f]">
          <Search className="w-4 h-4 text-[#908fa0] mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants, campaigns, or actions..."
            className="flex-1 bg-transparent text-[#dde2f3] placeholder:text-[#908fa0] text-[14px] focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-[#1a202c] text-[#908fa0] font-telemetry text-[10px] border border-white/[0.08]">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-1 font-telemetry text-[12px]">
          
          {/* Quick Actions */}
          <div className="px-3 py-1.5 text-[10px] text-[#c7c4d7]/60 font-semibold uppercase tracking-wider">
            Quick Actions
          </div>

          <button
            onClick={() => {
              onBatchDispatch();
              onClose();
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#242a36] text-[#dde2f3] flex items-center justify-between group transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-[#4cd7f6]" />
              <span>Batch Dispatch AI Follow-ups</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#908fa0] group-hover:text-white" />
          </button>

          <button
            onClick={() => {
              onToggleAi();
              onClose();
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#242a36] text-[#dde2f3] flex items-center justify-between group transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-[#c0c1ff]" />
              <span>Switch AI Engine (Ollama / Gemini 3.8 Flash)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#908fa0] group-hover:text-white" />
          </button>

          <button
            onClick={() => {
              onOpenGitHub();
              onClose();
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#242a36] text-[#dde2f3] flex items-center justify-between group transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <GitBranch className="w-4 h-4 text-[#8083ff]" />
              <span>Push App to My GitHub Repository</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#908fa0] group-hover:text-white" />
          </button>

          {onOpenLogs && (
            <button
              onClick={() => {
                onOpenLogs();
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#141e30] text-[#4cd7f6] flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-[#4cd7f6]" />
                <span>Open Live Operational Logs & Diagnostics</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#4cd7f6] group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {onToggleVaultMode && (
            <button
              onClick={() => {
                onToggleVaultMode();
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#242a36] text-[#dde2f3] flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#ffb4ab]" />
                <span>Toggle Vault Mode (Demo Presentation vs Real Vault)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#908fa0] group-hover:text-white" />
            </button>
          )}

          {onLockVault && (
            <button
              onClick={() => {
                onClose();
                onLockVault();
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#93000a]/30 text-[#ffdad6] flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#ffb4ab]" />
                <span className="font-bold">Lock CRM Vault Immediately (⌘L)</span>
              </div>
              <span className="text-[10px] font-telemetry text-[#ffb4ab]">Secure</span>
            </button>
          )}

          {/* Navigation Views */}
          <div className="px-3 pt-3 pb-1 text-[10px] text-[#c7c4d7]/60 font-semibold uppercase tracking-wider">
            Navigate Views
          </div>

          <button
            onClick={() => {
              onSelectTab('executive-dashboard');
              onClose();
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#242a36] text-[#dde2f3] flex items-center gap-2.5"
          >
            <LayoutDashboard className="w-4 h-4 text-[#c7c4d7]" />
            <span>Executive Dashboard</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('follow-up-copilot');
              onClose();
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#242a36] text-[#dde2f3] flex items-center gap-2.5"
          >
            <Bot className="w-4 h-4 text-[#c7c4d7]" />
            <span>Follow-Up Copilot</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('crm-master-pipeline');
              onClose();
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#242a36] text-[#dde2f3] flex items-center gap-2.5"
          >
            <Kanban className="w-4 h-4 text-[#c7c4d7]" />
            <span>CRM Master Pipeline</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('lead-acquisition');
              onClose();
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#242a36] text-[#dde2f3] flex items-center gap-2.5"
          >
            <Users2 className="w-4 h-4 text-[#c7c4d7]" />
            <span>Lead Acquisition</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('insights-analytics');
              onClose();
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#242a36] text-[#dde2f3] flex items-center gap-2.5"
          >
            <BarChart3 className="w-4 h-4 text-[#c7c4d7]" />
            <span>Insights & Analytics</span>
          </button>

          {/* Restaurant Targets */}
          {filteredTargets.length > 0 && (
            <>
              <div className="px-3 pt-3 pb-1 text-[10px] text-[#c7c4d7]/60 font-semibold uppercase tracking-wider">
                Restaurants ({filteredTargets.length})
              </div>
              {filteredTargets.map((target) => (
                <button
                  key={target.id}
                  onClick={() => {
                    onSelectTarget(target);
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#242a36] text-[#dde2f3] flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="font-display font-semibold text-[13px]">{target.name}</span>
                    <span className="text-[11px] text-[#c7c4d7]/70">{target.handle} • {target.location}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#1a202c] text-[#4cd7f6] text-[10px]">
                    {target.overdueSla}
                  </span>
                </button>
              ))}
            </>
          )}

        </div>

      </div>
    </div>
  );
};
