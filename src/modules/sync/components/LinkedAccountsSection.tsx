import { Plus } from 'lucide-react';
import { LinkedAccountItem } from '@/modules/sync/components/LinkedAccountItem';
import { linkedAccountsStyles } from '@/modules/sync/recipes/linkedAccounts.recipe';
import { LinkedEmailAccount } from '@/modules/sync/types/sync.types';

interface LinkedAccountsSectionProps {
  accounts: LinkedEmailAccount[];
  isSyncing: boolean;
  onOpenLinkModal: () => void;
  onScan: (id: string) => void;
  onUnlink: (id: string) => void;
}

export function LinkedAccountsSection({
  accounts,
  isSyncing,
  onOpenLinkModal,
  onScan,
  onUnlink,
}: LinkedAccountsSectionProps) {
  const classes = linkedAccountsStyles();

  return (
    <div className={classes.section}>
      <div className={classes.sectionHeader}>
        <span className={classes.sectionTitle}>Connected emails ({accounts.length})</span>
        <button type="button" onClick={onOpenLinkModal} className={classes.addAccountBtn}>
          <Plus size={13} />
          <span>Link email</span>
        </button>
      </div>

      {accounts.length === 0 ? (
        <div className={classes.emptyCard}>
          <p className={classes.emptyText}>
            No email accounts connected. Link an email to auto-detect subscription receipts, payment
            debits, and cancellations.
          </p>
        </div>
      ) : (
        <div className={classes.accountsList}>
          {accounts.map((account) => (
            <LinkedAccountItem
              key={account.id}
              account={account}
              isSyncing={isSyncing}
              onScan={onScan}
              onUnlink={onUnlink}
            />
          ))}
        </div>
      )}
    </div>
  );
}
