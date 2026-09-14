import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight, 
  Smartphone, 
  KeyRound,
  Sparkles,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface AuthLockScreenProps {
  isOpen: boolean;
  onUnlock: (password: string, remember: boolean) => Promise<boolean>;
  onEnterDemoMode: () => void;
  isVerifying: boolean;
  errorMessage: string | null;
  clearError: () => void;
  isDefaultPasswordHint?: boolean;
}

export const AuthLockScreen: React.FC<AuthLockScreenProps> = ({
  isOpen,
  onUnlock,
  onEnterDemoMode,
  isVerifying,
  errorMessage,
  clearError,
  isDefaultPasswordHint = true
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showHint, setShowHint] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || isVerifying) return;
    await onUnlock(password.trim(), rememberMe);
  };

  const handleQuickFillDefault = () => {
    setPassword('closer2026');
    clearError();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080d17]/95 backdrop-blur-2xl overflow-y-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-[#8083ff]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[380px] h-[280px] bg-[#4cd7f6]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative w-full max-w-md my-auto bg-[#131926] border border-white/[0.1] rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        
        {/* Top Header Shield Bar */}
        <div className="px-6 pt-6 pb-4 border-b border-white/[0.06] bg-[#0e131f]/80 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1f2638] border border-[#8083ff]/30 flex items-center justify-center text-[#c0c1ff] shadow-[0_0_24px_rgba(128,131,255,0.25)] mb-3 relative">
            <Lock className="w-7 h-7 text-[#c0c1ff]" />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#8083ff] text-[#0d0096] flex items-center justify-center font-bold text-[9px]">
              ✓
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1a202c] border border-white/[0.08] text-[10px] font-telemetry tracking-widest text-[#c0c1ff] uppercase mb-1.5">
            <ShieldCheck className="w-3 h-3 text-[#4cd7f6]" />
            <span>Private CRM Vault</span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#dde2f3] tracking-tight">
            Security Gate Active
          </h2>
          <p className="text-[12px] text-[#c7c4d7]/70 mt-1 max-w-xs leading-relaxed">
            Public access is restricted to safeguard confidential high-ticket client leads and pipeline data.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          
          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/40 text-[#ffdad6] text-[12px] flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-[#ffb4ab] shrink-0 mt-0.5" />
              <div className="flex-1 font-telemetry">
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-telemetry text-[#c7c4d7]/80">
                <label htmlFor="vault-password" className="font-semibold uppercase tracking-wider text-[10px]">
                  Master Access Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-[#4cd7f6] hover:underline flex items-center gap-1 text-[10px]"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>First time?</span>
                </button>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  id="vault-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) clearError();
                  }}
                  placeholder="Enter vault password..."
                  autoFocus
                  className="w-full bg-[#1a202c] text-[#dde2f3] placeholder-[#908fa0] px-3.5 py-3 pr-10 rounded-xl border border-white/[0.1] focus:border-[#8083ff] focus:outline-none focus:ring-1 focus:ring-[#8083ff] text-[14px] font-mono transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#908fa0] hover:text-[#dde2f3] p-1 transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Default Password Quick-Hint */}
              {(showHint || isDefaultPasswordHint) && (
                <div className="mt-2 p-2.5 rounded-lg bg-[#0e131f] border border-white/[0.06] flex items-center justify-between text-[11px] font-telemetry">
                  <span className="text-[#c7c4d7]/70">
                    Default key: <span className="text-[#c0c1ff] font-mono font-bold">closer2026</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleQuickFillDefault}
                    className="text-[#4cd7f6] hover:text-white font-medium hover:underline text-[10px]"
                  >
                    Auto-fill Key
                  </button>
                </div>
              )}
            </div>

            {/* Remember Me Toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer text-[12px] text-[#c7c4d7]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#8083ff] focus:ring-0 bg-[#1a202c] border-white/[0.1]"
              />
              <span className="font-telemetry select-none">Remember this device (Stay logged in for 7 days)</span>
            </label>

            {/* Unlock Button */}
            <button
              type="submit"
              disabled={isVerifying || !password.trim()}
              className="w-full py-3 px-4 rounded-xl bg-[#c0c1ff] hover:bg-[#d5d5ff] text-[#1000a9] font-display font-bold text-[14px] tracking-wide transition-all shadow-[0_0_20px_rgba(192,193,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#1000a9] border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Unlock Private Vault</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-white/[0.08] w-full"></div>
            <span className="bg-[#131926] px-3 text-[10px] uppercase font-telemetry tracking-widest text-[#908fa0] relative">
              OR FOR CLIENT DEMOS
            </span>
          </div>

          {/* Demo Mode Button (Safe Sample Data) */}
          <div className="p-3.5 rounded-xl bg-[#1a202c]/70 border border-[#4cd7f6]/20 hover:border-[#4cd7f6]/40 transition-all flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#4cd7f6]">
                <Sparkles className="w-4 h-4" />
                <span className="font-display font-bold text-[13px]">
                  Demo Sandbox Mode
                </span>
              </div>
              <span className="text-[10px] font-telemetry font-bold px-1.5 py-0.5 rounded bg-[#4cd7f6]/20 text-[#4cd7f6]">
                ZERO REAL DATA
              </span>
            </div>

            <p className="text-[11px] text-[#c7c4d7]/70 leading-relaxed font-telemetry">
              Presenting or testing with clients? Launch a sanitized workspace seeded strictly with fake restaurant targets. Your confidential leads remain locked.
            </p>

            <button
              type="button"
              onClick={onEnterDemoMode}
              className="mt-1 w-full py-2 px-3 rounded-lg bg-[#242a36] hover:bg-[#323846] text-[#dde2f3] hover:text-white border border-white/[0.08] text-[12px] font-telemetry font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <span>Launch Demo Mode (Sample Data)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#4cd7f6]" />
            </button>
          </div>

          {/* Security Guarantee Notice */}
          <div className="pt-1 flex items-center justify-center gap-4 text-[10px] font-telemetry text-[#908fa0]">
            <span className="flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-[#4cd7f6]" />
              <span>Mobile & Desktop Sync</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#8083ff]" />
              <span>Session Isolation</span>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
