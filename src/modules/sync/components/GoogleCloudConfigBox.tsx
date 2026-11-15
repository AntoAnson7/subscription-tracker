import { ChevronDown, ChevronUp, KeyRound } from 'lucide-react';
import { consentFormStyles } from '@/modules/sync/recipes/consentForm.recipe';

interface GoogleCloudConfigBoxProps {
  clientId: string;
  onUpdateClientId: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function GoogleCloudConfigBox({
  clientId,
  onUpdateClientId,
  isOpen,
  onToggle,
}: GoogleCloudConfigBoxProps) {
  const formClasses = consentFormStyles();
  const currentOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';

  return (
    <div className={formClasses.configBox}>
      <div className={formClasses.configHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <KeyRound size={14} color="var(--colors-accent-primary)" />
          <span>Google Cloud OAuth Setup</span>
        </div>
        <button
          type="button"
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--colors-text-secondary)',
          }}
          aria-label={isOpen ? 'Hide Google Cloud instructions' : 'Show Google Cloud instructions'}
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {isOpen && (
        <>
          <div className={formClasses.inputGroup} style={{ marginBottom: '8px' }}>
            <label htmlFor="gcloud-client-id">Google OAuth 2.0 Web Client ID</label>
            <input
              id="gcloud-client-id"
              type="text"
              value={clientId}
              onChange={(e) => onUpdateClientId(e.target.value)}
              placeholder="e.g. 123456789-abcdef.apps.googleusercontent.com"
              className={formClasses.textInput}
            />
          </div>

          <ol className={formClasses.guideSteps}>
            <li>
              Go to{' '}
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noreferrer"
              >
                Google Cloud Console &gt; Credentials
              </a>
            </li>
            <li>
              Enable <strong>Gmail API</strong> in APIs &amp; Services.
            </li>
            <li>Create OAuth 2.0 Client ID (Web Application).</li>
            <li>
              Add Authorized JavaScript Origin: <code>{currentOrigin}</code>
            </li>
          </ol>
        </>
      )}
    </div>
  );
}
