import React from 'react';
import { CriticalRegion, TimelineStep } from '../types';
import { X, Printer, ShieldAlert, FileText, CheckCircle2, Award } from 'lucide-react';

interface OfficialEvacuationOrderModalProps {
  region: CriticalRegion;
  currentStep: TimelineStep;
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialEvacuationOrderModal: React.FC<OfficialEvacuationOrderModalProps> = ({
  region,
  currentStep,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const totalPop = region.habitations.reduce((acc, h) => acc + h.totalPopulation, 0);
  const totalElderly = region.habitations.reduce((acc, h) => acc + (h.demographics?.elderly || 0), 0);
  const totalPwd = region.habitations.reduce((acc, h) => acc + (h.demographics?.personsWithDisabilities || 0), 0);
  const totalChildren = region.habitations.reduce((acc, h) => acc + (h.demographics?.children || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-orange-400" />
            <span className="font-bold text-sm tracking-wide">
              Official Emergency Evacuation &amp; Relocation Order
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Official Printable Memo Body */}
        <div className="p-8 overflow-y-auto space-y-6 font-serif print:p-0">
          
          {/* Memo Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
            <div className="text-xs font-sans font-bold uppercase tracking-widest text-slate-500">
              Disaster Risk Response Protocol • Rapid Action Division
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
              SURAKSHA KAVACH DISASTER RELOCATION ORDER
            </h1>
            <div className="text-sm font-sans text-slate-600 font-medium">
              Autonomous Red Zone Identification &amp; Carrying Capacity Dispatch Directive
            </div>
            <div className="text-xs font-mono text-slate-500 pt-1">
              Doc Ref: SK-ORD/{region.id.toUpperCase()}/{new Date().toISOString().slice(0, 10)}
            </div>
          </div>

          {/* Region & Incident Summary */}
          <div className="grid grid-cols-2 gap-4 text-xs font-sans bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <strong>Designated Critical Zone:</strong> {region.name} ({region.subRegion}, {region.country})<br />
              <strong>Hydrological River Basin:</strong> {region.riverBasin}<br />
              <strong>Primary Hazards Identified:</strong> {region.primaryHazards.join(', ')}
            </div>
            <div>
              <strong>Current Alert Status:</strong> <span className="font-bold text-red-600">{currentStep.alertLevel}</span><br />
              <strong>Predictive Lead Time Gained:</strong> {region.historicalEvent.earlyWarningLeadTimeGained}<br />
              <strong>Total Habitations at Risk:</strong> {totalPop.toLocaleString()} Citizens
            </div>
          </div>

          {/* Priority Demographics Triage Table */}
          <div className="space-y-2">
            <h3 className="text-sm font-sans font-bold text-slate-900 uppercase tracking-wider border-b pb-1">
              1. Vulnerable Population Triage &amp; Specialized Logistics
            </h3>
            <table className="w-full text-xs font-sans text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b">
                  <th className="p-2">Habitation</th>
                  <th className="p-2">Total Pop</th>
                  <th className="p-2">Elderly (60+)</th>
                  <th className="p-2">Children</th>
                  <th className="p-2">PwD / Medical</th>
                  <th className="p-2">Assigned Shelter</th>
                </tr>
              </thead>
              <tbody>
                {region.habitations.map((hab) => {
                  const shelter = region.relocationShelters.find((s) => s.id === hab.assignedShelterId);
                  return (
                    <tr key={hab.id} className="border-b">
                      <td className="p-2 font-semibold">{hab.name}</td>
                      <td className="p-2 font-mono">{hab.totalPopulation}</td>
                      <td className="p-2">{hab.demographics.elderly}</td>
                      <td className="p-2">{hab.demographics.children}</td>
                      <td className="p-2 font-bold text-red-600">{hab.demographics.personsWithDisabilities}</td>
                      <td className="p-2 text-emerald-700 font-semibold">{shelter?.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Shelter Carrying Capacity Audit Table */}
          <div className="space-y-2">
            <h3 className="text-sm font-sans font-bold text-slate-900 uppercase tracking-wider border-b pb-1">
              2. Destination Shelter Carrying Capacity Verification
            </h3>
            <table className="w-full text-xs font-sans text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b">
                  <th className="p-2">Relocation Facility</th>
                  <th className="p-2">Max Capacity</th>
                  <th className="p-2">Allocated</th>
                  <th className="p-2">Spare Beds</th>
                  <th className="p-2">Flood Safety Delta</th>
                  <th className="p-2">Rations Stocked</th>
                </tr>
              </thead>
              <tbody>
                {region.relocationShelters.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td className="p-2 font-semibold">{s.name}</td>
                    <td className="p-2 font-mono">{s.totalCapacity}</td>
                    <td className="p-2 font-mono font-bold text-emerald-700">+{s.allocatedFromSystem}</td>
                    <td className="p-2 font-mono">{s.totalCapacity - (s.currentOccupied + s.allocatedFromSystem)}</td>
                    <td className="p-2 text-blue-700">+{s.elevationMeters}m MSL</td>
                    <td className="p-2">{s.facilities.stockedFoodDays} Days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Operational Directive Sign-off */}
          <div className="pt-4 border-t-2 border-slate-900 text-xs font-sans flex items-end justify-between">
            <div>
              <div className="flex items-center gap-1 text-emerald-700 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified by Suraksha Kavach Geospatial Engine</span>
              </div>
              <div className="text-slate-500">
                Correlated with Sentinel-1 C-Band SAR, Cartosat DEM, and DHM/IMD AWS.
              </div>
            </div>

            <div className="text-right space-y-8">
              <div className="text-slate-400 italic">Official Authorization Stamp</div>
              <div className="font-bold border-t border-slate-400 pt-1">
                Incident Commander / District Magistrate
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Team Exprosum • Suraksha Kavach</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Memo
          </button>
        </div>

      </div>
    </div>
  );
};
