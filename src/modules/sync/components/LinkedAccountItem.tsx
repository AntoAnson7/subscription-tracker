import { Mail, RefreshCw, Unlink } from 'lucide-react';
import { linkedAccountItemStyles } from '@/modules/sync/recipes/linkedAccountItem.recipe';
import { LinkedEmailAccount } from '@/modules/sync/types/sync.types';

interface LinkedAccountItemProps {
  account: LinkedEmailAccount;
  isSyncing: boolean;
  onScan: (id: string) => void;
  onUnlink: (id: string) => void;
}

export function LinkedAccountItem({
  account,
  isSyncing,
  onScan,
  onUnlink,
}: LinkedAccountItemProps) {
  const classes = linkedAccountItemStyles();

  const handleUnlink = () => {
    if (window.confirm(`Unlink ${account.email}? Subwise will stop scanning this inbox.`)) {
      onUnlink(account.id);
    }
  };

  const formattedSync = account.lastSyncedAt
    ? `Synced ${new Date(account.lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'Not synced yet';

  return (
    <div className={classes.accountItem}>
      <div className={classes.accountLeft}>
        <div className={classes.providerIcon}>
          <Mail size={16} />
        </div>
        <div className={classes.accountDetails}>
          <div className={classes.accountEmail}>{account.email}</div>
          <div className={classes.accountMeta}>
            {account.isSimulated ? 'Simulated inbox' : 'Live Gmail'} • {formattedSync}
          </div>
        </div>
      </div>

      <div className={classes.accountActions}>
        <button
          type="button"
          disabled={isSyncing}
          onClick={() => onScan(account.id)}
          className={classes.scanBtn}
          title="Scan inbox now"
        >
          <RefreshCw size={11} className={isSyncing ? 'spin' : ''} />
          <span>{isSyncing ? 'Scanning...' : 'Scan'}</span>
        </button>

        <button
          type="button"
          onClick={handleUnlink}
          className={classes.unlinkBtn}
          aria-label={`Unlink ${account.email}`}
          title="Unlink account"
        >
          <Unlink size={12} />
          <span>Unlink</span>
        </button>
      </div>
    </div>
  );
}
