import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { calendarStyles } from '@/modules/calendar/recipes/calendar.recipe';

interface CalendarHeaderProps {
  monthName: string;
  totalSpend: number;
  renewalCount: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToToday: () => void;
}

export function CalendarHeader({
  monthName,
  totalSpend,
  renewalCount,
  onPrevMonth,
  onNextMonth,
  onGoToToday,
}: CalendarHeaderProps) {
  const { format } = useCurrency();
  const classes = calendarStyles();

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.title}>{monthName}</h2>
        </div>

        <div className={classes.navGroup}>
          <button
            type="button"
            onClick={onGoToToday}
            className={classes.todayBtn}
            aria-label="Jump to current month"
          >
            Today
          </button>
          <button
            type="button"
            onClick={onPrevMonth}
            className={classes.navBtn}
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className={classes.navBtn}
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className={classes.summaryBar}>
        <span className={classes.summaryText}>
          Projected renewals:{' '}
          <strong className={classes.summaryHighlight}>{format(totalSpend)}</strong>
        </span>
        <span className={classes.summaryText}>
          {renewalCount === 1 ? '1 renewal scheduled' : `${renewalCount} renewals scheduled`}
        </span>
      </div>
    </div>
  );
}
