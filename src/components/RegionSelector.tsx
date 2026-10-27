import React from 'react';
import { CriticalRegion } from '../types';
import { MapPin, AlertTriangle, Clock, Users, ShieldCheck } from 'lucide-react';

interface RegionSelectorProps {
  regions: CriticalRegion[];
  selectedRegionId: string;
  onSelectRegion: (id: string) => void;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  regions,
  selectedRegionId,
  onSelectRegion,
}) => {
  return (
    <div className="w-full bg-slate-900/90 backdrop-blur border-b border-slate-800 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-400" />
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Critical Red Zone Demonstrations
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Real Historical Flood &amp; Landslide Datasets • Predictive Early Relocation Proof
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {regions.map((region) => {
            const isSelected = region.id === selectedRegionId;
            const totalPop = region.habitations.reduce((acc, h) => acc + h.totalPopulation, 0);

            return (
              <button
                key={region.id}
                id={`region-card-${region.id}`}
                onClick={() => onSelectRegion(region.id)}
                className={`text-left p-3.5 rounded-xl transition-all border relative flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-orange-500 shadow-md shadow-orange-500/10 ring-1 ring-orange-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-slate-300'
                }`}
              >
                {/* Active Indicator Pip */}
                {isSelected && (
                  <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-950/80 text-orange-400 border border-slate-700">
                      {region.country}
                    </span>
                    <span className="text-xs text-slate-400 font-medium truncate">
                      {region.subRegion}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-1.5">
                    {region.name}
                  </h3>

                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {region.primaryHazards.map((hz) => (
                      <span
                        key={hz}
                        className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800/40"
                      >
                        {hz.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 gap-2">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{totalPop.toLocaleString()} at risk</span>
                  </div>

                  <div className="flex items-center gap-1 text-emerald-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[11px] truncate max-w-[130px]" title={region.historicalEvent.earlyWarningLeadTimeGained}>
                      {region.id === 'bhotekoshi-nepal' ? '+4.5h Lead Time' : region.id === 'chamoli-rishiganga' ? '+52m Lead Time' : '+18h Lead Time'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
