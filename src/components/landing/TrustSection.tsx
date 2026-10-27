import React from 'react';
import { ShieldCheck, UserCheck, Database, Scale, Eye, BookOpen } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: Eye,
    title: 'Explainable AI',
    body: 'Every AI recommendation comes with a plain-language explanation of why that zone is red, which sensors triggered it, and what the uncertainty level is. No black-box scores.',
    highlight: '"Why is this zone red?" — always answered.',
  },
  {
    icon: UserCheck,
    title: 'Human Override — Always',
    body: 'The AI advises; it never decides. Every recommendation shows a clear "Verify or Override" note. No evacuation order can be issued without an authorised official\'s explicit action.',
    highlight: 'Officials are in control at every step.',
  },
  {
    icon: Database,
    title: 'Verified Data Sources',
    body: 'Every reading is traced to its origin: ESA Copernicus, ISRO Cartosat, Nepal DHM, or IMD. Each source shows its update frequency, resolution, and reliability weight.',
    highlight: 'Full data provenance. Nothing invented.',
  },
  {
    icon: Scale,
    title: 'Uncertainty Shown, Not Hidden',
    body: 'The system distinguishes between high-confidence readings (live sensors) and lower-confidence estimates (model forecasts). Uncertainty is shown as a clear indicator, not hidden.',
    highlight: 'Confidence levels displayed on every output.',
  },
  {
    icon: ShieldCheck,
    title: 'Calibrated to Real Events',
    body: 'All models are grounded in real disaster data — Wayanad 2024, Rishiganga 2021, Bhotekoshi 2016/2020. The system\'s predictions are validated against what actually happened.',
    highlight: 'Tested against known historical ground truth.',
  },
  {
    icon: BookOpen,
    title: 'Open Methodology',
    body: 'The AI methodology, sensor fusion logic, and data weights are documented and can be audited. No proprietary black box. The code is readable, the logic is teachable.',
    highlight: 'Transparent. Auditable. Academic-ready.',
  },
];

const DATA_SOURCES = [
  { name: 'ESA Copernicus Sentinel-1 SAR', type: 'Satellite Radar', agency: 'European Space Agency', verified: true },
  { name: 'ESA Copernicus Sentinel-2 MSI', type: 'Optical Satellite', agency: 'European Space Agency', verified: true },
  { name: 'ISRO Cartosat-1 DEM', type: 'Terrain Elevation', agency: 'ISRO, India', verified: true },
  { name: 'Nepal DHM Stage Sensors', type: 'River Hydrology', agency: 'Nepal Dept. of Hydrology & Meteorology', verified: true },
  { name: 'IMD Automatic Weather Stations', type: 'Rainfall & Weather', agency: 'India Meteorological Department', verified: true },
  { name: 'Google Gemini AI', type: 'Language Reasoning', agency: 'Google DeepMind', verified: true },
];

export const TrustSection: React.FC = () => (
  <section
    id="trust"
    className="sk-section"
    aria-labelledby="trust-heading"
    style={{ background: 'linear-gradient(180deg, #0B1F17 0%, #0A1C14 100%)' }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="sk-label mb-3">Why Trust It</div>
        <h2 id="trust-heading" className="sk-heading-lg mb-4">
          Trustworthy AI for high-stakes decisions
        </h2>
        <p className="sk-body">
          When lives depend on it, "just trust the AI" is not enough. Suraksha Kavach
          is designed so officials can verify every recommendation before they act on it.
        </p>
      </div>

      {/* Trust pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {TRUST_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.title} className="sk-card flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7A9A6B]/12 border border-[#7A9A6B]/25 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#7A9A6B]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="sk-heading-md text-[#E8D5B0] mb-1">{pillar.title}</h3>
                <p className="text-sm text-[#A9B8AE] leading-relaxed mb-3">{pillar.body}</p>
                <p className="text-xs text-[#7A9A6B] font-medium italic">{pillar.highlight}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Data Sources table */}
      <div className="max-w-3xl mx-auto">
        <h3 className="sk-heading-md text-[#E8D5B0] text-center mb-6">
          Data sources used in this platform
        </h3>
        <div className="sk-card overflow-hidden p-0">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-[#7A9A6B]/20">
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A9A6B] uppercase tracking-wide">Source</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A9A6B] uppercase tracking-wide hidden sm:table-cell">Type</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#7A9A6B] uppercase tracking-wide hidden md:table-cell">Agency</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-[#7A9A6B] uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {DATA_SOURCES.map((src, i) => (
                <tr
                  key={src.name}
                  className={`border-b border-[#7A9A6B]/10 last:border-0 ${i % 2 === 0 ? '' : 'bg-[#7A9A6B]/5'}`}
                >
                  <td className="px-5 py-3 font-medium text-[#F5F5F0]">{src.name}</td>
                  <td className="px-5 py-3 text-[#A9B8AE] hidden sm:table-cell">{src.type}</td>
                  <td className="px-5 py-3 text-[#A9B8AE] hidden md:table-cell">{src.agency}</td>
                  <td className="px-5 py-3 text-right">
                    {src.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4CAF50] bg-[#4CAF50]/10 border border-[#4CAF50]/25 rounded-full px-2.5 py-0.5">
                        <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                        Verified
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-xs text-[#A9B8AE]/60 mt-4">
          [REPLACE] Full citations and methodology paper available on request.
        </p>
      </div>
    </div>
  </section>
);
