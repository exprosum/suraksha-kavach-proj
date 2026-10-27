import React, { useState, useRef } from 'react';
import { CRITICAL_REGIONS } from '../data/regionsData';
import { DashboardNav } from '../components/dashboard/DashboardNav';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { GisMapViewer } from '../components/GisMapViewer';
import { TimelineSimulator } from '../components/TimelineSimulator';
import { RelocationPlanner } from '../components/RelocationPlanner';
import { GeminiAdvisorPanel } from '../components/GeminiAdvisorPanel';
import { AiSourceInspector } from '../components/AiSourceInspector';
import { OfficialEvacuationOrderModal } from '../components/OfficialEvacuationOrderModal';
import { DataTrustProvenanceModal } from '../components/DataTrustProvenanceModal';
import { ShieldAlert, X, ChevronUp, ChevronDown } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('bhotekoshi-nepal');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(3);
  const [sirenActive, setSirenActive] = useState<boolean>(false);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState<boolean>(false);
  const [isTrustModalOpen, setIsTrustModalOpen] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('map');
  const [rightPanelTab, setRightPanelTab] = useState<'overview' | 'ai'>('overview');
  const [timelineCollapsed, setTimelineCollapsed] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const activeRegion = CRITICAL_REGIONS.find((r) => r.id === selectedRegionId) || CRITICAL_REGIONS[0];
  const currentStep = activeRegion.timeline[currentStepIndex] || activeRegion.timeline[0];

  const handleToggleSiren = () => {
    if (sirenActive) {
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); oscillatorRef.current.disconnect(); } catch {}
        oscillatorRef.current = null;
      }
      setSirenActive(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(650, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscillatorRef.current = osc;
        setSirenActive(true);
      } catch {
        setSirenActive(true);
      }
    }
  };

  const handleRegionChange = (newId: string) => {
    setSelectedRegionId(newId);
    const newRegion = CRITICAL_REGIONS.find((r) => r.id === newId) || CRITICAL_REGIONS[0];
    const relocIdx = newRegion.timeline.findIndex((s) => s.label.includes('PREDICTIVE RELOCATION'));
    setCurrentStepIndex(relocIdx !== -1 ? relocIdx : 2);
  };

  const isRedAlert = currentStep.alertLevel === 'RED_EVACUATION';

  const renderMainContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <GisMapViewer
            region={activeRegion}
            currentStepIndex={currentStepIndex}
            alertLevel={currentStep.alertLevel}
            onOpenDataAudit={() => setIsTrustModalOpen(true)}
          />
        );
      case 'relocation':
        return (
          <div className="h-full overflow-y-auto p-4">
            <RelocationPlanner region={activeRegion} alertLevel={currentStep.alertLevel} />
          </div>
        );
      case 'ai':
        return (
          <div className="h-full overflow-y-auto p-4">
            <GeminiAdvisorPanel region={activeRegion} currentStep={currentStep} />
          </div>
        );
      case 'sources':
        return (
          <div className="h-full overflow-y-auto p-4 flex items-center justify-center">
            <button
              onClick={() => setIsSourcesModalOpen(true)}
              className="sk-btn-primary"
              aria-label="Open Data Sources Inspector"
            >
              Open Data Sources Inspector
            </button>
          </div>
        );
      case 'trust':
        return (
          <div className="h-full overflow-y-auto p-4 flex items-center justify-center">
            <button
              onClick={() => setIsTrustModalOpen(true)}
              className="sk-btn-primary"
              aria-label="Open Trust Audit"
            >
              Open Data Trust Audit
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="dashboard-layout"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* ── Sidebar ─────────────────────────────────────── */}
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── Top Header ──────────────────────────────────── */}
      <DashboardHeader
        activeRegion={activeRegion}
        alertLevel={currentStep.alertLevel}
        sirenActive={sirenActive}
        onToggleSiren={handleToggleSiren}
        onOpenSources={() => setIsSourcesModalOpen(true)}
        onOpenDataAudit={() => setIsTrustModalOpen(true)}
        onOpenEvacuationOrder={() => setIsOrderModalOpen(true)}
        regions={CRITICAL_REGIONS}
        selectedRegionId={selectedRegionId}
        onSelectRegion={handleRegionChange}
      />

      {/* ── Emergency Alert Banner ───────────────────────── */}
      {sirenActive && (
        <div
          className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-bold text-white animate-pulse"
          style={{
            gridColumn: '2 / -1',
            background: 'linear-gradient(90deg, #E5484D, #b82d31)',
          }}
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>
              EMERGENCY ALERT ACTIVE — {activeRegion.name.toUpperCase()} —
              RELOCATION PROTOCOL DISPATCHED
            </span>
          </div>
          <button
            onClick={handleToggleSiren}
            className="p-1 rounded hover:bg-white/20 transition-colors flex-shrink-0"
            aria-label="Dismiss emergency alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Main Area: Two columns (Map + Right Panel) ─── */}
      <div
        className="flex min-h-0 overflow-hidden"
        style={{ gridColumn: '2 / -1' }}
      >
        {/* Map / Main Content */}
        <div className="flex-1 min-w-0 relative overflow-hidden">
          {renderMainContent()}
        </div>

        {/* Right Detail Panel */}
        <aside
          className="w-80 xl:w-96 flex-shrink-0 flex flex-col border-l border-[#7A9A6B]/20 overflow-hidden hidden lg:flex"
          style={{ background: '#0E2820' }}
          aria-label="Region details and AI advisor"
        >
          {/* Right panel tab bar */}
          <div className="flex border-b border-[#7A9A6B]/20">
            {(['overview', 'ai'] as const).map((tab) => (
              <button
                key={tab}
                id={`right-panel-tab-${tab}`}
                onClick={() => setRightPanelTab(tab)}
                className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer ${
                  rightPanelTab === tab
                    ? 'text-[#E8D5B0] border-b-2 border-[#7A9A6B]'
                    : 'text-[#A9B8AE] hover:text-[#E8D5B0]'
                }`}
                aria-pressed={rightPanelTab === tab}
              >
                {tab === 'overview' ? 'Region Overview' : 'AI Advisor'}
              </button>
            ))}
          </div>

          {/* Right panel content */}
          <div className="flex-1 overflow-y-auto p-4">
            {rightPanelTab === 'overview' ? (
              <div className="space-y-4">
                {/* Region card */}
                <div className="sk-card !p-4 space-y-3">
                  <div>
                    <div className="sk-label mb-1">{activeRegion.country} · {activeRegion.subRegion}</div>
                    <h2 className="font-bold text-[#E8D5B0] text-base leading-tight">{activeRegion.name}</h2>
                    <p className="text-xs text-[#A9B8AE] mt-1">{activeRegion.riverBasin}</p>
                  </div>

                  {/* Hazard types */}
                  <div className="flex flex-wrap gap-1.5">
                    {activeRegion.primaryHazards.map((hz) => (
                      <span
                        key={hz}
                        className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#E5484D]/12 text-[#E5484D] border border-[#E5484D]/30"
                      >
                        {hz.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-[#A9B8AE] leading-relaxed">
                    {activeRegion.overviewDescription.slice(0, 200)}…
                  </p>
                </div>

                {/* Key stats */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: 'Population at Risk',
                      value: activeRegion.habitations.reduce((a, h) => a + h.totalPopulation, 0).toLocaleString(),
                      color: '#E5484D',
                    },
                    {
                      label: 'Lead Time Gained',
                      value: activeRegion.id === 'bhotekoshi-nepal' ? '4.5h' : activeRegion.id === 'chamoli-rishiganga' ? '52m' : '18h',
                      color: '#7A9A6B',
                    },
                    {
                      label: 'Shelters Available',
                      value: activeRegion.relocationShelters.length.toString(),
                      color: '#4CAF50',
                    },
                    {
                      label: 'Sensor Stations',
                      value: activeRegion.sensorStations.length.toString(),
                      color: '#3B9EED',
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="sk-card !p-3 text-center !rounded-xl"
                      style={{ borderColor: `${stat.color}25` }}
                    >
                      <div className="font-bold text-xl" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-[10px] text-[#A9B8AE] mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Historical event */}
                <div className="sk-card !p-4 border-l-4 border-[#F5A623] !rounded-l-none">
                  <div className="sk-label mb-1">Historical Event</div>
                  <div className="text-sm font-semibold text-[#E8D5B0] mb-1">{activeRegion.historicalEvent.name}</div>
                  <div className="text-xs text-[#A9B8AE] mb-2">{activeRegion.historicalEvent.date}</div>
                  <p className="text-xs text-[#A9B8AE] leading-relaxed">{activeRegion.historicalEvent.actualImpact}</p>
                  <div className="mt-3 p-2.5 rounded-xl bg-[#7A9A6B]/10 border border-[#7A9A6B]/25">
                    <div className="text-xs font-semibold text-[#7A9A6B] mb-0.5">With Suraksha Kavach</div>
                    <p className="text-xs text-[#A9B8AE] leading-snug">{activeRegion.historicalEvent.preventedCasualtiesWithAI}</p>
                  </div>
                </div>

                {/* Current step summary */}
                <div className="sk-card !p-4">
                  <div className="sk-label mb-1">Current Timeline Step</div>
                  <div className="text-sm font-bold text-[#E8D5B0] mb-1">{currentStep.label}</div>
                  <p className="text-xs text-[#A9B8AE] leading-relaxed">{currentStep.summary}</p>
                  {currentStep.predictiveInsight && (
                    <div className="mt-3 p-2.5 rounded-xl bg-[#3B9EED]/10 border border-[#3B9EED]/25">
                      <div className="text-xs font-semibold text-[#3B9EED] mb-0.5">Predictive Insight</div>
                      <p className="text-xs text-[#A9B8AE] leading-snug">{currentStep.predictiveInsight}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // AI Panel inline
              <GeminiAdvisorPanel region={activeRegion} currentStep={currentStep} />
            )}
          </div>
        </aside>
      </div>

      {/* ── Bottom Timeline ────────────────────────────── */}
      <div
        className="border-t border-[#7A9A6B]/20 transition-all duration-300"
        style={{
          gridColumn: '2 / -1',
          background: '#0E2820',
          maxHeight: timelineCollapsed ? '40px' : '220px',
          overflow: 'hidden',
        }}
      >
        {/* Timeline toggle */}
        <div className="flex items-center justify-between px-4 py-1.5 border-b border-[#7A9A6B]/15">
          <span className="text-xs font-semibold text-[#7A9A6B] uppercase tracking-wide">
            Disaster Timeline — {activeRegion.name}
          </span>
          <button
            onClick={() => setTimelineCollapsed(!timelineCollapsed)}
            className="p-1 rounded text-[#A9B8AE] hover:text-[#E8D5B0] transition-colors"
            aria-label={timelineCollapsed ? 'Expand timeline' : 'Collapse timeline'}
          >
            {timelineCollapsed
              ? <ChevronUp className="w-4 h-4" />
              : <ChevronDown className="w-4 h-4" />
            }
          </button>
        </div>

        {!timelineCollapsed && (
          <div className="overflow-y-auto" style={{ maxHeight: '180px' }}>
            <TimelineSimulator
              region={activeRegion}
              currentStepIndex={currentStepIndex}
              onStepChange={setCurrentStepIndex}
            />
          </div>
        )}
      </div>

      {/* ── Modals ──────────────────────────────────────── */}
      <AiSourceInspector
        region={activeRegion}
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
      />

      <OfficialEvacuationOrderModal
        region={activeRegion}
        currentStep={currentStep}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      <DataTrustProvenanceModal
        isOpen={isTrustModalOpen}
        onClose={() => setIsTrustModalOpen(false)}
        activeRegion={activeRegion}
      />
    </div>
  );
};
