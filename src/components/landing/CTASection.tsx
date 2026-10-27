import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldAlert } from 'lucide-react';

export const CTASection: React.FC = () => (
  <section
    id="about"
    className="sk-section"
    aria-labelledby="cta-heading"
  >
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

      {/* Icon */}
      <div
        className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #7A9A6B 0%, #4D7040 100%)',
          boxShadow: '0 0 60px rgba(122,154,107,0.3)',
        }}
      >
        <ShieldAlert className="w-10 h-10 text-[#E8D5B0]" aria-hidden="true" />
      </div>

      <div className="sk-label mb-3">Get Started</div>
      <h2 id="cta-heading" className="sk-heading-lg mb-5">
        See how this could protect your region
      </h2>
      <p className="sk-body text-lg mb-8 max-w-xl mx-auto">
        The live dashboard is ready. Explore two real-world disaster scenarios,
        simulate the timeline, and generate a sample evacuation order — all in the browser.
      </p>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
        <Link
          to="/dashboard"
          id="cta-open-dashboard"
          className="sk-btn-cta text-base"
          style={{ boxShadow: '0 0 40px rgba(232,213,176,0.25)' }}
        >
          <ExternalLink className="w-5 h-5" aria-hidden="true" />
          Open Live Dashboard
        </Link>
        <a
          href="#how-it-works"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="sk-btn-ghost text-base"
        >
          Review How It Works
        </a>
      </div>

      {/* Team + Audience note */}
      <div className="border border-[#7A9A6B]/20 rounded-2xl p-6 bg-[#14342A] text-left space-y-3">
        <div className="flex items-start gap-3">
          <div>
            <div className="sk-label mb-1">About this project</div>
            <p className="text-sm text-[#A9B8AE] leading-relaxed">
              Suraksha Kavach is a research prototype built by <strong className="text-[#E8D5B0]">Team Exprosum</strong>.
              It demonstrates how AI, satellite data, and terrain analysis can be combined
              to support faster, more informed disaster management decisions.
            </p>
            <p className="text-sm text-[#A9B8AE] leading-relaxed mt-2">
              This is a demonstration platform. All scenarios use <strong className="text-[#E8D5B0]">historical public data</strong>.
              It is not intended for operational deployment without further validation and regulatory approval.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          {['Disaster Officials', 'Researchers', 'Faculty & Judges', 'Policy Makers'].map((audience) => (
            <span
              key={audience}
              className="text-xs px-3 py-1 rounded-full bg-[#7A9A6B]/10 border border-[#7A9A6B]/25 text-[#7A9A6B] font-medium"
            >
              {audience}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);
