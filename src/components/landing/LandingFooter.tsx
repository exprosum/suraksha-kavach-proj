import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ExternalLink, CheckCircle2 } from 'lucide-react';

const DATA_BADGES = [
  'Copernicus Sentinel-1/2',
  'Cartosat-1 DEM',
  'Nepal DHM',
  'IMD AWS',
  'Google Gemini AI',
];

export const LandingFooter: React.FC = () => (
  <footer
    id="footer"
    className="border-t border-[#7A9A6B]/20 bg-[#0B1F17]"
    role="contentinfo"
  >
    {/* Main Footer */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Brand */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7A9A6B] to-[#4D7040] flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-[#E8D5B0]" aria-hidden="true" />
          </div>
          <div>
            <div className="font-bold text-[#E8D5B0] text-sm">SURAKSHA KAVACH</div>
            <div className="text-[10px] text-[#7A9A6B]">सुरक्षा कवच</div>
          </div>
        </div>
        <p className="text-sm text-[#A9B8AE] leading-relaxed">
          AI-powered early warning and relocation platform for flood, landslide,
          and GLOF-prone regions. Built for disaster management officials.
        </p>
        <p className="text-xs text-[#A9B8AE]/60">
          Built by <span className="text-[#7A9A6B]">Team Exprosum</span>.
          Research prototype — not for operational deployment.
        </p>
      </div>

      {/* Quick Nav */}
      <div>
        <h3 className="text-sm font-semibold text-[#E8D5B0] mb-4">Quick Links</h3>
        <nav aria-label="Footer navigation">
          <ul className="space-y-2">
            {[
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Key Features', href: '#features' },
              { label: 'Why Trust It', href: '#trust' },
              { label: 'Open Dashboard', href: '/dashboard', isRoute: true },
            ].map((link) => (
              <li key={link.label}>
                {link.isRoute
                  ? (
                    <Link
                      to={link.href!}
                      className="text-sm text-[#A9B8AE] hover:text-[#E8D5B0] transition-colors flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  )
                  : (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(link.href!)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-sm text-[#A9B8AE] hover:text-[#E8D5B0] transition-colors"
                    >
                      {link.label}
                    </a>
                  )
                }
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Data Sources */}
      <div>
        <h3 className="text-sm font-semibold text-[#E8D5B0] mb-4">Verified Data Sources</h3>
        <ul className="space-y-2">
          {DATA_BADGES.map((src) => (
            <li key={src} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#7A9A6B] flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-[#A9B8AE]">{src}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-[#7A9A6B]/15 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#A9B8AE]/60">
        <p>© 2024 Team Exprosum. Suraksha Kavach Research Prototype.</p>
        <p>Demo data only. Historical events used for modelling purposes.</p>
      </div>
    </div>
  </footer>
);
