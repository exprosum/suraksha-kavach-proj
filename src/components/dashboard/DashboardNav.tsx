import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  Map,
  Users,
  Sparkles,
  ArrowLeft,
  Activity,
  Database,
} from 'lucide-react';

interface DashboardNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: 'map',        icon: Map,       label: 'Hazard Map'        },
  { id: 'relocation', icon: Users,     label: 'Relocation Planner' },
  { id: 'ai',         icon: Sparkles,  label: 'AI Advisor'         },
  { id: 'sources',    icon: Database,  label: 'Data Sources'       },
  { id: 'trust',      icon: Activity,  label: 'Trust Audit'        },
];

export const DashboardNav: React.FC<DashboardNavProps> = ({ activeTab, onTabChange }) => (
  <aside
    className="flex flex-col items-center py-4 gap-3 border-r border-[#7A9A6B]/20"
    style={{ background: '#0E2820', gridRow: '1 / -1' }}
    role="navigation"
    aria-label="Dashboard navigation"
  >
    {/* Logo */}
    <Link
      to="/"
      className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7A9A6B] to-[#4D7040] flex items-center justify-center shadow-lg mb-2 hover:shadow-[#7A9A6B]/30 transition-shadow flex-shrink-0"
      title="Back to landing page"
      aria-label="Suraksha Kavach — Back to home"
    >
      <ShieldAlert className="w-6 h-6 text-[#E8D5B0]" aria-hidden="true" />
    </Link>

    {/* Nav icons */}
    <nav className="flex flex-col items-center gap-1.5 flex-1" aria-label="Dashboard sections">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`dash-nav-${item.id}`}
            onClick={() => onTabChange(item.id)}
            title={item.label}
            aria-label={item.label}
            aria-pressed={isActive}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer group relative ${
              isActive
                ? 'bg-[#7A9A6B]/20 border border-[#7A9A6B]/50 text-[#7A9A6B]'
                : 'text-[#A9B8AE] hover:bg-[#14342A] hover:text-[#E8D5B0]'
            }`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            {/* Tooltip */}
            <span className="absolute left-14 bg-[#0B1F17] text-[#E8D5B0] text-xs font-medium px-2.5 py-1 rounded-lg border border-[#7A9A6B]/25 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>

    {/* Back to landing */}
    <Link
      to="/"
      className="w-11 h-11 rounded-xl flex items-center justify-center text-[#A9B8AE] hover:bg-[#14342A] hover:text-[#E8D5B0] transition-all duration-200 flex-shrink-0 group relative"
      title="Back to home"
      aria-label="Back to home page"
    >
      <ArrowLeft className="w-5 h-5" aria-hidden="true" />
      <span className="absolute left-14 bg-[#0B1F17] text-[#E8D5B0] text-xs font-medium px-2.5 py-1 rounded-lg border border-[#7A9A6B]/25 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
        Home
      </span>
    </Link>
  </aside>
);
