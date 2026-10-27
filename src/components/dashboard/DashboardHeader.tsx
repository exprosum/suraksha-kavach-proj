import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Database,
  FileSpreadsheet,
  Volume2,
  VolumeX,
  MapPin,
} from 'lucide-react';
import { RiskBadge } from '../shared/RiskBadge';
import type { CriticalRegion, AlertLevel } from '../../types';

interface DashboardHeaderProps {
  activeRegion: CriticalRegion;
  alertLevel: AlertLevel;
  sirenActive: boolean;
  onToggleSiren: () => void;
  onOpenSources: () => void;
  onOpenDataAudit: () => void;
  onOpenEvacuationOrder: () => void;
  regions: CriticalRegion[];
  selectedRegionId: string;
  onSelectRegion: (id: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeRegion,
  alertLevel,
  sirenActive,
  onToggleSiren,
  onOpenSources,
  onOpenDataAudit,
  onOpenEvacuationOrder,
  regions,
  selectedRegionId,
  onSelectRegion,
}) => {
  const isRedAlert = alertLevel === 'RED_EVACUATION';

  return (
    <header
      className="border-b border-[#7A9A6B]/20 flex items-center gap-3 px-4 py-2.5 flex-wrap"
      style={{ background: '#0E2820', gridColumn: '2 / -1' }}
      role="banner"
    >
      {/* Region selector */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <MapPin className="w-4 h-4 text-[#7A9A6B] flex-shrink-0" aria-hidden="true" />
        <label htmlFor="region-select" className="sr-only">Select Region</label>
        <select
          id="region-select"
          value={selectedRegionId}
          onChange={(e) => onSelectRegion(e.target.value)}
          className="bg-[#14342A] border border-[#7A9A6B]/30 rounded-lg px-3 py-1.5 text-sm font-medium text-[#E8D5B0] focus:outline-none focus:ring-2 focus:ring-[#7A9A6B]/50 cursor-pointer"
          aria-label="Select disaster region"
        >
          {regions.map((r) => (
            <option key={r.id} value={r.id}>{r.name} ({r.country})</option>
          ))}
        </select>

        <RiskBadge level={alertLevel} />

        {/* Live feed status */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#14342A] border border-[#7A9A6B]/20 text-xs text-[#A9B8AE]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4CAF50] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4CAF50]" />
          </span>
          Telemetry Live
        </div>

        <span className="demo-badge hidden sm:inline-flex">Demo Data</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">

        {/* Emergency banner toggle */}
        {isRedAlert && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E5484D]/15 border border-[#E5484D]/40 text-xs font-bold text-[#E5484D] animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
            EVACUATE NOW
          </div>
        )}

        {/* Data Sources */}
        <button
          id="dash-btn-sources"
          onClick={onOpenSources}
          className="sk-btn-ghost !py-1.5 !px-3 !text-xs !rounded-lg"
          title="View AI data sources"
          aria-label="View AI data sources"
        >
          <Database className="w-3.5 h-3.5 text-[#3B9EED]" aria-hidden="true" />
          <span className="hidden sm:inline">Data Sources</span>
        </button>

        {/* Trust Audit */}
        <button
          id="dash-btn-trust"
          onClick={onOpenDataAudit}
          className="sk-btn-ghost !py-1.5 !px-3 !text-xs !rounded-lg"
          title="Open Data Trust & Provenance Audit"
          aria-label="Data Trust Audit"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#7A9A6B]" aria-hidden="true" />
          <span className="hidden sm:inline">Trust Audit</span>
        </button>

        {/* Siren */}
        <button
          id="dash-btn-siren"
          onClick={onToggleSiren}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border cursor-pointer ${
            sirenActive
              ? 'bg-[#E5484D]/15 border-[#E5484D]/50 text-[#E5484D] animate-pulse'
              : 'bg-[#14342A] border-[#7A9A6B]/25 text-[#A9B8AE] hover:text-[#E8D5B0]'
          }`}
          aria-label={sirenActive ? 'Deactivate alert siren' : 'Activate alert siren'}
          aria-pressed={sirenActive}
        >
          {sirenActive
            ? <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
            : <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
          }
          <span className="hidden sm:inline">{sirenActive ? 'Siren On' : 'Siren'}</span>
        </button>

        {/* Generate Evacuation Order — primary action */}
        <button
          id="dash-btn-evacuation"
          onClick={onOpenEvacuationOrder}
          className="sk-btn-danger !py-1.5 !px-4 !text-xs !rounded-lg"
          aria-label="Generate Official Evacuation Order"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Evacuation Order</span>
        </button>
      </div>
    </header>
  );
};
