import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck,
  Database, 
  FileSpreadsheet, 
  Radio, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Layers,
  Award
} from 'lucide-react';

interface HeaderProps {
  onOpenSources: () => void;
  onOpenDataAudit: () => void;
  onOpenEvacuationOrder: () => void;
  sirenActive: boolean;
  onToggleSiren: () => void;
  activeRegionName: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSources,
  onOpenDataAudit,
  onOpenEvacuationOrder,
  sirenActive,
  onToggleSiren,
  activeRegionName,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          
          {/* Brand & System Identification */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 shadow-md shadow-orange-500/20 text-white font-black text-xl">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" title="Telemetry Feed Live" />
            </div>
            
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  SURAKSHA KAVACH
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    सुरक्षा कवच
                  </span>
                </h1>
                <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Disaster Risk &amp; Relocation Platform
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/50 flex items-center gap-1">
                  <Award className="w-3 h-3 text-indigo-400" /> Team Exprosum
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Predict Risk. Plan Relocation. Protect Lives. <span className="text-slate-500">• Dynamic Red Zone &amp; Carrying Capacity Engine</span>
              </p>
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto justify-between lg:justify-end flex-wrap">
            
            {/* Live Sentinel & Telemetry Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300">Telemetry Feed:</span>
              <span className="text-emerald-400 font-mono font-semibold">Sentinel-1/2 + AWS Live</span>
            </div>

            {/* AI Source Inspector Button */}
            <button
              id="header-btn-sources"
              onClick={onOpenSources}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-xs font-medium text-slate-200 transition-colors shadow-sm cursor-pointer"
              title="Inspect Satellite Radar, Optical, DEM, and Hydrological Data Sources"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Data Sources</span>
            </button>

            {/* Data Trust & Provenance Audit Button */}
            <button
              id="header-btn-trust"
              onClick={onOpenDataAudit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 hover:border-emerald-600 text-xs font-medium text-emerald-300 transition-colors shadow-sm cursor-pointer"
              title="Is this Real Data? Data Provenance, Authenticity & Verification Audit"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Data Trust &amp; Provenance</span>
            </button>

            {/* Siren Alert Toggle */}
            <button
              id="header-btn-siren"
              onClick={onToggleSiren}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border shadow-sm ${
                sirenActive 
                  ? 'bg-red-600 text-white border-red-500 animate-pulse' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Toggle Simulated Siren Sound / Visual Alert"
            >
              {sirenActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
              <span>{sirenActive ? 'Siren Active' : 'Siren Audio'}</span>
            </button>

            {/* Official Evacuation Order Dispatch */}
            <button
              id="header-btn-dispatch"
              onClick={onOpenEvacuationOrder}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold shadow-md shadow-orange-700/20 transition-all border border-orange-500/40 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Evacuation Order</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
