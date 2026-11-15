import { Edit3 } from 'lucide-react';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
import { calendarDayDetailsStyles } from '@/modules/calendar/recipes/calendarDayDetails.recipe';
import { CalendarDay } from '@/modules/calendar/types/calendar.types';
import { formatFullCalendarDate } from '@/modules/calendar/utils/calendar.utils';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface CalendarDayDetailsProps {
  selectedDay: CalendarDay | null;
  onEdit?: (subscription: Subscription) => void;
}

export function CalendarDayDetails({ selectedDay, onEdit }: CalendarDayDetailsProps) {
  const { format } = useCurrency();
  const classes = calendarDayDetailsStyles();

  if (!selectedDay) {
    return (
      <aside className={classes.root}>
        <div className={classes.emptyState}>Select a date to view renewals</div>
      </aside>
    );
  }

  const dateFormatted = formatFullCalendarDate(selectedDay.date);
  const count = selectedDay.subscriptions.length;

  return (
    <aside className={classes.root} aria-label={`Renewals for ${dateFormatted}`}>
      <div className={classes.header}>
        <h3 className={classes.dateTitle}>{dateFormatted}</h3>
        <span className={classes.countBadge}>
          {count === 0
            ? 'No renewals'
            : count === 1
              ? '1 renewal scheduled'
              : `${count} renewals scheduled`}
        </span>
      </div>

      {count > 0 && (
        <div className={classes.totalRow}>
          <span className={classes.totalLabel}>Total due today</span>
          <span className={classes.totalAmount}>{format(selectedDay.totalCost)}</span>
        </div>
      )}

      {count === 0 ? (
        <div className={classes.emptyState}>No subscriptions renew on this date</div>
      ) : (
        <div className={classes.list}>
          {selectedDay.subscriptions.map((sub) => {
            const iconUrl = getBrandIconUrl(sub.iconSlug, sub.websiteUrl);
            const shouldInvert =
              sub.iconSlug === 'apple' || sub.iconSlug === 'openai' || sub.iconSlug === 'github';

            return (
              <div key={sub.id} className={classes.card}>
                <div className={classes.brandGroup}>
                  <div
                    className={classes.iconBox}
                    style={{ backgroundColor: sub.brandColor || '#27272A' }}
                  >
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt=""
                        style={{
                          width: '18px',
                          height: '18px',
                          objectFit: 'contain',
                          filter: shouldInvert ? 'invert(1)' : 'none',
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFF' }}>
                        {sub.name[0]}
                      </span>
                    )}
                  </div>
                  <div className={classes.info}>
                    <span className={classes.name}>{sub.name}</span>
                    <span className={classes.category}>{sub.category}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className={classes.costGroup}>
                    <span className={classes.cost}>{format(sub.cost)}</span>
                    <span className={classes.cycle}>/{sub.cycle}</span>
                  </div>

                  {onEdit && (
                    <button
                      type="button"
                      className={classes.editBtn}
                      onClick={() => onEdit(sub)}
                      title={`Edit ${sub.name}`}
                      aria-label={`Edit ${sub.name}`}
                    >
                      <Edit3 size={15} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}
