import { useMemo, useState } from 'react';

export function useDatePicker(value: string, onSelectDate: (dateStr: string) => void) {
  const [viewState, setViewState] = useState(() => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m] = value.split('-').map(Number);
      return { year: y, month: m - 1 };
    }
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const [todayStr] = useState(() => new Date().toISOString().split('T')[0]);

  const prevMonth = () => {
    setViewState((prev) => {
      const newMonth = prev.month - 1;
      return newMonth < 0
        ? { year: prev.year - 1, month: 11 }
        : { year: prev.year, month: newMonth };
    });
  };

  const nextMonth = () => {
    setViewState((prev) => {
      const newMonth = prev.month + 1;
      return newMonth > 11
        ? { year: prev.year + 1, month: 0 }
        : { year: prev.year, month: newMonth };
    });
  };

  const monthYearLabel = useMemo(() => {
    const d = new Date(viewState.year, viewState.month, 1);
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(d);
  }, [viewState.year, viewState.month]);

  const calendarDays = useMemo(() => {
    const { year, month } = viewState;
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: Array<{
      key: string;
      dayNumber: number;
      dateString: string;
      isSelected: boolean;
      isToday: boolean;
    }> = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push({
        key: `empty-${i}`,
        dayNumber: 0,
        dateString: '',
        isSelected: false,
        isToday: false,
      });
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        key: dateString,
        dayNumber: d,
        dateString,
        isSelected: dateString === value,
        isToday: dateString === todayStr,
      });
    }

    return days;
  }, [viewState, value, todayStr]);

  const selectQuickDays = (daysFromToday: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysFromToday);
    const dateString = target.toISOString().split('T')[0];
    onSelectDate(dateString);
    setViewState({ year: target.getFullYear(), month: target.getMonth() });
  };

  return {
    monthYearLabel,
    calendarDays,
    prevMonth,
    nextMonth,
    selectQuickDays,
  };
}
