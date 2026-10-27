import React from 'react';
import {
  Radio,
  BrainCircuit,
  TrendingUp,
  Users,
  MapPin,
  Bell,
  RefreshCw,
} from 'lucide-react';

const STEPS = [
  {
    num: 1,
    icon: Radio,
    title: 'Detect',
    headline: 'Sensors watch 24/7',
    body: 'Satellite radar (Sentinel-1 SAR), optical images (Sentinel-2), rainfall gauges, river-level sensors, and ground inclinometers stream data into the system continuously — even through clouds and at night.',
  },
  {
    num: 2,
    icon: BrainCircuit,
    title: 'Analyse',
    headline: 'AI reads the signals',
    body: 'The system compares incoming readings against historical baseline patterns. A sudden drop in radar backscatter — a sign that soil or rock has moved — triggers deeper analysis. This is machine-readable, not visible to the human eye.',
  },
  {
    num: 3,
    icon: TrendingUp,
    title: 'Predict',
    headline: 'Model risk hours ahead',
    body: 'By combining terrain slope data, soil saturation levels, river discharge rates, and upstream sensor readings, the system forecasts flood or landslide peaks — and how much time is available before safe passage is cut off.',
  },
  {
    num: 4,
    icon: Users,
    title: 'Prioritise',
    headline: 'Rank who needs help first',
    body: 'Each household or settlement is scored by its hazard risk, distance to danger, and the needs of its residents — elderly, children, people with disabilities, pregnant women. The most vulnerable get the first transport slot.',
  },
  {
    num: 5,
    icon: MapPin,
    title: 'Plan',
    headline: 'Map safe routes and shelters',
    body: 'The system checks whether evacuation roads are clear and whether shelters have enough beds, water, and medical supplies for the incoming population. If a route is blocked, an alternative is automatically suggested.',
  },
  {
    num: 6,
    icon: Bell,
    title: 'Communicate',
    headline: 'Officials issue the order',
    body: 'The authorised district official reviews the AI recommendation, makes the final call, and triggers a one-click official evacuation order — with a printable, signed memo ready for field teams and media.',
  },
  {
    num: 7,
    icon: RefreshCw,
    title: 'Adapt',
    headline: 'Update as the situation changes',
    body: 'The system keeps monitoring as the event unfolds. New sensor readings update the risk map, shelter capacity adjusts in real time, and the AI advisor remains available for tactical questions throughout.',
  },
];

export const HowItWorksSection: React.FC = () => (
  <section
    id="how-it-works"
    className="sk-section"
    aria-labelledby="how-heading"
    style={{ background: 'linear-gradient(180deg, #0B1F17 0%, #0E2820 50%, #0B1F17 100%)' }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section Header */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="sk-label mb-3">How It Works</div>
        <h2 id="how-heading" className="sk-heading-lg mb-4">
          Seven steps from signal to safety
        </h2>
        <p className="sk-body">
          Suraksha Kavach turns raw sensor data into a clear action plan — so officials
          can make confident decisions under pressure, without needing to be data scientists.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          // Last step (7) spans 2 columns on xl to centre it
          const isLast = idx === STEPS.length - 1;
          return (
            <div
              key={step.num}
              className={`sk-card flex flex-col gap-4 ${isLast ? 'xl:col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-1' : ''}`}
            >
              {/* Number + Icon */}
              <div className="flex items-center gap-3">
                <div className="step-number" aria-hidden="true">{step.num}</div>
                <div className="w-9 h-9 rounded-xl bg-[#7A9A6B]/15 border border-[#7A9A6B]/25 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-[#7A9A6B]" aria-hidden="true" />
                </div>
              </div>

              {/* Text */}
              <div>
                <div className="sk-label mb-1">Step {step.num} — {step.title}</div>
                <h3 className="sk-heading-md text-[#E8D5B0] mb-2">{step.headline}</h3>
                <p className="text-sm text-[#A9B8AE] leading-relaxed">{step.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
