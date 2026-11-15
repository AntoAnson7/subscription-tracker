import { useMemo, useState } from 'react';
import { CalendarDay } from '@/modules/calendar/types/calendar.types';
import {
  formatMonthYear,
  getCalendarDays,
  isSameDay,
  toDateString,
} from '@/modules/calendar/utils/calendar.utils';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export function useMonthlyCalendar(subscriptions: Subscription[]) {
  const [today] = useState(() => new Date());
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = useMemo(() => formatMonthYear(year, month), [year, month]);

  const calendarDays = useMemo(
    () => getCalendarDays(year, month, selectedDate, subscriptions),
    [year, month, selectedDate, subscriptions]
  );

  const monthSummary = useMemo(() => {
    let totalSpend = 0;
    let renewalCount = 0;

    for (const day of calendarDays) {
      if (day.isCurrentMonth) {
        totalSpend += day.totalCost;
        renewalCount += day.subscriptions.length;
      }
    }

    return { totalSpend, renewalCount };
  }, [calendarDays]);

  const selectedDay = useMemo<CalendarDay | null>(() => {
    if (!selectedDate) return null;
    const found = calendarDays.find((d) => isSameDay(d.date, selectedDate));
    if (found) return found;

    return {
      date: selectedDate,
      dateString: toDateString(selectedDate),
      dayNumber: selectedDate.getDate(),
      isCurrentMonth: selectedDate.getMonth() === month,
      isToday: isSameDay(selectedDate, today),
      isSelected: true,
      subscriptions: [],
      totalCost: 0,
    };
  }, [selectedDate, calendarDays, month, today]);

  const nextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(today);
    setSelectedDate(today);
  };

  return {
    year,
    month,
    monthName,
    calendarDays,
    selectedDate,
    selectedDay,
    monthSummary,
    nextMonth,
    prevMonth,
    goToToday,
    selectDate: setSelectedDate,
  };
}
