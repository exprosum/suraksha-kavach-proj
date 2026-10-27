import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ChevronDown } from 'lucide-react';

// Animated SVG Hazard Map Hero
const HazardMapSVG: React.FC = () => (
  <svg
    viewBox="0 0 800 500"
    className="w-full h-full"
    role="img"
    aria-label="Animated hazard map showing red zones over dark terrain"
  >
    {/* Dark terrain base */}
    <defs>
      <radialGradient id="glowRed" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E5484D" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#E5484D" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="glowAmber" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F5A623" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B2A1C" />
        <stop offset="100%" stopColor="#071510" />
      </radialGradient>
      <filter id="blur4">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <filter id="blur8">
        <feGaussianBlur stdDeviation="8" />
      </filter>
    </defs>

    {/* Map background */}
    <rect width="800" height="500" fill="url(#mapGrad)" />

    {/* Terrain contour lines — subtle */}
    {[60, 120, 180, 240, 300, 360, 420, 480].map((y, i) => (
      <path
        key={i}
        d={`M 0 ${y} Q ${100 + i * 40} ${y - 20 + i * 5} ${250 + i * 20} ${y + 10} T ${600 - i * 10} ${y - 5} T 800 ${y + 15}`}
        fill="none"
        stroke="#1A4035"
        strokeWidth="0.8"
        opacity="0.6"
      />
    ))}

    {/* River path */}
    <path
      d="M 0 200 Q 100 190 200 210 T 400 200 T 600 215 T 800 210"
      fill="none"
      stroke="#3B9EED"
      strokeWidth="2"
      opacity="0.5"
    />

    {/* Roads / paths */}
    <path d="M 50 450 L 750 80" stroke="#2D5A42" strokeWidth="1" opacity="0.4" strokeDasharray="4 4" />
    <path d="M 100 500 L 500 50" stroke="#2D5A42" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />

    {/* ── Red Zone Glow Blobs ── */}
    {/* Primary red zone — main danger */}
    <ellipse cx="320" cy="200" rx="70" ry="55" fill="url(#glowRed)" filter="url(#blur8)" />
    <ellipse cx="320" cy="200" rx="50" ry="38" fill="#E5484D" opacity="0.12" />
    <polygon
      points="260,170 380,160 395,240 280,250 250,210"
      fill="#E5484D"
      opacity="0.18"
      stroke="#E5484D"
      strokeWidth="1.5"
      strokeOpacity="0.5"
    />

    {/* Secondary amber zone */}
    <ellipse cx="500" cy="280" rx="55" ry="40" fill="url(#glowAmber)" filter="url(#blur8)" />
    <polygon
      points="450,255 555,245 565,315 445,320"
      fill="#F5A623"
      opacity="0.14"
      stroke="#F5A623"
      strokeWidth="1"
      strokeOpacity="0.4"
    />

    {/* ── Pulsing Red Zone Centre Points ── */}
    {/* Main red pulse */}
    <circle cx="320" cy="200" r="26" fill="#E5484D" opacity="0.08" className="hero-zone-outer" />
    <circle cx="320" cy="200" r="8"  fill="#E5484D" opacity="0.85" className="hero-zone-pulse" />
    <circle cx="320" cy="200" r="3"  fill="#fff" opacity="0.9" />

    {/* Secondary red point */}
    <circle cx="280" cy="230" r="18" fill="#E5484D" opacity="0.07"
      style={{ animation: 'hero-outer 2.8s ease-in-out infinite 0.6s' }} />
    <circle cx="280" cy="230" r="6"  fill="#E5484D" opacity="0.75"
      style={{ animation: 'hero-pulse 2.8s ease-in-out infinite 0.6s' }} />
    <circle cx="280" cy="230" r="2.5" fill="#fff" opacity="0.8" />

    {/* Amber warning point */}
    <circle cx="500" cy="280" r="20" fill="#F5A623" opacity="0.07"
      style={{ animation: 'hero-outer 3.2s ease-in-out infinite 1s' }} />
    <circle cx="500" cy="280" r="7"  fill="#F5A623" opacity="0.8"
      style={{ animation: 'hero-pulse 3.2s ease-in-out infinite 1s' }} />
    <circle cx="500" cy="280" r="3"  fill="#fff" opacity="0.7" />

    {/* ── Safe Shelter Markers ── */}
    <rect x="580" y="100" width="10" height="10" rx="2" fill="#4CAF50" opacity="0.8" />
    <rect x="140" y="350" width="10" height="10" rx="2" fill="#4CAF50" opacity="0.8" />
    <rect x="680" y="380" width="10" height="10" rx="2" fill="#4CAF50" opacity="0.7" />

    {/* Connector lines from red zones to shelters — evacuation routes */}
    <line x1="320" y1="200" x2="585" y2="105" stroke="#7A9A6B" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.5" />
    <line x1="280" y1="230" x2="145" y2="355" stroke="#7A9A6B" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.4" />

    {/* Sensor nodes */}
    <circle cx="200" cy="150" r="3.5" fill="#3B9EED" opacity="0.7" />
    <circle cx="420" cy="310" r="3.5" fill="#3B9EED" opacity="0.6" />
    <circle cx="650" cy="200" r="3.5" fill="#3B9EED" opacity="0.6" />

    {/* Population dots in risk zone */}
    {[[330, 185],[310, 210],[345, 215],[295, 195]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="2.5" fill="#E8D5B0" opacity="0.7" />
    ))}

    {/* Label overlays */}
    <rect x="256" y="154" width="82" height="17" rx="4" fill="#E5484D" opacity="0.85" />
    <text x="260" y="166" fontSize="9" fill="#fff" fontWeight="700" fontFamily="Inter,sans-serif">⚠ RED EVACUATION ZONE</text>

    <rect x="452" y="238" width="70" height="16" rx="4" fill="#F5A623" opacity="0.85" />
    <text x="456" y="250" fontSize="9" fill="#000" fontWeight="700" fontFamily="Inter,sans-serif">▲ WARNING ZONE</text>

    <text x="583" y="97" fontSize="8" fill="#4CAF50" fontWeight="600" fontFamily="Inter,sans-serif">✓ SHELTER</text>
    <text x="143" y="347" fontSize="8" fill="#4CAF50" fontWeight="600" fontFamily="Inter,sans-serif">✓ SHELTER</text>

    {/* Corner watermark */}
    <text x="12" y="490" fontSize="8" fill="#7A9A6B" opacity="0.5" fontFamily="Inter,sans-serif">DEMO DATA — Suraksha Kavach AI System</text>
  </svg>
);

export const HeroSection: React.FC = () => {
  const handleScrollToHow = () => {
    document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(122,154,107,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left: Text Content */}
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7A9A6B]/40 bg-[#7A9A6B]/10 text-[#7A9A6B] text-sm font-medium mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5484D] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5484D]" />
            </span>
            AI-Powered Disaster Risk Platform · Demo Mode
          </div>

          <h1 id="hero-heading" className="sk-heading-xl">
            Know Before the{' '}
            <span className="text-[#E5484D]">Flood</span> Strikes.
            <br />
            <span className="text-[#E8D5B0]">Move People to Safety</span> in Time.
          </h1>

          <p className="sk-body text-lg max-w-lg mx-auto lg:mx-0" style={{ fontSize: '1.1rem' }}>
            Suraksha Kavach fuses satellite data, terrain maps, weather sensors,
            and AI to give disaster officials a clear picture of who is at risk,
            where safety lies, and how to get people there — hours before a disaster arrives.
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-6 justify-center lg:justify-start flex-wrap pt-2">
            {[
              { value: '18h+', label: 'Early Warning Lead Time' },
              { value: '3',    label: 'Real Disaster Scenarios' },
              { value: '5,000+', label: 'Lives Modelled Safe' },
            ].map((stat) => (
              <div key={stat.value} className="sk-stat">
                <div className="sk-stat-value">{stat.value}</div>
                <div className="sk-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 justify-center lg:justify-start pt-2 flex-wrap">
            <Link to="/dashboard" id="hero-open-dashboard" className="sk-btn-cta">
              <ExternalLink className="w-4.5 h-4.5" aria-hidden="true" />
              Open Live Dashboard
            </Link>
            <button
              onClick={handleScrollToHow}
              className="sk-btn-ghost"
            >
              How It Works
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <p className="text-xs text-[#A9B8AE]/60 mt-2">
            Demo data only. No personal data collected. Built for disaster management research.
          </p>
        </div>

        {/* Right: Animated Hazard Map */}
        <div className="relative">
          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            aria-hidden="true"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(229,72,77,0.12) 0%, transparent 70%)',
            }}
          />
          <div
            className="relative rounded-2xl overflow-hidden border border-[#7A9A6B]/25 shadow-2xl"
            style={{ boxShadow: '0 0 60px rgba(229,72,77,0.12), 0 32px 64px rgba(0,0,0,0.4)' }}
          >
            {/* Map header bar */}
            <div className="bg-[#0B1F17] border-b border-[#7A9A6B]/20 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5484D] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5484D]" />
                </span>
                <span className="text-xs font-mono text-[#A9B8AE]">LIVE HAZARD MAP — Bhotekoshi Valley, Nepal</span>
              </div>
              <span className="demo-badge">Demo</span>
            </div>

            {/* SVG Map */}
            <div className="aspect-[8/5] bg-[#071510]">
              <HazardMapSVG />
            </div>

            {/* Map Legend */}
            <div className="bg-[#0B1F17] border-t border-[#7A9A6B]/20 px-4 py-2 flex items-center gap-4 flex-wrap">
              {[
                { color: '#E5484D', label: 'Red Zone (Evacuate)' },
                { color: '#F5A623', label: 'Warning Zone' },
                { color: '#4CAF50', label: 'Safe Shelter' },
                { color: '#7A9A6B', label: 'Evacuation Route' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ background: item.color }}
                    aria-hidden="true"
                  />
                  <span className="text-[10px] text-[#A9B8AE]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={handleScrollToHow}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#7A9A6B]/60 hover:text-[#7A9A6B] transition-colors"
        aria-label="Scroll down to learn more"
      >
        <span className="text-xs font-medium">Scroll to learn more</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};
