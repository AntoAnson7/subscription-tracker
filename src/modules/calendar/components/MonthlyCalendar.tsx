import { CalendarDayDetails } from '@/modules/calendar/components/CalendarDayDetails';
import { CalendarGrid } from '@/modules/calendar/components/CalendarGrid';
import { CalendarHeader } from '@/modules/calendar/components/CalendarHeader';
import { useMonthlyCalendar } from '@/modules/calendar/hooks/useMonthlyCalendar';
import { calendarStyles } from '@/modules/calendar/recipes/calendar.recipe';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

interface MonthlyCalendarProps {
  subscriptions: Subscription[];
  onEdit?: (subscription: Subscription) => void;
}

export function MonthlyCalendar({ subscriptions, onEdit }: MonthlyCalendarProps) {
  const classes = calendarStyles();
  const {
    monthName,
    calendarDays,
    selectedDay,
    monthSummary,
    nextMonth,
    prevMonth,
    goToToday,
    selectDate,
  } = useMonthlyCalendar(subscriptions);

  return (
    <section className={classes.root} aria-label="Monthly subscription calendar">
      <div className={classes.layout}>
        <div className={classes.mainSection}>
          <CalendarHeader
            monthName={monthName}
            totalSpend={monthSummary.totalSpend}
            renewalCount={monthSummary.renewalCount}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onGoToToday={goToToday}
          />
          <CalendarGrid days={calendarDays} onSelectDate={selectDate} />
        </div>

        <CalendarDayDetails selectedDay={selectedDay} onEdit={onEdit} />
      </div>
    </section>
  );
}
