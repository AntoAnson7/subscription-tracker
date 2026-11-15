import { Users, Minus, Plus } from 'lucide-react';
import { Checkbox } from '@/modules/common/components/Checkbox';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { familyPlanFieldsStyles } from '@/modules/subscriptions/recipes/familyPlanFields.recipe';
import { BillingCycle } from '@/modules/subscriptions/types/subscription.types';

const SPLIT_PRESETS = [2, 3, 4, 5, 6];

interface FamilyPlanFieldsProps {
  isFamily: boolean;
  splitCount: number;
  totalCost: number;
  cycle: BillingCycle;
  onChangeFamily: (isFamily: boolean) => void;
  onChangeSplitCount: (count: number) => void;
}

export function FamilyPlanFields({
  isFamily,
  splitCount,
  totalCost,
  cycle,
  onChangeFamily,
  onChangeSplitCount,
}: FamilyPlanFieldsProps) {
  const { format } = useCurrency();
  const classes = familyPlanFieldsStyles({ isFamily });
  const effectiveSplit = Math.max(2, splitCount || 2);
  const userShare = totalCost > 0 ? totalCost / effectiveSplit : 0;

  const handleDecrement = () => {
    if (effectiveSplit > 2) onChangeSplitCount(effectiveSplit - 1);
  };

  const handleIncrement = () => {
    if (effectiveSplit < 30) onChangeSplitCount(effectiveSplit + 1);
  };

  return (
    <div className={classes.root}>
      <div className={classes.headerRow}>
        <Checkbox
          id="is-family-plan"
          checked={isFamily}
          onChange={onChangeFamily}
          label={
            <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span
                style={{ fontWeight: 600, fontSize: '13px', color: 'var(--colors-text-primary)' }}
              >
                Is this a family subscription?
              </span>
              <span style={{ fontSize: '11px', color: 'var(--colors-text-secondary)' }}>
                Split the subscription cost with family or friends
              </span>
            </span>
          }
        />
      </div>

      {isFamily && (
        <div className={classes.content}>
          <div className={classes.splitLabel}>
            <Users size={13} />
            <span>Split between how many people?</span>
          </div>

          <div className={classes.chipsRow}>
            {SPLIT_PRESETS.map((count) => {
              const isSelected = effectiveSplit === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => onChangeSplitCount(count)}
                  className={classes.chip}
                  style={
                    isSelected
                      ? {
                          background: 'var(--colors-accent-primary)',
                          color: '#FFFFFF',
                          borderColor: 'var(--colors-accent-primary)',
                        }
                      : undefined
                  }
                >
                  {count} people
                </button>
              );
            })}

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                marginLeft: 'auto',
              }}
            >
              <button
                type="button"
                onClick={handleDecrement}
                disabled={effectiveSplit <= 2}
                className={classes.chip}
                style={{ padding: '6px', minWidth: '28px', opacity: effectiveSplit <= 2 ? 0.4 : 1 }}
                aria-label="Decrease split count"
              >
                <Minus size={12} />
              </button>
              <span
                style={{ fontSize: '13px', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}
              >
                {effectiveSplit}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                disabled={effectiveSplit >= 30}
                className={classes.chip}
                style={{ padding: '6px', minWidth: '28px' }}
                aria-label="Increase split count"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          <div className={classes.shareBox}>
            <div className={classes.shareBoxText}>
              <span>Your share:</span>
              <span className={classes.shareBoxHighlight}>
                {format(userShare)} / {cycle}
              </span>
            </div>
            <span className={classes.shareBoxSub}>
              Only your {format(userShare)} share will be tracked in run-rate and analytics
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
