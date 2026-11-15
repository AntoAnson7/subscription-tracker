import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, List } from 'lucide-react';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { calendarStyles } from '@/modules/calendar/recipes/calendar.recipe';

interface CalendarHeaderProps {
  monthName: string;
  totalSpend: number;
  renewalCount: number;
  viewMode: 'month' | 'schedule';
  onViewModeChange: (mode: 'month' | 'schedule') => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToToday: () => void;
}

export function CalendarHeader({
  monthName,
  totalSpend,
  renewalCount,
  viewMode,
  onViewModeChange,
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
          <div className={classes.viewToggle}>
            <button
              type="button"
              onClick={() => onViewModeChange('month')}
              className={classes.viewBtn}
              style={{
                background: viewMode === 'month' ? 'var(--colors-bg-primary)' : 'transparent',
                color:
                  viewMode === 'month'
                    ? 'var(--colors-text-primary)'
                    : 'var(--colors-text-secondary)',
                boxShadow: viewMode === 'month' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
              aria-label="Month view"
              aria-pressed={viewMode === 'month'}
            >
              <CalendarIcon size={12} />
              <span>Month</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('schedule')}
              className={classes.viewBtn}
              style={{
                background: viewMode === 'schedule' ? 'var(--colors-bg-primary)' : 'transparent',
                color:
                  viewMode === 'schedule'
                    ? 'var(--colors-text-primary)'
                    : 'var(--colors-text-secondary)',
                boxShadow: viewMode === 'schedule' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
              aria-label="Schedule view"
              aria-pressed={viewMode === 'schedule'}
            >
              <List size={12} />
              <span>Schedule</span>
            </button>
          </div>

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
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className={classes.navBtn}
            aria-label="Next month"
          >
            <ChevronRight size={16} />
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
