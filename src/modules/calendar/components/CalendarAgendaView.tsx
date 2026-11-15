import { Edit3 } from 'lucide-react';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
import { calendarAgendaStyles } from '@/modules/calendar/recipes/calendarAgenda.recipe';
import { CalendarDay } from '@/modules/calendar/types/calendar.types';
import { formatFullCalendarDate } from '@/modules/calendar/utils/calendar.utils';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface CalendarAgendaViewProps {
  days: CalendarDay[];
  monthName: string;
  onEdit?: (subscription: Subscription) => void;
}

export function CalendarAgendaView({ days, monthName, onEdit }: CalendarAgendaViewProps) {
  const { format } = useCurrency();
  const classes = calendarAgendaStyles();

  const renewalDays = days.filter((d) => d.isCurrentMonth && d.subscriptions.length > 0);

  if (renewalDays.length === 0) {
    return (
      <div className={classes.emptyState}>No subscription renewals scheduled for {monthName}.</div>
    );
  }

  return (
    <div className={classes.root} role="region" aria-label="Monthly renewal schedule">
      {renewalDays.map((day) => (
        <div key={day.dateString} className={classes.group}>
          <div className={classes.groupHeader}>
            <span className={classes.groupDate}>{formatFullCalendarDate(day.date)}</span>
            <div className={classes.groupMeta}>
              <span>{format(day.totalCost)}</span>
            </div>
          </div>

          <div className={classes.itemsList}>
            {day.subscriptions.map((sub) => {
              const iconUrl = getBrandIconUrl(sub.iconSlug, sub.websiteUrl);
              const shouldInvert =
                sub.iconSlug === 'apple' || sub.iconSlug === 'openai' || sub.iconSlug === 'github';

              return (
                <div key={sub.id} className={classes.itemCard}>
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
                    <div className={classes.itemInfo}>
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
                        onClick={() => onEdit(sub)}
                        className={classes.editBtn}
                        aria-label={`Edit ${sub.name}`}
                      >
                        <Edit3 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
