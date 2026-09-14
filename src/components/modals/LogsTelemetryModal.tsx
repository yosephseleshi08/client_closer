import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Terminal, 
  RefreshCw, 
  Trash2, 
  Copy, 
  Download, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  X, 
  Activity, 
  Server, 
  Shield, 
  Sparkles, 
  Cpu, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'error';
  category: 'AUTH' | 'AI_GEMINI' | 'OUTREACH' | 'BATCH' | 'SERVER' | 'DEPLOY';
  message: string;
  details?: Record<string, any>;
}

interface LogsTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogsTelemetryModal: React.FC<LogsTelemetryModalProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeLevel, setActiveLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'stream' | 'diagnostics' | 'render-guide'>('stream');
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedEntryId, setCopiedEntryId] = useState<string | null>(null);
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);
  const [serverStats, setServerStats] = useState<{
    uptimeSec: number;
    memoryUsageMb: number;
    hasGeminiKey: boolean;
    nodeVersion: string;
    isRender: boolean;
  }>({
    uptimeSec: 0,
    memoryUsageMb: 0,
    hasGeminiKey: false,
    nodeVersion: 'v20+',
    isRender: false
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchLogs = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await fetch('/api/logs?limit=150');
      if (res.ok) {
        const data = await res.json();
        if (data && data.logs) {
          setLogs(data.logs);
          setServerStats({
            uptimeSec: data.uptimeSec || 0,
            memoryUsageMb: data.memoryUsageMb || 0,
            hasGeminiKey: data.hasGeminiKey || false,
            nodeVersion: data.nodeVersion || process.version || 'v20+',
            isRender: data.isRender || false
          });
        }
      }
    } catch {
      // Ignore network abort
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen]);

  // Auto-refresh interval
  useEffect(() => {
    if (!isOpen || !isAutoRefresh) return;
    const interval = setInterval(() => {
      fetchLogs(true);
    }, 3500);
    return () => clearInterval(interval);
  }, [isOpen, isAutoRefresh]);

  const handleClearLogs = async () => {
    try {
      await fetch('/api/logs/clear', { method: 'POST' });
      setLogs([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunDiagnostic = async () => {
    setIsRunningDiagnostic(true);
    try {
      await fetch('/api/logs/diagnostics', { method: 'POST' });
      await fetchLogs(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunningDiagnostic(false);
    }
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchCategory = activeCategory === 'ALL' || log.category === activeCategory;
      const matchLevel = activeLevel === 'ALL' || log.level === activeLevel;
      const matchSearch =
        !searchQuery ||
        log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.details && JSON.stringify(log.details).toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchLevel && matchSearch;
    });
  }, [logs, activeCategory, activeLevel, searchQuery]);

  const handleCopyLogs = () => {
    const formatted = filteredLogs
      .map(
        (l) =>
          `[${l.timestamp}] [${l.level.toUpperCase()}] [${l.category}] ${l.message}${
            l.details ? ` | ${JSON.stringify(l.details)}` : ''
          }`
      )
      .join('\n');

    navigator.clipboard.writeText(formatted);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingle = (entry: LogEntry) => {
    const text = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${entry.category}] ${entry.message}${
      entry.details ? `\nMetadata: ${JSON.stringify(entry.details, null, 2)}` : ''
    }`;
    navigator.clipboard.writeText(text);
    setCopiedEntryId(entry.id);
    setTimeout(() => setCopiedEntryId(null), 2000);
  };

  const handleDownloadLogs = () => {
    const formatted = filteredLogs
      .map(
        (l) =>
          `[${l.timestamp}] [${l.level.toUpperCase()}] [${l.category}] ${l.message}${
            l.details ? ` | ${JSON.stringify(l.details)}` : ''
          }`
      )
      .join('\n');

    const blob = new Blob([formatted], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `outreach_logs_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '_')}.log`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="logs-telemetry-console-modal"
        className="relative w-full max-w-5xl bg-[#0f1422] border border-[#2b354d] rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh] overflow-hidden"
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#212a3d] bg-[#141b2b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#20293d] border border-[#344261] flex items-center justify-center text-[#c0c1ff]">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-[#dde2f3] tracking-wide">
                  Live Operational Logs & Telemetry
                </h2>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#182d23] border border-[#2e5d44] text-[10px] font-semibold text-[#66ffb2]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#66ffb2] animate-ping"></span>
                  LIVE BUFFER
                </div>
              </div>
              <p className="text-[11px] text-[#8e98b0]">
                Real-time server events, AI token generation, auth attempts, and deployment diagnostics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoRefresh((prev) => !prev)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1.5 transition-colors ${
                isAutoRefresh
                  ? 'bg-[#1b253b] text-[#c0c1ff] border-[#384869]'
                  : 'bg-[#121824] text-[#6b7794] border-[#222c3f]'
              }`}
            >
              <RefreshCw className={`w-3 h-3 ${isAutoRefresh ? 'animate-spin' : ''}`} />
              Auto-poll: {isAutoRefresh ? 'ON (3.5s)' : 'PAUSED'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8e98b0] hover:text-[#dde2f3] hover:bg-[#1f2738] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Telemetry Quick Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-5 py-2.5 bg-[#0b0f19] border-b border-[#1c2436] text-[11px]">
          <div className="flex items-center gap-2 text-[#8e98b0]">
            <Server className="w-3.5 h-3.5 text-[#8083ff]" />
            <span>Node: <strong className="text-[#dde2f3] font-mono">{serverStats.nodeVersion}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[#8e98b0]">
            <Cpu className="w-3.5 h-3.5 text-[#4cd7f6]" />
            <span>Heap: <strong className="text-[#dde2f3] font-mono">{serverStats.memoryUsageMb} MB</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[#8e98b0]">
            <Activity className="w-3.5 h-3.5 text-[#66ffb2]" />
            <span>Uptime: <strong className="text-[#dde2f3] font-mono">{Math.floor(serverStats.uptimeSec / 60)}m {serverStats.uptimeSec % 60}s</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[#8e98b0]">
            <Sparkles className="w-3.5 h-3.5 text-[#ffbe3d]" />
            <span>Gemini API: <strong className={serverStats.hasGeminiKey ? "text-[#66ffb2]" : "text-[#ffb4ab]"}>{serverStats.hasGeminiKey ? "Configured" : "Simulated/Missing"}</strong></span>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-[#212a3d] bg-[#111726]">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('stream')}
              className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'stream'
                  ? 'border-[#8083ff] text-[#c0c1ff]'
                  : 'border-transparent text-[#8e98b0] hover:text-[#dde2f3]'
              }`}
            >
              Live Console Stream ({filteredLogs.length})
            </button>
            <button
              onClick={() => setActiveTab('render-guide')}
              className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'render-guide'
                  ? 'border-[#4cd7f6] text-[#4cd7f6]'
                  : 'border-transparent text-[#8e98b0] hover:text-[#dde2f3]'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Render & Deploy Fix Guide
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={handleRunDiagnostic}
              disabled={isRunningDiagnostic}
              className="px-2.5 py-1 rounded-lg bg-[#20293d] hover:bg-[#2c3854] text-[#dde2f3] text-[11px] font-semibold flex items-center gap-1.5 border border-[#374669] transition-all active:scale-95 disabled:opacity-50"
            >
              <Activity className={`w-3 h-3 text-[#4cd7f6] ${isRunningDiagnostic ? 'animate-spin' : ''}`} />
              {isRunningDiagnostic ? 'Running Probe...' : 'Run Diagnostics'}
            </button>
            <button
              onClick={handleCopyLogs}
              className="px-2.5 py-1 rounded-lg bg-[#192233] hover:bg-[#232f47] text-[#c0c1ff] text-[11px] font-semibold flex items-center gap-1.5 border border-[#2d3a54] transition-all"
            >
              {copiedAll ? <Check className="w-3 h-3 text-[#66ffb2]" /> : <Copy className="w-3 h-3" />}
              {copiedAll ? 'Copied!' : 'Copy Stream'}
            </button>
            <button
              onClick={handleDownloadLogs}
              className="p-1 rounded-lg bg-[#192233] hover:bg-[#232f47] text-[#8e98b0] hover:text-[#dde2f3] border border-[#2d3a54]"
              title="Download raw .log file"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleClearLogs}
              className="p-1 rounded-lg bg-[#192233] hover:bg-[#3d1e24] text-[#8e98b0] hover:text-[#ffb4ab] border border-[#2d3a54]"
              title="Clear log buffer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Live Stream */}
        {activeTab === 'stream' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Filter controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2.5 bg-[#0e1320] border-b border-[#1b2336]">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7794]" />
                <input
                  type="text"
                  placeholder="Filter logs by message, payload, or route..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#141b2b] border border-[#263147] text-xs text-[#dde2f3] placeholder-[#5f6b85] focus:outline-none focus:border-[#8083ff]"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
                <Filter className="w-3 h-3 text-[#6b7794]" />
                {(['ALL', 'SERVER', 'AUTH', 'AI_GEMINI', 'OUTREACH', 'BATCH', 'DEPLOY'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                      activeCategory === cat
                        ? 'bg-[#8083ff] text-[#0d0096] font-bold'
                        : 'bg-[#151c2d] text-[#8e98b0] hover:text-[#dde2f3]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Severity Level Filter */}
              <div className="flex items-center gap-1 text-[11px]">
                {(['ALL', 'error', 'warn', 'success', 'info'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveLevel(lvl)}
                    className={`px-2 py-0.5 rounded-md uppercase font-semibold text-[10px] transition-colors ${
                      activeLevel === lvl
                        ? lvl === 'error'
                          ? 'bg-[#93000a] text-white'
                          : lvl === 'warn'
                          ? 'bg-[#ffbe3d] text-black font-bold'
                          : lvl === 'success'
                          ? 'bg-[#1b4332] text-[#66ffb2]'
                          : 'bg-[#2b354d] text-[#dde2f3]'
                        : 'bg-[#131826] text-[#717e99] hover:text-[#dde2f3]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Console Output */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 bg-[#090d16] overflow-y-auto font-mono text-xs text-[#c6d0ea] space-y-1.5 min-h-[360px]"
            >
              {filteredLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-16 text-center text-[#687594]">
                  <Terminal className="w-8 h-8 mb-2 opacity-40" />
                  <p className="text-sm font-semibold">No logs match the selected filters</p>
                  <p className="text-xs mt-1 text-[#4e5973]">Trigger actions in the CRM or click "Run Diagnostics" above.</p>
                </div>
              ) : (
                filteredLogs.map((entry) => {
                  const isError = entry.level === 'error';
                  const isWarn = entry.level === 'warn';
                  const isSuccess = entry.level === 'success';

                  return (
                    <div
                      key={entry.id}
                      className={`group p-2 rounded-lg border transition-all ${
                        isError
                          ? 'bg-[#220d11]/70 border-[#5c1d24] text-[#ffb4ab]'
                          : isWarn
                          ? 'bg-[#261d0f]/60 border-[#543b17] text-[#ffdc8b]'
                          : isSuccess
                          ? 'bg-[#0f1f18]/60 border-[#1c432d] text-[#a1f1c7]'
                          : 'bg-[#0f1422]/70 border-[#1e2738] text-[#c4cee6]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2 min-w-0 flex-1">
                          <span className="text-[10px] text-[#5b6782] select-none shrink-0 pt-0.5">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>

                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 ${
                              isError
                                ? 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
                                : isWarn
                                ? 'bg-[#ffbe3d]/20 text-[#ffbe3d]'
                                : isSuccess
                                ? 'bg-[#66ffb2]/20 text-[#66ffb2]'
                                : 'bg-[#8083ff]/20 text-[#c0c1ff]'
                            }`}
                          >
                            {entry.category}
                          </span>

                          <span className="break-words leading-relaxed">{entry.message}</span>
                        </div>

                        <button
                          onClick={() => handleCopySingle(entry)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[#ffffff]/10 text-[#8e98b0] hover:text-[#dde2f3] transition-all shrink-0"
                          title="Copy entry"
                        >
                          {copiedEntryId === entry.id ? (
                            <Check className="w-3 h-3 text-[#66ffb2]" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>

                      {entry.details && Object.keys(entry.details).length > 0 && (
                        <div className="mt-2 pl-4 border-l-2 border-[#2b354d] text-[11px] text-[#8a96b3] overflow-x-auto py-1">
                          <pre className="font-mono">{JSON.stringify(entry.details, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Render & Deployment Guide */}
        {activeTab === 'render-guide' && (
          <div className="p-6 bg-[#0b0f19] overflow-y-auto space-y-6 text-sm text-[#dde2f3] flex-1">
            <div className="p-4 rounded-xl bg-[#141c2c] border border-[#2b3854]">
              <h3 className="font-bold text-[#c0c1ff] flex items-center gap-2 mb-2 text-base">
                <AlertTriangle className="w-4 h-4 text-[#ffbe3d]" />
                Why did Render fail with "Cannot find module 'dist/server.cjs'"?
              </h3>
              <p className="text-xs text-[#9eb0d3] leading-relaxed mb-3">
                When you deploy to Render with Bun or Node, Render clones your repository. Since <code className="bg-[#1f293d] px-1 py-0.5 rounded text-[#dde2f3]">dist/</code> is in <code className="bg-[#1f293d] px-1 py-0.5 rounded text-[#dde2f3]">.gitignore</code>, production assets must be compiled during Render's build step. If Render's <strong>Build Command</strong> is set to only <code className="bg-[#1f293d] px-1 py-0.5 rounded text-[#dde2f3]">bun install</code> or <code className="bg-[#1f293d] px-1 py-0.5 rounded text-[#dde2f3]">npm install</code> without building, <code className="bg-[#1f293d] px-1 py-0.5 rounded text-[#dde2f3]">dist/server.cjs</code> does not exist when the start command executes.
              </p>
              <div className="p-3 rounded-lg bg-[#0e1422] border border-[#243048] text-xs space-y-2">
                <p className="font-semibold text-[#66ffb2]">✅ What We Fixed in the Codebase:</p>
                <ul className="list-disc list-inside space-y-1 text-[#8e9cb8]">
                  <li><strong>Self-Healing Startup:</strong> Added an automatic fallback in <code className="text-[#c0c1ff]">package.json</code>: if <code className="text-[#c0c1ff]">dist/server.cjs</code> is missing when <code className="text-[#c0c1ff]">start</code> runs, it automatically compiles the build on the fly before launching Node.</li>
                  <li><strong>Universal Build Script:</strong> Created <code className="text-[#c0c1ff]">render-build.sh</code> which supports both Bun and Node environments automatically.</li>
                  <li><strong>Render YAML Blueprint:</strong> Updated <code className="text-[#c0c1ff]">render.yaml</code> to guarantee the build command runs.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8e98b0]">
                Recommended Render Web Service Settings
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[#121827] border border-[#243048]">
                  <span className="text-[#8e98b0] block text-[11px] mb-1">Build Command</span>
                  <code className="block bg-[#0a0e17] p-2 rounded text-[#c0c1ff] font-mono select-all">
                    npm install && npm run build
                  </code>
                  <span className="text-[10px] text-[#606d8a] mt-1 block">Or use: <code>chmod +x ./render-build.sh && ./render-build.sh</code></span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#121827] border border-[#243048]">
                  <span className="text-[#8e98b0] block text-[11px] mb-1">Start Command</span>
                  <code className="block bg-[#0a0e17] p-2 rounded text-[#66ffb2] font-mono select-all">
                    npm start
                  </code>
                  <span className="text-[10px] text-[#606d8a] mt-1 block">Runs self-healing check and launches compiled server</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8e98b0]">
                Required Environment Variables on Render
              </h4>
              <div className="p-3.5 rounded-lg bg-[#121827] border border-[#243048] text-xs font-mono space-y-1.5 text-[#c0c1ff]">
                <div>NODE_ENV = <span className="text-[#66ffb2]">production</span></div>
                <div>ADMIN_PASSWORD = <span className="text-[#ffbe3d]">your_secret_password</span> (Protects your CRM data)</div>
                <div>GEMINI_API_KEY = <span className="text-[#4cd7f6]">AIzaSy...</span> (For Gemini 3.8 Flash AI generation)</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#141b2b] border-t border-[#212a3d] text-[11px] text-[#8e98b0]">
          <span>Tip: Filter by <strong>DEPLOY</strong> or <strong>AUTH</strong> to trace specific subsystem events.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#20293d] hover:bg-[#2e3b57] text-[#dde2f3] font-semibold transition-colors"
          >
            Close Terminal
          </button>
        </div>

      </div>
    </div>
  );
};
