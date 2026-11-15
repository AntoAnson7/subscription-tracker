import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { getBrandIconUrl } from '@/modules/common/utils/icons.utils';
import { calendarCellStyles } from '@/modules/calendar/recipes/calendarCell.recipe';
import { CalendarDay } from '@/modules/calendar/types/calendar.types';

interface CalendarDayCellProps {
  day: CalendarDay;
  onSelect: (date: Date) => void;
}

export function CalendarDayCell({ day, onSelect }: CalendarDayCellProps) {
  const { format } = useCurrency();
  const classes = calendarCellStyles({
    isCurrentMonth: day.isCurrentMonth,
    isSelected: day.isSelected,
    isToday: day.isToday,
  });

  const visibleSubs = day.subscriptions.slice(0, 3);
  const remainingCount = day.subscriptions.length - 3;

  const ariaLabel = `${day.dateString}, ${day.dayNumber}, ${
    day.subscriptions.length === 0
      ? 'no renewals'
      : `${day.subscriptions.length} renewals, total ${day.totalCost}`
  }`;

  return (
    <button
      type="button"
      className={classes.cell}
      onClick={() => onSelect(day.date)}
      aria-label={ariaLabel}
      aria-pressed={day.isSelected}
    >
      <div className={classes.topRow}>
        <span className={classes.dayNumber}>{day.dayNumber}</span>
        {day.isToday && <span className={classes.todayIndicator} title="Today" />}
      </div>

      {day.subscriptions.length > 0 && (
        <div className={classes.renewalContent}>
          <div className={classes.dotsRow}>
            {visibleSubs.map((sub) => (
              <span
                key={sub.id}
                className={classes.brandDot}
                style={{ backgroundColor: sub.brandColor || '#F59E0B' }}
                title={`${sub.name}: ${format(sub.cost)}`}
              />
            ))}
            {remainingCount > 0 && <span className={classes.microMore}>+{remainingCount}</span>}
          </div>

          <div className={classes.iconsRow}>
            {visibleSubs.map((sub) => {
              const iconUrl = getBrandIconUrl(sub.iconSlug, sub.websiteUrl);
              const shouldInvert =
                sub.iconSlug === 'apple' || sub.iconSlug === 'openai' || sub.iconSlug === 'github';

              return (
                <div
                  key={sub.id}
                  className={classes.microIcon}
                  style={{ backgroundColor: sub.brandColor || '#27272A' }}
                  title={`${sub.name}: ${format(sub.cost)}`}
                >
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt=""
                      style={{
                        width: '12px',
                        height: '12px',
                        objectFit: 'contain',
                        filter: shouldInvert ? 'invert(1)' : 'none',
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: '700',
                        color: '#FFFFFF',
                        lineHeight: 1,
                      }}
                    >
                      {sub.name[0]}
                    </span>
                  )}
                </div>
              );
            })}
            {remainingCount > 0 && <span className={classes.microMore}>+{remainingCount}</span>}
          </div>

          <span className={classes.costPill}>{format(day.totalCost)}</span>
        </div>
      )}
    </button>
  );
}
