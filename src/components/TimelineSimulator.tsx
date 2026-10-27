import React, { useState, useEffect } from 'react';
import { CriticalRegion, TimelineStep } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  CloudRain, 
  Activity, 
  Waves, 
  Compass,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface TimelineSimulatorProps {
  region: CriticalRegion;
  currentStepIndex: number;
  onStepChange: (index: number) => void;
}

export const TimelineSimulator: React.FC<TimelineSimulatorProps> = ({
  region,
  currentStepIndex,
  onStepChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const steps = region.timeline;
  const currentStep = steps[currentStepIndex] || steps[0];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        onStepChange((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, onStepChange]);

  const alertBadgeStyles = {
    NORMAL: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    WATCH: 'bg-amber-950 text-amber-300 border-amber-700',
    ORANGE_WARNING: 'bg-orange-950 text-orange-300 border-orange-600',
    RED_EVACUATION: 'bg-red-950 text-red-300 border-red-500 animate-pulse',
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden p-4 sm:p-6 space-y-5">
      
      {/* Simulation Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Predictive Disaster Timeline &amp; Relocation Replay
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real sensor telemetry replay: Demonstrating the exact predictive lead-time window gained before flood impact.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            onClick={() => onStepChange(Math.max(0, currentStepIndex - 1))}
            disabled={currentStepIndex === 0}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Previous Timeline Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            id="timeline-play-toggle"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all border cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-500'
                : 'bg-orange-600 hover:bg-orange-500 text-white border-orange-500'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Replay' : 'Auto Play Simulation'}</span>
          </button>

          <button
            onClick={() => onStepChange(Math.min(steps.length - 1, currentStepIndex + 1))}
            disabled={currentStepIndex === steps.length - 1}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Next Timeline Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              onStepChange(0);
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Reset to T - 48 Hours"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timeline Steps Tracker (Stepper) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPast = idx < currentStepIndex;
          const isEvacWindow = step.label.includes('PREDICTIVE RELOCATION');

          return (
            <button
              key={step.stepId}
              onClick={() => {
                setIsPlaying(false);
                onStepChange(idx);
              }}
              className={`p-2.5 rounded-xl text-left border transition-all relative cursor-pointer ${
                isActive
                  ? 'bg-slate-800 border-orange-500 ring-2 ring-orange-500/40 shadow-lg'
                  : isPast
                  ? 'bg-slate-900/90 border-slate-700 text-slate-400'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-500 hover:border-slate-700'
              } ${isEvacWindow && !isActive ? 'border-amber-600/50 bg-amber-950/20' : ''}`}
            >
              {isEvacWindow && (
                <span className="absolute -top-2 right-2 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 uppercase tracking-tighter shadow">
                  KEY EVAC WINDOW
                </span>
              )}
              <div className="text-[11px] font-bold text-slate-200 truncate">
                {step.label.split('(')[0]}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">
                Discharge: {step.riverDischargeM3s} m³/s
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10px]">
                <span className={`px-1.5 py-0.5 rounded font-mono font-bold border ${alertBadgeStyles[step.alertLevel]}`}>
                  {step.alertLevel.replace('_', ' ')}
                </span>
                {isPast && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* The Core Contrast Box: "What Actually Happened" vs "With Suraksha Kavach" */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Left: Reality Without Suraksha Kavach */}
        <div className="rounded-xl p-4 bg-red-950/20 border border-red-900/50 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Historical Reality (Without Early Relocation Engine)</span>
          </div>
          <p className="text-xs text-red-200/90 leading-relaxed">
            {currentStep.historicalActionRecorded}
          </p>
          <div className="pt-2 border-t border-red-900/40 text-[11px] text-red-300 font-medium">
            <strong>Historical Event Impact:</strong> {region.historicalEvent.actualImpact}
          </div>
        </div>

        {/* Right: What Suraksha Kavach Did (Predictive Evacuation) */}
        <div className="rounded-xl p-4 bg-emerald-950/25 border border-emerald-800/60 space-y-2">
          <div className="flex items-center justify-between gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Suraksha Kavach AI Predictive Relocation Protocol</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700">
              {region.historicalEvent.earlyWarningLeadTimeGained}
            </span>
          </div>
          <p className="text-xs text-emerald-200/90 leading-relaxed font-medium">
            {currentStep.actionTakenBySurakshaKavach}
          </p>
          <div className="pt-2 border-t border-emerald-800/40 text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Demonstrated Outcome: {region.historicalEvent.preventedCasualtiesWithAI}</span>
          </div>
        </div>

      </div>

      {/* Real-time Multi-Sensor Telemetry Readouts Grid */}
      <div>
        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span>Current Ingested Sensor Telemetry ({currentStep.label})</span>
          <span className="text-[11px] text-slate-400 font-normal">
            Cross-correlated with Sentinel-1/2 &amp; DEM Slope
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          {/* Rainfall Metric */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rainfall Gauge</span>
            </div>
            <div className="text-lg font-mono font-bold text-white">
              {currentStep.rainRateMmHr} <span className="text-xs font-normal text-slate-400">mm/hr</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Cumulative: <strong className="text-cyan-300">{currentStep.accumulatedRainMm} mm</strong>
            </div>
          </div>

          {/* Radar Backscatter (Sentinel-1 SAR) */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              <span>Sentinel-1 SAR C-Band</span>
            </div>
            <div className="text-lg font-mono font-bold text-white">
              {currentStep.sentinel1RadarBackscatterDb} <span className="text-xs font-normal text-slate-400">dB</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              NDWI Water Index: <strong className="text-purple-300">{currentStep.sentinel2NdwiIndex > 0 ? `+${currentStep.sentinel2NdwiIndex}` : currentStep.sentinel2NdwiIndex}</strong>
            </div>
          </div>

          {/* River Stage & Discharge */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <Waves className="w-3.5 h-3.5 text-blue-400" />
              <span>River Flow &amp; Level</span>
            </div>
            <div className="text-lg font-mono font-bold text-white">
              {currentStep.riverDischargeM3s.toLocaleString()} <span className="text-xs font-normal text-slate-400">m³/s</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Stage: <strong className={`${currentStep.riverWaterLevelMeters > currentStep.dangerWaterLevelMeters ? 'text-red-400' : 'text-blue-300'}`}>
                {currentStep.riverWaterLevelMeters}m
              </strong> (Danger: {currentStep.dangerWaterLevelMeters}m)
            </div>
          </div>

          {/* Soil Moisture / Slope Inclinometer */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Soil &amp; Slope Creep</span>
            </div>
            <div className="text-lg font-mono font-bold text-white">
              {currentStep.soilMoistureSaturationPct}% <span className="text-xs font-normal text-slate-400">Saturation</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Displacement: <strong className="text-amber-300">{currentStep.slopeDisplacementMmDay} mm/day</strong>
            </div>
          </div>

        </div>

        {/* AI Insight Box */}
        <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
          <span className="p-1 rounded bg-orange-500/20 text-orange-400 mt-0.5">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div>
            <strong className="text-white font-semibold block mb-0.5">
              AI Multi-Hazard Synthesis:
            </strong>
            <p className="text-slate-300 leading-relaxed">
              {currentStep.predictiveInsight}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
