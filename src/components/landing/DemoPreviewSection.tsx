import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

export const DemoPreviewSection: React.FC = () => (
  <section
    id="demo"
    className="sk-section"
    aria-labelledby="demo-heading"
    style={{ background: 'linear-gradient(180deg, #0B1F17 0%, #0D2520 100%)' }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <div className="sk-label mb-3">Live Demo</div>
        <h2 id="demo-heading" className="sk-heading-lg mb-4">
          See the dashboard in action
        </h2>
        <p className="sk-body">
          The full decision-support dashboard is live. Switch between two real disaster scenarios,
          move the timeline slider, ask the AI advisor a question, and generate a sample evacuation order.
        </p>
      </div>

      {/* Dashboard Preview Frame */}
      <div
        className="relative rounded-2xl overflow-hidden border border-[#7A9A6B]/25 shadow-2xl mx-auto max-w-5xl"
        style={{ boxShadow: '0 0 80px rgba(122,154,107,0.1), 0 32px 80px rgba(0,0,0,0.5)' }}
      >
        {/* Fake browser chrome */}
        <div className="bg-[#0E2820] border-b border-[#7A9A6B]/20 px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5484D]/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F5A623]/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]/70" />
          </div>
          <div className="flex-1 bg-[#14342A] rounded-md px-3 py-1 text-xs text-[#A9B8AE] font-mono border border-[#7A9A6B]/20">
            localhost:3000/dashboard
          </div>
          <Link
            to="/dashboard"
            className="text-xs text-[#7A9A6B] hover:text-[#E8D5B0] font-medium transition-colors flex items-center gap-1"
          >
            Open <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Dashboard visual mockup using SVG */}
        <div className="bg-[#0B1F17] aspect-[16/9] relative overflow-hidden">
          <svg viewBox="0 0 1200 675" className="w-full h-full" aria-hidden="true">
            {/* Sidebar */}
            <rect x="0" y="0" width="64" height="675" fill="#14342A" />
            {[80,160,240,320,400].map((y, i) => (
              <rect key={i} x="16" y={y} width="32" height="32" rx="8" fill="#1A4035" />
            ))}

            {/* Top header bar */}
            <rect x="64" y="0" width="1136" height="52" fill="#0E2820" />
            <rect x="80" y="16" width="120" height="20" rx="4" fill="#7A9A6B" opacity="0.4" />
            <rect x="220" y="18" width="80" height="16" rx="4" fill="#1A4035" />
            <rect x="970" y="12" width="130" height="28" rx="14" fill="#E5484D" opacity="0.8" />
            <text x="986" y="31" fontSize="10" fill="#fff" fontWeight="700" fontFamily="Inter,sans-serif">⚠ GENERATE ORDER</text>

            {/* Main map area */}
            <rect x="64" y="52" width="700" height="480" fill="#071510" />
            {/* Map terrain lines */}
            {[100,150,200,250,300,350,400].map((y, i) => (
              <path key={i} d={`M 64 ${52+y} Q ${300+i*20} ${52+y-15} ${550} ${52+y+5} T ${764} ${52+y-8}`} fill="none" stroke="#1A4035" strokeWidth="0.8" />
            ))}
            {/* Red zone glow */}
            <ellipse cx="400" cy="280" rx="90" ry="65" fill="#E5484D" opacity="0.1" />
            <polygon points="330,230 480,220 495,330 320,340" fill="#E5484D" opacity="0.15" stroke="#E5484D" strokeWidth="1.5" strokeOpacity="0.5" />
            {/* Red pulse */}
            <circle cx="400" cy="280" r="10" fill="#E5484D" opacity="0.9" />
            <circle cx="400" cy="280" r="20" fill="#E5484D" opacity="0.15" />
            {/* Shelter */}
            <rect x="590" y="150" width="12" height="12" rx="2" fill="#4CAF50" opacity="0.85" />
            {/* Route */}
            <line x1="400" y1="280" x2="596" y2="156" stroke="#7A9A6B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
            {/* River */}
            <path d="M 64 320 Q 300 310 500 325 T 764 315" fill="none" stroke="#3B9EED" strokeWidth="2" opacity="0.4" />
            {/* Map label */}
            <rect x="320" y="190" width="100" height="18" rx="4" fill="#E5484D" opacity="0.85" />
            <text x="325" y="203" fontSize="9" fill="#fff" fontWeight="700" fontFamily="Inter,sans-serif">⚠ RED ZONE — EVACUATE</text>

            {/* Right panel */}
            <rect x="764" y="52" width="436" height="480" fill="#14342A" />
            {/* Right panel content */}
            <rect x="780" y="70" width="200" height="16" rx="4" fill="#1A4035" />
            <rect x="780" y="96" width="380" height="60" rx="8" fill="#1A4035" opacity="0.7" />
            <rect x="780" y="168" width="380" height="100" rx="8" fill="#0E2820" />
            <rect x="792" y="180" width="100" height="10" rx="3" fill="#7A9A6B" opacity="0.5" />
            <rect x="792" y="200" width="340" height="8" rx="2" fill="#A9B8AE" opacity="0.3" />
            <rect x="792" y="216" width="280" height="8" rx="2" fill="#A9B8AE" opacity="0.25" />
            <rect x="792" y="232" width="300" height="8" rx="2" fill="#A9B8AE" opacity="0.2" />
            <rect x="780" y="284" width="380" height="100" rx="8" fill="#0D2520" />
            <rect x="792" y="296" width="120" height="10" rx="3" fill="#3B9EED" opacity="0.5" />
            <rect x="792" y="314" width="350" height="8" rx="2" fill="#A9B8AE" opacity="0.25" />
            <rect x="792" y="330" width="290" height="8" rx="2" fill="#A9B8AE" opacity="0.2" />
            <rect x="792" y="346" width="320" height="8" rx="2" fill="#A9B8AE" opacity="0.2" />

            {/* Timeline at bottom */}
            <rect x="64" y="532" width="1136" height="143" fill="#0E2820" />
            <rect x="80" y="550" width="1100" height="4" rx="2" fill="#1A4035" />
            <rect x="80" y="548" width="440" height="8" rx="4" fill="#7A9A6B" opacity="0.6" />
            {[80, 300, 520, 740, 960, 1180].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={552} r={i === 3 ? 8 : 5} fill={i === 3 ? "#E5484D" : "#1A4035"} />
                {i === 3 && <circle cx={x} cy={552} r="14" fill="#E5484D" opacity="0.2" />}
              </g>
            ))}
            <text x="80" y="580" fontSize="9" fill="#A9B8AE" fontFamily="Inter,sans-serif">T−48h</text>
            <text x="520" y="580" fontSize="9" fill="#A9B8AE" fontFamily="Inter,sans-serif">T−24h</text>
            <text x="730" y="580" fontSize="9" fill="#E5484D" fontWeight="700" fontFamily="Inter,sans-serif">T−6h ← NOW</text>
            <text x="960" y="580" fontSize="9" fill="#A9B8AE" fontFamily="Inter,sans-serif">T−2h</text>
            <text x="1150" y="580" fontSize="9" fill="#A9B8AE" fontFamily="Inter,sans-serif">T−0</text>

            {/* Demo watermark */}
            <text x="640" y="668" fontSize="9" fill="#7A9A6B" opacity="0.4" textAnchor="middle" fontFamily="Inter,sans-serif">DEMO DATA — Suraksha Kavach Dashboard</text>
          </svg>

          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#0B1F17]/60 backdrop-blur-[1px]">
            <Link
              to="/dashboard"
              id="demo-preview-open"
              className="sk-btn-cta text-base shadow-2xl"
              style={{ boxShadow: '0 0 40px rgba(232,213,176,0.3)' }}
            >
              <ExternalLink className="w-5 h-5" />
              Open the Live Dashboard
            </Link>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-[#A9B8AE]/50 mt-4">
        Demo data only. All scenarios use historical public data from real events.
      </p>
    </div>
  </section>
);
