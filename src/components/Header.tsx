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
  Cpu,
  Lock,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { NavTab, VaultMode } from '../types';

interface HeaderProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenGitHub: () => void;
  onOpenLogs?: () => void;
  aiEngine: 'ollama' | 'gemini';
  onToggleAiEngine: () => void;
  unreadCount: number;
  vaultMode: VaultMode;
  onToggleVaultMode: () => void;
  onLock: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenSearch,
  onOpenNotifications,
  onOpenSettings,
  onOpenGitHub,
  onOpenLogs,
  aiEngine,
  onToggleAiEngine,
  unreadCount,
  vaultMode,
  onToggleVaultMode,
  onLock
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#0e131f]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
      <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-10 pt-3 pb-2 flex flex-col justify-between">
        
        {/* Top Operational Bar */}
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Left Brand & Engine Status */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange('executive-dashboard')}>
              <div className="w-9 h-9 rounded-lg bg-[#242a36] flex items-center justify-center text-[#c0c1ff] shadow-[0_0_16px_rgba(192,193,255,0.3)] border border-[#c0c1ff]/20">
                <Network className="w-5 h-5 text-[#c0c1ff]" />
              </div>
              <span className="font-display text-[16px] sm:text-[17px] font-bold tracking-tight text-[#dde2f3] uppercase hidden sm:inline-block">
                Outreach Engine
              </span>
            </div>

            {/* Vault Mode Pill (Demo Mode vs Private Vault) */}
            <button
              onClick={onToggleVaultMode}
              title={vaultMode === 'demo' ? "Currently in Demo Mode with fake sample data. Click to unlock Private Vault with real leads." : "Currently in Private Vault with real leads. Click to switch to Demo Mode for safe presentations."}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-telemetry text-[11px] font-semibold uppercase tracking-wider transition-all border ${
                vaultMode === 'demo'
                  ? 'bg-[#ffb4ab]/10 text-[#ffb4ab] border-[#ffb4ab]/30 hover:bg-[#ffb4ab]/20 shadow-[0_0_12px_rgba(255,180,171,0.15)]'
                  : 'bg-[#8083ff]/15 text-[#c0c1ff] border-[#8083ff]/40 hover:bg-[#8083ff]/25 shadow-[0_0_12px_rgba(128,131,255,0.2)]'
              }`}
            >
              {vaultMode === 'demo' ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#ffb4ab]" />
                  <span>Demo Mode (Fake Leads)</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4cd7f6]" />
                  <span>Private Vault (Real Leads)</span>
                </>
              )}
            </button>

            {/* AI Engine Status Pill */}
            <button
              onClick={onToggleAiEngine}
              title="Click to toggle between Ollama Local AI & Gemini 3.8 Flash Cloud AI"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1a202c] hover:bg-[#242a36] text-[#4cd7f6] border border-[#4cd7f6]/20 transition-all shadow-[0_0_12px_rgba(76,215,246,0.15)] group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
              <span className="font-telemetry text-[11px] font-semibold uppercase tracking-wider">
                {aiEngine === 'gemini' ? 'Gemini 3.8 Flash' : 'Ollama AI'}
              </span>
              <Cpu className="w-3 h-3 text-[#4cd7f6] opacity-70 group-hover:opacity-100 ml-0.5" />
            </button>

            <div className="hidden 2xl:flex items-center gap-1 font-telemetry text-[12px] text-[#c7c4d7]/70">
              <Terminal className="w-3.5 h-3.5 text-[#908fa0]" />
              <span>v4.2.0-PROD</span>
            </div>
          </div>

          {/* Center Search Trigger (⌘K) */}
          <div className="flex-1 max-w-md mx-2 hidden xl:block">
            <button
              onClick={onOpenSearch}
              className="relative flex items-center w-full bg-[#080e1a]/90 text-[#c7c4d7] hover:text-[#dde2f3] border border-white/[0.08] hover:border-[#8083ff]/40 px-3 py-1.5 rounded-lg text-left text-[13px] transition-all group"
            >
              <Search className="w-4 h-4 text-[#908fa0] group-hover:text-[#c0c1ff] mr-2 shrink-0" />
              <span className="truncate">Search restaurants, leads, campaigns...</span>
              <kbd className="ml-auto px-1.5 py-0.5 rounded bg-[#1a202c] text-[#908fa0] font-telemetry text-[10px] border border-white/[0.06]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Quick Lock / Password Protect Button */}
            <button
              onClick={onLock}
              title="Lock CRM Vault immediately (Requires password to unlock)"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#93000a]/20 hover:bg-[#93000a]/40 text-[#ffdad6] border border-[#ffb4ab]/30 text-[12px] font-telemetry font-bold transition-all shadow-sm group"
            >
              <Lock className="w-3.5 h-3.5 text-[#ffb4ab] group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">Lock Vault</span>
            </button>

            {/* GitHub Push / Sync Button */}
            <button
              onClick={onOpenGitHub}
              title="Push to GitHub / Repository Sync"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1a202c] hover:bg-[#242a36] text-[#c0c1ff] border border-[#8083ff]/30 text-[12px] font-telemetry font-medium transition-all shadow-sm"
            >
              <GitBranch className="w-4 h-4 text-[#c0c1ff]" />
              <span className="hidden lg:inline">GitHub</span>
            </button>

            {/* Operational Logs & Telemetry Button */}
            {onOpenLogs && (
              <button
                onClick={onOpenLogs}
                title="View Live Operational Logs & Render Deployment Telemetry"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141d2f] hover:bg-[#1d2942] text-[#4cd7f6] border border-[#4cd7f6]/30 text-[12px] font-telemetry font-medium transition-all shadow-sm group"
              >
                <Terminal className="w-4 h-4 text-[#4cd7f6] group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Live Logs</span>
              </button>
            )}

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
              title="Engine Tuning & Security Settings"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* User Profile */}
            <div 
              onClick={onLock}
              title="Logged in as Admin. Click to lock."
              className="w-8 h-8 rounded-full bg-[#8083ff] flex items-center justify-center text-[#0d0096] font-bold text-xs shadow-[0_0_12px_rgba(128,131,255,0.4)] cursor-pointer hover:ring-2 hover:ring-[#c0c1ff] transition-all"
            >
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
