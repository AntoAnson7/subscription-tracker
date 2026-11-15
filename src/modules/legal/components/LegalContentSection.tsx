import { ShieldCheck } from 'lucide-react';
import { legalModalStyles } from '@/modules/legal/recipes/legalModal.recipe';
import { LegalSection } from '@/modules/legal/types/legal.types';

interface LegalContentSectionProps {
  section: LegalSection;
}

export function LegalContentSection({ section }: LegalContentSectionProps) {
  const classes = legalModalStyles();

  if (section.isCallout) {
    return (
      <div className={classes.calloutBox}>
        <div>
          <ShieldCheck size={16} />
          <span>{section.heading}</span>
        </div>
        {section.body.map((text, idx) => (
          <p key={idx}>{text}</p>
        ))}
      </div>
    );
  }

  return (
    <div className={classes.section}>
      <h3>{section.heading}</h3>
      {section.body.map((text, idx) => (
        <p key={idx}>{text}</p>
      ))}
    </div>
  );
}
