import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Menu, X, ExternalLink } from 'lucide-react';

const NAV_LINKS = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#features',     label: 'Features'      },
  { href: '#trust',        label: 'Why Trust It'  },
  { href: '#about',        label: 'About'         },
];

export const LandingNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1F17]/95 backdrop-blur-md border-b border-[#7A9A6B]/20 shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            aria-label="Suraksha Kavach — Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7A9A6B] to-[#4D7040] flex items-center justify-center shadow-lg shadow-[#7A9A6B]/20 group-hover:shadow-[#7A9A6B]/40 transition-shadow">
              <ShieldAlert className="w-5 h-5 text-[#E8D5B0]" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[#E8D5B0] text-sm tracking-tight">SURAKSHA KAVACH</div>
              <div className="text-[10px] text-[#7A9A6B] font-medium tracking-wide hidden sm:block">AI Disaster Risk Platform</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2 rounded-full text-sm font-medium text-[#A9B8AE] hover:text-[#E8D5B0] hover:bg-[#14342A] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              id="nav-open-dashboard"
              className="sk-btn-primary text-sm hidden sm:inline-flex"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Open Dashboard
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-[#A9B8AE] hover:text-[#E8D5B0] hover:bg-[#14342A] transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#7A9A6B]/20 py-4 space-y-1 bg-[#0B1F17]/98 rounded-b-2xl">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-4 py-3 text-sm font-medium text-[#A9B8AE] hover:text-[#E8D5B0] hover:bg-[#14342A] rounded-xl transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="sk-btn-primary w-full justify-center text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Open Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
