function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function formatDisplayDate(dateString: string): string {
  if (!dateString) return '-';
  const parts = dateString.split('-');
  let date: Date;
  if (parts.length === 3) {
    date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  } else {
    date = new Date(dateString);
  }
  if (isNaN(date.getTime())) return dateString;

  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const year = date.getFullYear();

  return `${day}${suffix} ${month} ${year}`;
}

export function formatDate(dateString: string, locale: string = 'en-US'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getDaysUntil(targetDateString: string): number {
  const targetDate = new Date(targetDateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
