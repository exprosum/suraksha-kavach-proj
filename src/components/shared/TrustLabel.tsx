import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface TrustLabelProps {
  source: string;
  verified?: boolean;
  className?: string;
}

export const TrustLabel: React.FC<TrustLabelProps> = ({
  source,
  verified = true,
  className = '',
}) => (
  <span className={`sk-trust-label ${className}`} title={`Source: ${source}`}>
    {verified
      ? <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
      : <AlertCircle className="w-3 h-3" aria-hidden="true" />
    }
    <span>{source}</span>
    {verified && <span aria-hidden="true">·</span>}
    {verified && <span>Verified</span>}
  </span>
);
