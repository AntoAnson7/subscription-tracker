import { useRef, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { useDatePicker } from '@/modules/common/hooks/useDatePicker';
import { datePickerStyles } from '@/modules/common/recipes/datePicker.recipe';
import { formatDisplayDate } from '@/modules/common/utils/date.utils';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (date: string) => void;
  required?: boolean;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function DatePicker({ label, value, onChange, required }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const classes = datePickerStyles();

  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  const { monthYearLabel, calendarDays, prevMonth, nextMonth, selectQuickDays } = useDatePicker(
    value,
    (dateStr) => {
      onChange(dateStr);
      setIsOpen(false);
    }
  );

  const handleSelectDay = (dateStr: string) => {
    if (!dateStr) return;
    onChange(dateStr);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={classes.root}>
      {label && <label className={classes.label}>{label}</label>}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={classes.trigger}
      >
        <span className={classes.triggerContent}>
          <Calendar size={16} className={classes.icon} />
          <span className={classes.valueText}>{formatDisplayDate(value)}</span>
        </span>
      </button>

      {/* Hidden input to ensure native form validation works if required */}
      <input type="hidden" value={value} required={required} />

      {isOpen && (
        <div role="dialog" aria-modal="true" className={classes.popup}>
          <div className={classes.header}>
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className={classes.navBtn}
            >
              <ChevronLeft size={14} />
            </button>
            <span className={classes.monthTitle}>{monthYearLabel}</span>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className={classes.navBtn}
            >
              <ChevronRight size={14} />
            </button>
          </div>

          <div className={classes.grid}>
            {WEEKDAYS.map((day) => (
              <span key={day} className={classes.weekday}>
                {day}
              </span>
            ))}

            {calendarDays.map((item) => {
              if (item.dayNumber === 0) {
                return <span key={item.key} aria-hidden="true" />;
              }

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleSelectDay(item.dateString)}
                  className={classes.dayBtn}
                  style={{
                    background: item.isSelected ? 'var(--colors-accent-primary)' : undefined,
                    color: item.isSelected ? '#FFFFFF' : undefined,
                    fontWeight: item.isSelected || item.isToday ? 700 : 500,
                    outline:
                      item.isToday && !item.isSelected
                        ? '1px solid var(--colors-accent-primary)'
                        : undefined,
                  }}
                >
                  {item.dayNumber}
                </button>
              );
            })}
          </div>

          <div className={classes.quickActions}>
            <button type="button" onClick={() => selectQuickDays(0)} className={classes.quickBtn}>
              Today
            </button>
            <button type="button" onClick={() => selectQuickDays(30)} className={classes.quickBtn}>
              +1 Month
            </button>
            <button type="button" onClick={() => selectQuickDays(365)} className={classes.quickBtn}>
              +1 Year
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
