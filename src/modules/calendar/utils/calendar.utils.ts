import { CalendarDay } from '@/modules/calendar/types/calendar.types';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export function parseDate(dateStr: string): Date {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }
  return new Date(dateStr);
}

export function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function doesSubscriptionRenewOnDate(sub: Subscription, date: Date): boolean {
  if (sub.status === 'cancelled' || sub.status === 'paused') {
    return false;
  }
  const renewal = parseDate(sub.renewalDate);
  if (isSameDay(renewal, date)) {
    return true;
  }

  const targetDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const renewalDateOnly = new Date(renewal.getFullYear(), renewal.getMonth(), renewal.getDate());

  if (sub.cycle === 'monthly') {
    const daysInTargetMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const effectiveDay = Math.min(renewal.getDate(), daysInTargetMonth);
    return date.getDate() === effectiveDay;
  }

  if (sub.cycle === 'weekly') {
    const diffMs = targetDateOnly.getTime() - renewalDateOnly.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return diffDays % 7 === 0;
  }

  if (sub.cycle === 'quarterly') {
    const monthDiff =
      (date.getFullYear() - renewal.getFullYear()) * 12 + (date.getMonth() - renewal.getMonth());
    const daysInTargetMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const effectiveDay = Math.min(renewal.getDate(), daysInTargetMonth);
    return monthDiff % 3 === 0 && date.getDate() === effectiveDay;
  }

  if (sub.cycle === 'yearly') {
    return date.getMonth() === renewal.getMonth() && date.getDate() === renewal.getDate();
  }

  return false;
}

export function getCalendarDays(
  year: number,
  month: number,
  selectedDate: Date | null,
  subscriptions: Subscription[]
): CalendarDay[] {
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Mon = 0, Sun = 6

  const days: CalendarDay[] = [];
  const totalCells = startingDayOfWeek + daysInMonth > 35 ? 42 : 35;

  for (let i = 0; i < totalCells; i++) {
    const dayOffset = i - startingDayOfWeek + 1;
    const cellDate = new Date(year, month, dayOffset);
    const isCurrentMonth = cellDate.getMonth() === month;
    const isToday = isSameDay(cellDate, today);
    const isSelected = selectedDate ? isSameDay(cellDate, selectedDate) : false;

    const daySubs = subscriptions.filter((s) => doesSubscriptionRenewOnDate(s, cellDate));
    const totalCost = daySubs.reduce((sum, s) => sum + s.cost, 0);

    days.push({
      date: cellDate,
      dateString: toDateString(cellDate),
      dayNumber: cellDate.getDate(),
      isCurrentMonth,
      isToday,
      isSelected,
      subscriptions: daySubs,
      totalCost,
    });
  }

  return days;
}

export function formatMonthYear(year: number, month: number): string {
  const date = new Date(year, month, 1);
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
}

export function formatFullCalendarDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
