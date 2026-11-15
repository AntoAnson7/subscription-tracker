import { CalendarDayCell } from '@/modules/calendar/components/CalendarDayCell';
import { calendarStyles } from '@/modules/calendar/recipes/calendar.recipe';
import { CalendarDay } from '@/modules/calendar/types/calendar.types';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface CalendarGridProps {
  days: CalendarDay[];
  onSelectDate: (date: Date) => void;
}

export function CalendarGrid({ days, onSelectDate }: CalendarGridProps) {
  const classes = calendarStyles();

  return (
    <div role="region" aria-label="Monthly calendar grid">
      <div className={classes.weekHeader}>
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className={classes.weekdayLabel}>
            {weekday}
          </div>
        ))}
      </div>

      <div className={classes.grid} role="grid">
        {days.map((day) => (
          <CalendarDayCell key={day.dateString} day={day} onSelect={onSelectDate} />
        ))}
      </div>
    </div>
  );
}
