import { Cpu, ExternalLink, Lock, ShieldCheck } from 'lucide-react';
import { footerStyles } from '@/modules/legal/recipes/footer.recipe';
import { LegalTab } from '@/modules/legal/types/legal.types';

const CURRENT_YEAR = 2026;

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
  onOpenAuth?: () => void;
}

export function Footer({ onOpenLegal, onOpenAuth }: FooterProps) {
  const classes = footerStyles();

  return (
    <footer className={classes.root}>
      <div className={classes.container}>
        <div className={classes.topGrid}>
          <div className={classes.brandCol}>
            <div className={classes.brandHeader}>
              <div className={classes.brandLogo}>S</div>
              <span className={classes.brandName}>SubTrack</span>
            </div>
            <p className={classes.brandTagline}>
              Privacy-first subscription run-rate tracking, renewal schedules, and intelligent
              receipt scanning.
            </p>
            <div className={classes.trustBadges}>
              <span className={classes.trustBadge}>
                <Lock size={11} /> Read-only Gmail API
              </span>
              <span className={classes.trustBadge}>
                <ShieldCheck size={11} /> Zero Email Storage
              </span>
              <span className={classes.trustBadge}>
                <Cpu size={11} /> Local Client Parsing
              </span>
            </div>
          </div>

          <div className={classes.linksGrid}>
            <div className={classes.linkGroup}>
              <span className={classes.groupTitle}>Legal & Compliance</span>
              <div className={classes.linkList}>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className={classes.linkBtn}
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className={classes.linkBtn}
                >
                  Terms of Service
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal('google-limited-use')}
                  className={classes.linkBtn}
                >
                  Google Limited Use
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal('security')}
                  className={classes.linkBtn}
                >
                  Security Architecture
                </button>
              </div>
            </div>

            <div className={classes.linkGroup}>
              <span className={classes.groupTitle}>Account & Data</span>
              <div className={classes.linkList}>
                {onOpenAuth && (
                  <button type="button" onClick={onOpenAuth} className={classes.linkBtn}>
                    Sign in with Google
                  </button>
                )}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.linkBtn}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>Google Permissions</span>
                  <ExternalLink size={11} />
                </a>
                <a
                  href="mailto:support@subtrack.app"
                  className={classes.linkBtn}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>Contact Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className={classes.divider} />

        <div className={classes.bottomRow}>
          <span className={classes.copyright}>© {CURRENT_YEAR} SubTrack. All rights reserved.</span>
          <p className={classes.googleNotice}>
            SubTrack’s use of information received from Google APIs adheres to the Google API
            Services User Data Policy, including the Limited Use requirements.
          </p>
        </div>
      </div>
    </footer>
  );
}
