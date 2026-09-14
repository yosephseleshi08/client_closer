import React, { useState, useEffect } from 'react';
import { 
  INITIAL_URGENT_TARGETS, 
  INITIAL_INBOUND_SIGNALS, 
  FUNNEL_STAGES_DATA, 
  INITIAL_QUEUED_COPILOT 
} from './data/initialData';
import { 
  UrgentTarget, 
  InboundSignal, 
  FunnelStage, 
  QueuedCopilotAction, 
  NavTab, 
  Timeframe, 
  HospitalityFilter,
  LeadAcquisitionCandidate 
} from './types';
import { Header } from './components/Header';
import { TacticalBar } from './components/TacticalBar';
import { KPICards } from './components/KPICards';
import { ConversionFunnel } from './components/ConversionFunnel';
import { AICopilotLivePulse } from './components/AICopilotLivePulse';
import { LiveInboundSignals } from './components/LiveInboundSignals';
import { UrgentFollowUpTable } from './components/UrgentFollowUpTable';
import { Footer } from './components/Footer';

// Modals & Views
import { MockupModal } from './components/modals/MockupModal';
import { AIDraftModal } from './components/modals/AIDraftModal';
import { ChatThreadModal } from './components/modals/ChatThreadModal';
import { BatchDispatchModal } from './components/modals/BatchDispatchModal';
import { GitHubModal } from './components/modals/GitHubModal';
import { CommandPalette } from './components/modals/CommandPalette';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer';
import { SettingsModal } from './components/modals/SettingsModal';

import { CopilotView } from './components/views/CopilotView';
import { CRMView } from './components/views/CRMView';
import { LeadAcquisitionView } from './components/views/LeadAcquisitionView';
import { AnalyticsView } from './components/views/AnalyticsView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('executive-dashboard');
  const [timeframe, setTimeframe] = useState<Timeframe>('Real-time');
  const [hospitalityFilter, setHospitalityFilter] = useState<HospitalityFilter>('fine-dining');
  
  // Data State
  const [targets, setTargets] = useState<UrgentTarget[]>(INITIAL_URGENT_TARGETS);
  const [signals, setSignals] = useState<InboundSignal[]>(INITIAL_INBOUND_SIGNALS);
  const [funnelStages, setFunnelStages] = useState<FunnelStage[]>(FUNNEL_STAGES_DATA);
  const [copilotQueue, setCopilotQueue] = useState<QueuedCopilotAction[]>(INITIAL_QUEUED_COPILOT);
  const [aiEngine, setAiEngine] = useState<'ollama' | 'gemini'>('gemini');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isBatchDispatching, setIsBatchDispatching] = useState(false);

  // Active Modals
  const [activeMockupTarget, setActiveMockupTarget] = useState<UrgentTarget | null>(null);
  const [activeDraftTarget, setActiveDraftTarget] = useState<UrgentTarget | null>(null);
  const [activeChatTarget, setActiveChatTarget] = useState<UrgentTarget | InboundSignal | null>(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const urgentCount = targets.filter((t) => t.status === 'pending').length;
  const unreadSignalsCount = signals.filter((s) => s.unread).length;

  // Global ⌘K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handler: Deploy single queued action
  const handleDeployQueuedAction = (action: QueuedCopilotAction) => {
    // Mark any matching urgent target as sent
    setTargets((prev) =>
      prev.map((t) =>
        t.name === action.restaurantName || t.handle === action.handle
          ? { ...t, status: 'sent', overdueSla: 'Dispatched Just Now' }
          : t
      )
    );
  };

  // Handler: Regenerate AI draft
  const handleRegenerateAction = async (action: QueuedCopilotAction) => {
    setIsRegenerating(true);
    try {
      const res = await fetch('/api/generate-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantName: action.restaurantName,
          handle: action.handle,
          platform: 'Instagram',
          cuisine: action.cuisine,
          stage: action.stageName,
          tone: 'casual_gourmet',
          details: 'Focus on direct guest reservation funnel without platform commission cuts'
        })
      });
      const data = await res.json();
      if (data && data.message) {
        setCopilotQueue((prev) =>
          prev.map((item) =>
            item.restaurantName === action.restaurantName
              ? { ...item, generatedDM: data.message }
              : item
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegenerating(false);
    }
  };

  // Handler: Trigger Batch Dispatch
  const handleTriggerBatchDispatch = () => {
    setIsBatchDispatching(true);
    setIsBatchModalOpen(true);
  };

  const handleBatchComplete = () => {
    setIsBatchDispatching(false);
    // Mark first 4 targets as sent
    setTargets((prev) =>
      prev.map((t, idx) => (idx < 4 ? { ...t, status: 'sent', overdueSla: 'Dispatched via Batch' } : t))
    );
  };

  // Handler: Send Direct from Table
  const handleSendDirect = (target: UrgentTarget) => {
    setTargets((prev) =>
      prev.map((t) =>
        t.id === target.id
          ? { ...t, status: 'sent', overdueSla: 'Dispatched Just Now' }
          : t
      )
    );
  };

  // Handler: Simulate Inbound Message
  const handleSimulateInbound = () => {
    const newInbound: InboundSignal = {
      id: `signal-${Date.now()}`,
      restaurantName: 'Cipriani Downtown',
      handle: '@ciprianidowntown',
      platform: 'Instagram',
      timeAgo: 'Just now',
      message: '"Saw the Bellini reservation flow demo. Can we jump on a 15-minute call today?"',
      intent: 'Demo Booked',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmanUEF_5hXF21QZC_cPBBBYVkOW4AWHyMdw3VSIqSZr-ooCLkvRFAZs7F9E-Z70RnoAHiBgDfAfT6Th5MikEbRBKHoq2O2RC7DJXQBDKfO5hNoGVXY72AI9UXc4VpVxHSuOjzwHdvIdasy8xCOXnbWMaqjyb1RWWRQAOCNlRxp-Tuu-5w0rbZgwxQ2VfsZJ-SRnaOUPLUizU2Nipa2uhqs8zqlHECPMIUBibLt0Dr_LAg3r86ilXp',
      unread: true
    };
    setSignals((prev) => [newInbound, ...prev]);
  };

  // Handler: Queue candidate from lead acquisition
  const handleQueueCandidate = (candidate: LeadAcquisitionCandidate) => {
    const newTarget: UrgentTarget = {
      id: `target-${Date.now()}`,
      name: candidate.name,
      location: `${candidate.neighborhood}, ${candidate.city}`,
      subtext: `${candidate.neighborhood} • Check $${candidate.avgCheck}`,
      platform: 'Instagram',
      handle: candidate.instagramHandle,
      overdueSla: 'Due Today',
      slaSeverity: 'high',
      sequenceStage: 'Initial Outreach',
      mockupFile: 'bespoke-table-flow.fig',
      mockupTitle: `${candidate.name} Direct Reservation Engine`,
      avatarChar: candidate.name.charAt(0),
      avatarColor: '#c0c1ff',
      status: 'pending',
      cuisine: 'High-Ticket Hospitality',
      avgCheck: candidate.avgCheck
    };
    setTargets((prev) => [newTarget, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0e131f] text-[#dde2f3] selection:bg-[#8083ff] selection:text-[#0d0096] flex flex-col antialiased">
      
      {/* 1. Header with Telemetry & Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenGitHub={() => setIsGitHubModalOpen(true)}
        aiEngine={aiEngine}
        onToggleAiEngine={() => setAiEngine((prev) => (prev === 'gemini' ? 'ollama' : 'gemini'))}
        unreadCount={unreadSignalsCount}
      />

      {/* Main Content Area (padded for fixed header) */}
      <main className="w-full pt-28 flex-1">
        
        {/* Render selected view */}
        {currentTab === 'executive-dashboard' && (
          <div className="relative w-full overflow-hidden">
            
            {/* Ambient Void Glows */}
            <div className="absolute -top-32 left-1/4 w-[620px] h-[340px] bg-[#8083ff]/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute top-1/3 -right-24 w-[480px] h-[360px] bg-[#4cd7f6]/10 rounded-full blur-[130px] pointer-events-none"></div>
            <div className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-[#571bc1]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-10 py-6 flex flex-col gap-6 sm:gap-8">
              
              {/* Tactical Bar */}
              <TacticalBar
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
                hospitalityFilter={hospitalityFilter}
                onFilterChange={setHospitalityFilter}
                urgentCount={urgentCount}
                onBatchDispatch={handleTriggerBatchDispatch}
                isDispatching={isBatchDispatching}
              />

              {/* Section 1: KPI Telemetry Matrix (5 Cards) */}
              <KPICards
                urgentCount={urgentCount}
                timeframe={timeframe}
                onFilterUrgentOnly={() => {
                  const el = document.getElementById('urgent-command-board');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* Section 2: Split 65% / 35% */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                
                {/* Left (8 cols): Pipeline Conversion Funnel */}
                <div className="lg:col-span-8">
                  <ConversionFunnel
                    stages={funnelStages}
                    onSelectStage={(stage) => {
                      // Optional stage drilldown
                    }}
                  />
                </div>

                {/* Right (4 cols): AI Copilot Live Pulse & Live Inbound Signals */}
                <div className="lg:col-span-4 flex flex-col gap-5">
                  <AICopilotLivePulse
                    queue={copilotQueue}
                    onDeploy={handleDeployQueuedAction}
                    onRegenerate={handleRegenerateAction}
                    onEdit={(action) => {
                      const match = targets.find((t) => t.name === action.restaurantName) || targets[0];
                      setActiveDraftTarget(match);
                    }}
                    aiEngine={aiEngine}
                    isRegenerating={isRegenerating}
                  />

                  <LiveInboundSignals
                    signals={signals}
                    onSelectSignal={(signal) => setActiveChatTarget(signal)}
                    onSimulateInbound={handleSimulateInbound}
                  />
                </div>

              </section>

              {/* Section 3: Urgent Follow-Up Command Board */}
              <div id="urgent-command-board">
                <UrgentFollowUpTable
                  targets={targets}
                  onOpenDraft={(target) => setActiveDraftTarget(target)}
                  onSendDirect={handleSendDirect}
                  onOpenChat={(target) => setActiveChatTarget(target)}
                  onOpenMockup={(target) => setActiveMockupTarget(target)}
                  totalUrgentCount={urgentCount}
                />
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Follow-Up Copilot */}
        {currentTab === 'follow-up-copilot' && (
          <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
            <CopilotView
              queue={copilotQueue}
              targets={targets}
              onDeployAction={handleDeployQueuedAction}
              aiEngine={aiEngine}
            />
          </div>
        )}

        {/* Tab 3: CRM Master Pipeline */}
        {currentTab === 'crm-master-pipeline' && (
          <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
            <CRMView
              targets={targets}
              onOpenMockup={(target) => setActiveMockupTarget(target)}
              onOpenDraft={(target) => setActiveDraftTarget(target)}
            />
          </div>
        )}

        {/* Tab 4: Lead Acquisition */}
        {currentTab === 'lead-acquisition' && (
          <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
            <LeadAcquisitionView onQueueCandidate={handleQueueCandidate} />
          </div>
        )}

        {/* Tab 5: Insights & Analytics */}
        {currentTab === 'insights-analytics' && (
          <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
            <AnalyticsView />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <MockupModal
        target={activeMockupTarget}
        onClose={() => setActiveMockupTarget(null)}
      />

      <AIDraftModal
        target={activeDraftTarget}
        onClose={() => setActiveDraftTarget(null)}
        onDeploy={(target, message) => {
          handleSendDirect(target);
        }}
        aiEngine={aiEngine}
      />

      <ChatThreadModal
        item={activeChatTarget}
        onClose={() => setActiveChatTarget(null)}
        onSendMessage={(text) => {
          // Sent message recorded
        }}
      />

      <BatchDispatchModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        count={urgentCount}
        onComplete={handleBatchComplete}
      />

      <GitHubModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={(tab) => setCurrentTab(tab)}
        targets={targets}
        onSelectTarget={(target) => {
          setActiveDraftTarget(target);
        }}
        onBatchDispatch={handleTriggerBatchDispatch}
        onToggleAi={() => setAiEngine((prev) => (prev === 'gemini' ? 'ollama' : 'gemini'))}
        onOpenGitHub={() => setIsGitHubModalOpen(true)}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        signals={signals}
        onSelectSignal={(sig) => setActiveChatTarget(sig)}
        onMarkAllRead={() => {
          setSignals((prev) => prev.map((s) => ({ ...s, unread: false })));
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        aiEngine={aiEngine}
        onToggleAi={() => setAiEngine((prev) => (prev === 'gemini' ? 'ollama' : 'gemini'))}
      />

    </div>
  );
}
