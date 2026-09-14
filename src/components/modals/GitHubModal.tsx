import React, { useState, useEffect } from 'react';
import { X, GitBranch, GitCommit, Copy, Check, ExternalLink, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose }) => {
  const [gitStatus, setGitStatus] = useState<any>({
    branch: 'main',
    lastCommit: '0948e9a feat: Outreach Engine Pro full release',
    hasRemote: false
  });
  const [remoteUrl, setRemoteUrl] = useState('');
  const [isPushing, setIsPushing] = useState(false);
  const [pushResult, setPushResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);
  const [copiedCli, setCopiedCli] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/git-status')
        .then((res) => res.json())
        .then((data) => setGitStatus(data))
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePush = async () => {
    if (!remoteUrl.trim()) return;
    setIsPushing(true);
    setPushResult(null);

    try {
      const res = await fetch('/api/git-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          remoteUrl: remoteUrl.trim(),
          branch: gitStatus.branch || 'main'
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPushResult({ success: true, message: data.message });
      } else {
        setPushResult({ success: false, error: data.error || 'Push failed. Please check repository permissions or token.' });
      }
    } catch (err: any) {
      setPushResult({ success: false, error: err.message || 'Network error executing git push' });
    } finally {
      setIsPushing(false);
    }
  };

  const cliCode = `# Connect this applet to your personal GitHub repository:
git remote add origin ${remoteUrl || 'https://github.com/<your-username>/outreach-engine-pro.git'}
git branch -M main
git push -u origin main`;

  const copyCli = () => {
    navigator.clipboard.writeText(cliCode);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#161c28] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0e131f]/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#242a36] flex items-center justify-center text-[#c0c1ff] border border-[#c0c1ff]/20">
              <GitBranch className="w-4 h-4 text-[#c0c1ff]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[16px] text-[#dde2f3] flex items-center gap-2">
                <span>Push to My GitHub</span>
                <span className="text-[11px] font-telemetry px-2 py-0.5 rounded bg-[#1a202c] text-[#4cd7f6] border border-[#4cd7f6]/30">
                  Branch: {gitStatus.branch || 'main'}
                </span>
              </h3>
              <p className="font-telemetry text-[11px] text-[#c7c4d7]/70">
                Outreach Engine Pro Git Repository Sync
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

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5">
          
          {/* Repository Status Pill */}
          <div className="p-3.5 rounded-xl bg-[#080e1a] border border-white/[0.06] flex flex-col gap-2 font-telemetry text-[12px]">
            <div className="flex items-center justify-between">
              <span className="text-[#c7c4d7]/70 uppercase text-[10px] font-bold">Local Git Status</span>
              <span className="text-[#4cd7f6] flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> Clean Tree & Committed
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#dde2f3]">
              <GitCommit className="w-4 h-4 text-[#8083ff]" />
              <span className="truncate">{gitStatus.lastCommit || 'Initial commit ready'}</span>
            </div>
          </div>

          {/* Option 1: Direct Push from Web UI */}
          <div className="p-4 rounded-xl bg-[#1a202c] border border-white/[0.08] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-[14px] text-[#dde2f3]">
                1. Push Directly to Your Remote Repo
              </span>
              <span className="text-[10px] font-telemetry text-[#4cd7f6] uppercase font-bold">Recommended</span>
            </div>
            <p className="text-[12.5px] text-[#c7c4d7] leading-relaxed">
              Create an empty repository on GitHub (e.g. <code>outreach-engine-pro</code>), then paste your repo URL below. If authentication is needed, include your token: <code>https://&lt;token&gt;@github.com/user/repo.git</code>
            </p>

            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                value={remoteUrl}
                onChange={(e) => setRemoteUrl(e.target.value)}
                placeholder="https://github.com/your-username/outreach-engine-pro.git"
                className="w-full bg-[#080e1a] text-[#dde2f3] placeholder:text-[#908fa0] text-[13px] px-3.5 py-2.5 rounded-lg border border-white/[0.08] focus:outline-none focus:border-[#8083ff] font-mono"
              />
            </div>

            <button
              onClick={handlePush}
              disabled={isPushing || !remoteUrl.trim()}
              className="self-end px-5 py-2 rounded-lg bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] font-bold text-[13px] disabled:opacity-40 transition-all flex items-center gap-2 shadow-md shadow-[#c0c1ff]/20"
            >
              {isPushing ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-[#1000a9] border-t-transparent rounded-full animate-spin"></span>
                  <span>Pushing to GitHub...</span>
                </>
              ) : (
                <>
                  <GitBranch className="w-4 h-4" />
                  <span>Push to Remote</span>
                </>
              )}
            </button>

            {pushResult && (
              <div className={`p-3 rounded-lg text-[12px] font-telemetry border ${
                pushResult.success
                  ? 'bg-[#009eb9]/20 text-[#4cd7f6] border-[#4cd7f6]/30'
                  : 'bg-[#93000a]/30 text-[#ffdad6] border-[#ffb4ab]/30'
              }`}>
                {pushResult.success ? pushResult.message : pushResult.error}
              </div>
            )}
          </div>

          {/* Option 2: AI Studio Native Settings Export */}
          <div className="p-4 rounded-xl bg-[#1a202c] border border-white/[0.08] flex flex-col gap-2">
            <span className="font-display font-bold text-[14px] text-[#dde2f3]">
              2. Google AI Studio Settings Export
            </span>
            <p className="text-[12.5px] text-[#c7c4d7] leading-relaxed">
              You can also export this applet directly using Google AI Studio's built-in interface:
            </p>
            <ol className="list-decimal list-inside text-[12.5px] text-[#c7c4d7] space-y-1 pl-1">
              <li>Click the top right <strong>Settings</strong> menu in AI Studio.</li>
              <li>Select <strong>Export to GitHub</strong> or <strong>Export to ZIP</strong>.</li>
              <li>Select or link your GitHub account to create the repository automatically.</li>
            </ol>
          </div>

          {/* Option 3: Terminal CLI Commands */}
          <div className="p-4 rounded-xl bg-[#1a202c] border border-white/[0.08] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-[14px] text-[#dde2f3] flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#c0c1ff]" /> 3. Run via Terminal / Git CLI
              </span>
              <button
                onClick={copyCli}
                className="flex items-center gap-1 text-[11px] font-telemetry text-[#4cd7f6] hover:text-[#acedff]"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCli ? 'Copied!' : 'Copy commands'}</span>
              </button>
            </div>
            <pre className="bg-[#080e1a] p-3 rounded-lg text-[#c7c4d7] font-mono text-[11px] overflow-x-auto border border-white/[0.04]">
              {cliCode}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
};
