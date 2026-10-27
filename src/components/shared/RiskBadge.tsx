import React from 'react';
import { ShieldCheck, Eye, AlertTriangle, ShieldAlert } from 'lucide-react';
import type { AlertLevel } from '../../types';

interface RiskBadgeProps {
  level: AlertLevel;
  className?: string;
  showLabel?: boolean;
}

const RISK_CONFIG: Record<AlertLevel, {
  label: string;
  icon: React.ElementType;
  className: string;
}> = {
  NORMAL:          { label: 'Normal',        icon: ShieldCheck,   className: 'risk-badge risk-badge-normal'  },
  WATCH:           { label: 'Watch',         icon: Eye,           className: 'risk-badge risk-badge-watch'   },
  ORANGE_WARNING:  { label: 'Warning',       icon: AlertTriangle, className: 'risk-badge risk-badge-warning' },
  RED_EVACUATION:  { label: 'Evacuate Now',  icon: ShieldAlert,   className: 'risk-badge risk-badge-red'     },
};

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  className = '',
  showLabel = true,
}) => {
  const config = RISK_CONFIG[level] || RISK_CONFIG.NORMAL;
  const Icon = config.icon;

  return (
    <span className={`${config.className} ${className}`} role="status" aria-label={`Risk level: ${config.label}`}>
      <Icon className="w-3 h-3" aria-hidden="true" />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};
