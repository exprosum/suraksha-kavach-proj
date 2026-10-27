import React from 'react';
import { UserCheck } from 'lucide-react';

interface OverrideNoteProps {
  className?: string;
  compact?: boolean;
}

export const OverrideNote: React.FC<OverrideNoteProps> = ({ className = '', compact = false }) => (
  <div className={`sk-override-note ${className}`} role="note">
    <UserCheck className="w-3.5 h-3.5 text-[#E8D5B0] flex-shrink-0 mt-0.5" aria-hidden="true" />
    <p className="leading-snug">
      {compact
        ? 'AI advisory only. Authorised official must verify and approve all actions.'
        : 'This is an AI-generated advisory. The final decision to act, modify, or override always rests with the authorised disaster management official. AI outputs should be verified against ground truth before issuing orders.'
      }
    </p>
  </div>
);
