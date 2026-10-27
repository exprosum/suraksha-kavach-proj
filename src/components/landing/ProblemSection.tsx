import React from 'react';

const DISASTERS = [
  {
    id: 'wayanad',
    date: 'July 30, 2024',
    location: 'Chooralmala–Mundakkai, Wayanad, Kerala, India',
    hazard: 'Landslide + Flash Flood',
    hazardColor: '#E5484D',
    what: 'Massive dual landslides swept through steep tea-estate slopes after 25 cm of rainfall in 48 hours. Entire hamlets were buried under debris while residents slept.',
    impact: 'Over 400 lives lost. Hundreds missing. 10,000+ displaced overnight.',
    withSK: 'Suraksha Kavach models show slope saturation and river-level triggers up to 18 hours before critical failure — enough time to move all affected hamlets to high-ground shelters.',
    region: 'Kerala, India',
    icon: '⛰️',
  },
  {
    id: 'rishiganga',
    date: 'February 7, 2021',
    location: 'Chamoli–Rishiganga, Uttarakhand, India',
    hazard: 'Glacial Lake Outburst (GLOF)',
    hazardColor: '#3B9EED',
    what: 'A glacier mass detached from Ronti Peak, triggering a sudden, violent debris flood down the Rishiganga and Dhauliganga rivers at speeds exceeding 12 m/s.',
    impact: '204 workers at hydro-power project sites killed or missing. Bridges and infrastructure destroyed.',
    withSK: 'Upstream SAR radar backscatter and moraine deformation signals appear up to 52 minutes before surge arrival. Our model would have triggered automatic alerts to clear project sites.',
    region: 'Uttarakhand, India',
    icon: '🏔️',
  },
  {
    id: 'bhotekoshi',
    date: 'July 5–6, 2016 & 2020',
    location: 'Bhotekoshi Valley, Sindhupalchok, Nepal',
    hazard: 'GLOF + Debris Surge',
    hazardColor: '#F5A623',
    what: 'Glacial lake breach in Tibetan Plateau sent a debris surge down the Bhotekoshi valley at midnight. Border settlements, hydro-power infrastructure, and Araniko Highway bridges were wiped out.',
    impact: '38 casualties. 66 houses destroyed. Critical border infrastructure gone. Only 8–15 minutes informal warning.',
    withSK: 'Our transboundary Sentinel-1 SAR and acoustic flow sensor fusion detects the upstream breach. System models a 4.5-hour relocation window — enough to clear every at-risk settlement.',
    region: 'Nepal',
    icon: '🌊',
  },
];

export const ProblemSection: React.FC = () => (
  <section
    id="problem"
    className="sk-section"
    aria-labelledby="problem-heading"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section Header */}
      <div className="text-center mb-14 sk-section-narrow mx-auto">
        <div className="sk-label mb-3">The Problem</div>
        <h2 id="problem-heading" className="sk-heading-lg mb-4">
          Disasters we could have seen coming
        </h2>
        <p className="sk-body text-lg">
          The data existed. The sensors were live. The signals were there.
          But no system connected the dots fast enough to save lives.
          These three tragedies show why every minute of early warning matters.
        </p>
      </div>

      {/* Disaster Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {DISASTERS.map((d) => (
          <article
            key={d.id}
            className="sk-card flex flex-col"
            aria-labelledby={`disaster-${d.id}-heading`}
          >
            {/* Top bar — hazard type */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4 w-fit"
              style={{
                background: `${d.hazardColor}18`,
                border: `1px solid ${d.hazardColor}40`,
              }}
            >
              <span aria-hidden="true" className="text-base">{d.icon}</span>
              <span
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: d.hazardColor }}
              >
                {d.hazard}
              </span>
            </div>

            <div className="sk-label mb-1">{d.date}</div>
            <h3 id={`disaster-${d.id}-heading`} className="sk-heading-md mb-1 text-[#E8D5B0]">
              {d.location}
            </h3>

            {/* Divider */}
            <div className="h-px bg-[#7A9A6B]/20 my-4" />

            <p className="sk-body text-sm mb-4 flex-1">
              <strong className="text-[#F5F5F0] font-medium">What happened:</strong>{' '}
              {d.what}
            </p>

            {/* Impact block */}
            <div
              className="p-3 rounded-xl mb-4 text-sm"
              style={{ background: `${d.hazardColor}10`, borderLeft: `3px solid ${d.hazardColor}` }}
            >
              <div className="font-semibold text-[#F5F5F0] mb-0.5">Actual impact</div>
              <p className="text-[#A9B8AE] leading-snug">{d.impact}</p>
            </div>

            {/* With SK */}
            <div className="p-3 rounded-xl text-sm bg-[#7A9A6B]/10 border border-[#7A9A6B]/25">
              <div className="font-semibold text-[#7A9A6B] mb-0.5">With Suraksha Kavach</div>
              <p className="text-[#A9B8AE] leading-snug">{d.withSK}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-[#A9B8AE]/60 mt-8">
        Historical data referenced from public government and research sources. All projections are model estimates for demonstration purposes. [REPLACE with peer-reviewed citations]
      </p>
    </div>
  </section>
);
