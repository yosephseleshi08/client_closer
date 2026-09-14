import React, { useState } from 'react';
import { 
  X, 
  SlidersHorizontal, 
  Cpu, 
  Shield, 
  Zap, 
  Check, 
  Lock, 
  Key, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Terminal
} from 'lucide-react';
import { VaultMode } from '../../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiEngine: 'ollama' | 'gemini';
  onToggleAi: () => void;
  vaultMode: VaultMode;
  onToggleVaultMode: () => void;
  onLockVault: () => void;
  autoLockMinutes: number;
  onUpdateAutoLock: (minutes: number) => void;
  onOpenLogs?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  aiEngine,
  onToggleAi,
  vaultMode,
  onToggleVaultMode,
  onLockVault,
  autoLockMinutes,
  onUpdateAutoLock,
  onOpenLogs
}) => {
  const [activeTab, setActiveTab] = useState<'tuning' | 'security'>('security');
  const [rateLimitSpacing, setRateLimitSpacing] = useState('250ms');
  const [maxBatchSize, setMaxBatchSize] = useState('50');
  const [enableSmartRetry, setEnableSmartRetry] = useState(true);
  const [saved, setSaved] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{ success?: string; error?: string } | null>(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 500);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (!currentPassword) {
      setPasswordStatus({ error: 'Please enter your current master password.' });
      return;
    }
    if (newPassword.length < 4) {
      setPasswordStatus({ error: 'New password must be at least 4 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ error: 'New passwords do not match.' });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordStatus({ success: 'Master password updated! Use this on all your devices.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordStatus({ error: data.error || 'Failed to update master password.' });
      }
    } catch {
      setPasswordStatus({ error: 'Network error updating password. Please try again.' });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#161c28] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0e131f]">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-[#c0c1ff]" />
            <h3 className="font-display font-bold text-[16px] text-[#dde2f3]">
              Control Center & Security
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1a202c] hover:bg-[#242a36] text-[#c7c4d7] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 pt-3 border-b border-white/[0.06] bg-[#111622] gap-4">
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-2.5 text-[13px] font-display font-semibold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'security'
                ? 'border-[#8083ff] text-[#c0c1ff]'
                : 'border-transparent text-[#908fa0] hover:text-[#dde2f3]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Vault Security & Passwords</span>
          </button>
          <button
            onClick={() => setActiveTab('tuning')}
            className={`pb-2.5 text-[13px] font-display font-semibold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'tuning'
                ? 'border-[#8083ff] text-[#c0c1ff]'
                : 'border-transparent text-[#908fa0] hover:text-[#dde2f3]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Autonomous Engine Tuning</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 font-telemetry text-[12px] overflow-y-auto">
          
          {/* TAB 1: SECURITY & VAULT ACCESS */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              
              {/* Active Vault Mode & Quick Switch */}
              <div className="p-4 rounded-xl bg-[#1a202c] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display font-bold text-[14px] text-[#dde2f3]">
                      Current Mode:
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] tracking-wider uppercase ${
                      vaultMode === 'demo' ? 'bg-[#ffb4ab]/20 text-[#ffb4ab]' : 'bg-[#4cd7f6]/20 text-[#4cd7f6]'
                    }`}>
                      {vaultMode === 'demo' ? 'Demo Mode (Fake Leads)' : 'Private Vault (Real Leads)'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#c7c4d7]/70">
                    {vaultMode === 'demo'
                      ? 'Displaying fake/sample restaurant leads. Real data is hidden.'
                      : 'You are working with your private leads and live outreach data.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={onToggleVaultMode}
                    className="px-3 py-1.5 rounded-lg bg-[#242a36] hover:bg-[#343946] text-[#c0c1ff] font-semibold border border-white/[0.1] transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{vaultMode === 'demo' ? 'Unlock Real Vault' : 'Switch to Demo Mode'}</span>
                  </button>
                </div>
              </div>

              {/* Instant Lock Button */}
              <div className="p-3.5 rounded-xl bg-[#93000a]/15 border border-[#ffb4ab]/20 flex items-center justify-between">
                <div>
                  <span className="font-display font-bold text-[13px] text-[#ffdad6] block">
                    Lock CRM Immediately
                  </span>
                  <span className="text-[11px] text-[#c7c4d7]/70">
                    Locks the interface on this device instantly. Password required to re-enter.
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onLockVault();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#93000a] hover:bg-[#ba1a1a] text-[#ffdad6] font-bold text-[12px] transition-all flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Vault</span>
                </button>
              </div>

              {/* Auto-Lock Inactivity Timer */}
              <div className="space-y-1.5">
                <label className="text-[#c7c4d7]/80 uppercase font-semibold text-[10px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4cd7f6]" />
                  <span>Auto-Lock on Inactivity (Mobile & Desktop)</span>
                </label>
                <select
                  value={autoLockMinutes}
                  onChange={(e) => onUpdateAutoLock(Number(e.target.value))}
                  className="w-full bg-[#1a202c] text-[#dde2f3] p-2.5 rounded-lg border border-white/[0.08] focus:outline-none"
                >
                  <option value={0}>Manual Lock Only (Never auto-lock)</option>
                  <option value={15}>Auto-lock after 15 minutes of inactivity</option>
                  <option value={30}>Auto-lock after 30 minutes</option>
                  <option value={60}>Auto-lock after 1 hour</option>
                </select>
              </div>

              {/* Change Master Password Section */}
              <div className="pt-2 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#c0c1ff]" />
                  <span className="font-display font-bold text-[13px] text-[#dde2f3]">
                    Change Master Password
                  </span>
                </div>

                {passwordStatus?.error && (
                  <div className="p-2.5 rounded-lg bg-[#93000a]/20 border border-[#ffb4ab]/30 text-[#ffdad6] text-[11px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{passwordStatus.error}</span>
                  </div>
                )}

                {passwordStatus?.success && (
                  <div className="p-2.5 rounded-lg bg-[#4cd7f6]/20 border border-[#4cd7f6]/40 text-[#d0f4ff] text-[11px] flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4cd7f6] shrink-0" />
                    <span>{passwordStatus.success}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-2.5">
                  <div className="relative">
                    <input
                      type={showCurrentPass ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current master password (default: closer2026)"
                      className="w-full bg-[#1a202c] text-[#dde2f3] px-3 py-2 pr-9 rounded-lg border border-white/[0.08] placeholder-[#908fa0] text-[12px] font-mono focus:border-[#8083ff] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#908fa0]"
                    >
                      {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="relative">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New master password"
                        className="w-full bg-[#1a202c] text-[#dde2f3] px-3 py-2 pr-9 rounded-lg border border-white/[0.08] placeholder-[#908fa0] text-[12px] font-mono focus:border-[#8083ff] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#908fa0]"
                      >
                        {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full bg-[#1a202c] text-[#dde2f3] px-3 py-2 rounded-lg border border-white/[0.08] placeholder-[#908fa0] text-[12px] font-mono focus:border-[#8083ff] focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      disabled={isUpdatingPassword || !currentPassword || !newPassword}
                      className="px-4 py-1.5 rounded-lg bg-[#242a36] hover:bg-[#343946] text-[#c0c1ff] font-semibold border border-[#8083ff]/30 text-[12px] transition-all disabled:opacity-50"
                    >
                      {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Operational Logs & Diagnostics Launch Banner */}
              {onOpenLogs && (
                <div className="p-3.5 rounded-xl bg-[#141b2b] border border-[#2b3854] flex items-center justify-between">
                  <div>
                    <span className="font-display font-bold text-[13px] text-[#dde2f3] flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#4cd7f6]" />
                      Live Operational Logs & Render Diagnostics
                    </span>
                    <span className="text-[11px] text-[#8e98b0]">
                      Inspect real-time auth attempts, AI generation, and Render deployment guides
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenLogs();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#20293d] hover:bg-[#2c3854] text-[#4cd7f6] font-semibold text-xs border border-[#3b4b70] transition-colors"
                  >
                    Open Console
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: ENGINE TUNING */}
          {activeTab === 'tuning' && (
            <div className="space-y-4">
              {/* AI Engine Selection */}
              <div className="p-3.5 rounded-xl bg-[#1a202c] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="font-display font-bold text-[14px] text-[#dde2f3] block">
                    Primary Inference Engine
                  </span>
                  <span className="text-[11px] text-[#c7c4d7]/70">
                    {aiEngine === 'gemini' ? 'Gemini 3.8 Flash (Cloud)' : 'Ollama Qwen-2.5:3b (Local)'}
                  </span>
                </div>

                <button
                  onClick={onToggleAi}
                  className="px-3 py-1.5 rounded-lg bg-[#242a36] hover:bg-[#343946] text-[#4cd7f6] font-semibold border border-[#4cd7f6]/30 transition-all"
                >
                  Switch Engine
                </button>
              </div>

              {/* Rate Limiting */}
              <div className="space-y-1.5">
                <label className="text-[#c7c4d7]/70 uppercase font-semibold text-[10px]">
                  API Dispatch Throttle
                </label>
                <select
                  value={rateLimitSpacing}
                  onChange={(e) => setRateLimitSpacing(e.target.value)}
                  className="w-full bg-[#1a202c] text-[#dde2f3] p-2.5 rounded-lg border border-white/[0.08] focus:outline-none"
                >
                  <option value="150ms">Aggressive (150ms delay)</option>
                  <option value="250ms">Recommended (250ms delay)</option>
                  <option value="500ms">Safe Anti-Ban Mode (500ms delay)</option>
                </select>
              </div>

              {/* Batch Size */}
              <div className="space-y-1.5">
                <label className="text-[#c7c4d7]/70 uppercase font-semibold text-[10px]">
                  Max Concurrent Threads
                </label>
                <select
                  value={maxBatchSize}
                  onChange={(e) => setMaxBatchSize(e.target.value)}
                  className="w-full bg-[#1a202c] text-[#dde2f3] p-2.5 rounded-lg border border-white/[0.08] focus:outline-none"
                >
                  <option value="25">25 Threads / Cycle</option>
                  <option value="50">50 Threads / Cycle</option>
                  <option value="100">100 Threads / Cycle</option>
                </select>
              </div>

              {/* Smart Retry */}
              <label className="flex items-center gap-3 p-3 rounded-lg bg-[#1a202c] cursor-pointer border border-white/[0.04]">
                <input
                  type="checkbox"
                  checked={enableSmartRetry}
                  onChange={(e) => setEnableSmartRetry(e.target.checked)}
                  className="w-4 h-4 rounded text-[#8083ff] focus:ring-0"
                />
                <div className="flex flex-col">
                  <span className="text-[#dde2f3] font-semibold">Autonomous SLA Rescheduling</span>
                  <span className="text-[11px] text-[#c7c4d7]/70">Automatically bumps unopened DMs after 48 hours</span>
                </div>
              </label>

              {/* Save Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-5 py-2 rounded-lg bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] font-bold text-[13px] transition-all flex items-center gap-1.5"
                >
                  {saved ? <Check className="w-4 h-4" /> : null}
                  <span>{saved ? 'Saved' : 'Save Configuration'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

