import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export interface CalendarDay {
  date: Date;
  dateString: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  subscriptions: Subscription[];
  totalCost: number;
}

export interface CalendarMonthSummary {
  year: number;
  month: number;
  monthName: string;
  days: CalendarDay[];
  totalSpend: number;
  renewalCount: number;
}
