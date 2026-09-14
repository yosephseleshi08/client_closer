import React from 'react';
import { 
  Network, 
  Terminal, 
  Search, 
  Zap, 
  Bell, 
  SlidersHorizontal, 
  User, 
  ChevronRight,
  GitBranch,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { NavTab } from '../types';

interface HeaderProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenGitHub: () => void;
  aiEngine: 'ollama' | 'gemini';
  onToggleAiEngine: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenSearch,
  onOpenNotifications,
  onOpenSettings,
  onOpenGitHub,
  aiEngine,
  onToggleAiEngine,
  unreadCount
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#0e131f]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
      <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-10 pt-3 pb-2 flex flex-col justify-between">
        
        {/* Top Operational Bar */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Brand & Engine Status */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange('executive-dashboard')}>
              <div className="w-9 h-9 rounded-lg bg-[#242a36] flex items-center justify-center text-[#c0c1ff] shadow-[0_0_16px_rgba(192,193,255,0.3)] border border-[#c0c1ff]/20">
                <Network className="w-5 h-5 text-[#c0c1ff]" />
              </div>
              <span className="font-display text-[17px] font-bold tracking-tight text-[#dde2f3] uppercase hidden sm:inline-block">
                Outreach Engine Pro
              </span>
            </div>

            {/* AI Engine Status Pill - Interactive toggle */}
            <button
              onClick={onToggleAiEngine}
              title="Click to toggle between Ollama Local AI & Gemini 3.8 Flash Cloud AI"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1a202c] hover:bg-[#242a36] text-[#4cd7f6] border border-[#4cd7f6]/20 transition-all shadow-[0_0_12px_rgba(76,215,246,0.15)] group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
              <span className="font-telemetry text-[11px] font-semibold uppercase tracking-wider">
                {aiEngine === 'gemini' ? 'Gemini 3.8 Flash Active' : 'Ollama AI Active'}
              </span>
              <Cpu className="w-3 h-3 text-[#4cd7f6] opacity-70 group-hover:opacity-100 ml-0.5" />
            </button>

            <div className="hidden xl:flex items-center gap-1 font-telemetry text-[12px] text-[#c7c4d7]/70">
              <Terminal className="w-3.5 h-3.5 text-[#908fa0]" />
              <span>v4.2.0-PROD</span>
            </div>
          </div>

          {/* Center Search Trigger (⌘K) */}
          <div className="flex-1 max-w-lg mx-2 sm:mx-6 hidden md:block">
            <button
              onClick={onOpenSearch}
              className="relative flex items-center w-full bg-[#080e1a]/90 text-[#c7c4d7] hover:text-[#dde2f3] border border-white/[0.08] hover:border-[#8083ff]/40 px-3 py-1.5 rounded-lg text-left text-[13px] transition-all group"
            >
              <Search className="w-4 h-4 text-[#908fa0] group-hover:text-[#c0c1ff] mr-2 shrink-0" />
              <span className="truncate">Search restaurants, active campaigns, high-ticket leads...</span>
              <kbd className="ml-auto px-1.5 py-0.5 rounded bg-[#1a202c] text-[#908fa0] font-telemetry text-[10px] border border-white/[0.06]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Health Meter */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#080e1a] border border-white/[0.06] text-[#c7c4d7]">
              <Zap className="w-3.5 h-3.5 text-[#4cd7f6]" />
              <span className="font-telemetry text-[12px] font-bold text-[#dde2f3]">98.4%</span>
              <span className="font-telemetry text-[10px] text-[#908fa0] uppercase">Health</span>
            </div>

            {/* GitHub Push / Sync Button */}
            <button
              onClick={onOpenGitHub}
              title="Push to GitHub / Repository Sync"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1a202c] hover:bg-[#242a36] text-[#c0c1ff] border border-[#8083ff]/30 text-[12px] font-telemetry font-medium transition-all shadow-sm"
            >
              <GitBranch className="w-4 h-4 text-[#c0c1ff]" />
              <span className="hidden sm:inline">GitHub</span>
            </button>

            {/* Notifications */}
            <button
              onClick={onOpenNotifications}
              className="w-8 h-8 rounded-lg bg-[#1a202c] hover:bg-[#242a36] text-[#c7c4d7] hover:text-white transition-all flex items-center justify-center relative border border-white/[0.06]"
              title="Inbound Signals & Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ffb4ab] ring-2 ring-[#0e131f] animate-pulse"></span>
              )}
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="w-8 h-8 rounded-lg bg-[#1a202c] hover:bg-[#242a36] text-[#c7c4d7] hover:text-white transition-all flex items-center justify-center border border-white/[0.06]"
              title="Engine Tuning"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* User Profile */}
            <div className="w-8 h-8 rounded-full bg-[#8083ff] flex items-center justify-center text-[#0d0096] font-bold text-xs shadow-[0_0_12px_rgba(128,131,255,0.4)]">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Navigation Row */}
        <div className="flex items-center justify-between pt-2.5 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => onTabChange('executive-dashboard')}
              className={`px-3 py-1.5 rounded-lg text-[13px] transition-all font-medium ${
                currentTab === 'executive-dashboard'
                  ? 'bg-[#8083ff] text-[#0d0096] font-semibold shadow-[0_0_12px_rgba(128,131,255,0.4)]'
                  : 'text-[#c7c4d7] hover:bg-[#1a202c] hover:text-white'
              }`}
            >
              Executive Dashboard
            </button>
            <button
              onClick={() => onTabChange('follow-up-copilot')}
              className={`px-3 py-1.5 rounded-lg text-[13px] transition-all font-medium ${
                currentTab === 'follow-up-copilot'
                  ? 'bg-[#8083ff] text-[#0d0096] font-semibold shadow-[0_0_12px_rgba(128,131,255,0.4)]'
                  : 'text-[#c7c4d7] hover:bg-[#1a202c] hover:text-white'
              }`}
            >
              Follow-Up Copilot
            </button>
            <button
              onClick={() => onTabChange('crm-master-pipeline')}
              className={`px-3 py-1.5 rounded-lg text-[13px] transition-all font-medium ${
                currentTab === 'crm-master-pipeline'
                  ? 'bg-[#8083ff] text-[#0d0096] font-semibold shadow-[0_0_12px_rgba(128,131,255,0.4)]'
                  : 'text-[#c7c4d7] hover:bg-[#1a202c] hover:text-white'
              }`}
            >
              CRM Master Pipeline
            </button>
            <button
              onClick={() => onTabChange('lead-acquisition')}
              className={`px-3 py-1.5 rounded-lg text-[13px] transition-all font-medium ${
                currentTab === 'lead-acquisition'
                  ? 'bg-[#8083ff] text-[#0d0096] font-semibold shadow-[0_0_12px_rgba(128,131,255,0.4)]'
                  : 'text-[#c7c4d7] hover:bg-[#1a202c] hover:text-white'
              }`}
            >
              Lead Acquisition
            </button>
            <button
              onClick={() => onTabChange('insights-analytics')}
              className={`px-3 py-1.5 rounded-lg text-[13px] transition-all font-medium ${
                currentTab === 'insights-analytics'
                  ? 'bg-[#8083ff] text-[#0d0096] font-semibold shadow-[0_0_12px_rgba(128,131,255,0.4)]'
                  : 'text-[#c7c4d7] hover:bg-[#1a202c] hover:text-white'
              }`}
            >
              Insights & Analytics
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-1.5 font-telemetry text-[12px] text-[#c7c4d7]/70 shrink-0 ml-4">
            <span>Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#908fa0]" />
            <span className="text-[#c0c1ff] font-medium">Global Enterprise</span>
          </div>
        </div>

      </div>
    </header>
  );
};
