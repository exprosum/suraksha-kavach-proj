import React from 'react';
import {
  Map,
  Clock,
  Building2,
  Sparkles,
  FileText,
  Database,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Map,
    title: 'Interactive Hazard Map',
    body: 'Live satellite + terrain overlay shows red zones, vulnerable settlements, safe shelters, and evacuation corridors — all on one interactive map.',
    tag: 'Leaflet + Sentinel-1',
    color: '#E5484D',
  },
  {
    icon: Clock,
    title: 'Timeline Simulator',
    body: 'Replay a disaster timeline from T−48h to T−0. Watch risk escalate through real sensor readings so officials can train and prepare.',
    tag: 'T−48h to T−0',
    color: '#F5A623',
  },
  {
    icon: Building2,
    title: 'Carrying Capacity Planner',
    body: 'Each shelter\'s beds, water supply, and medical support are matched against the incoming population — prioritising the most vulnerable.',
    tag: 'Triage-aware',
    color: '#7A9A6B',
  },
  {
    icon: Sparkles,
    title: 'AI Situation Advisor',
    body: 'Google Gemini AI turns raw sensor readings into a plain-language situation brief. Ask it tactical questions — it explains its reasoning.',
    tag: 'Gemini AI',
    color: '#3B9EED',
  },
  {
    icon: FileText,
    title: 'Official Evacuation Order',
    body: 'One click generates a printable, signed official evacuation memo ready for police, shelter staff, and emergency broadcast teams.',
    tag: 'Print & PDF ready',
    color: '#E8D5B0',
  },
  {
    icon: Database,
    title: 'Data Trust Panel',
    body: 'Every number shown has a source. Click any indicator to see exactly which satellite, sensor, or model produced it — and how reliable it is.',
    tag: 'Full provenance',
    color: '#A9B8AE',
  },
];

export const FeaturesSection: React.FC = () => (
  <section
    id="features"
    className="sk-section"
    aria-labelledby="features-heading"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="sk-label mb-3">Key Features</div>
        <h2 id="features-heading" className="sk-heading-lg mb-4">
          Everything officials need, in one place
        </h2>
        <p className="sk-body">
          Each feature was designed around a real question that a district disaster officer
          asks when a flood or landslide alert comes in.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="sk-card group flex flex-col gap-4"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                style={{
                  background: `${feat.color}15`,
                  border: `1px solid ${feat.color}30`,
                }}
              >
                <Icon
                  className="w-5.5 h-5.5"
                  style={{ color: feat.color }}
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="sk-heading-md text-[#E8D5B0]">{feat.title}</h3>
                </div>
                <p className="text-sm text-[#A9B8AE] leading-relaxed mb-3">{feat.body}</p>
                <span
                  className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: `${feat.color}12`,
                    color: feat.color,
                    border: `1px solid ${feat.color}25`,
                  }}
                >
                  {feat.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
