function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export type DayProgress = {
  day: number;
  totalDays: number;
  percent: number;
};

export function calcDayProgress(
  startDate: string,
  durationDays: number,
  today: Date = new Date()
): DayProgress {
  const start = stripTime(new Date(`${startDate}T00:00:00`));
  const current = stripTime(today);
  const diffDays =
    Math.floor((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const day = Math.min(Math.max(diffDays, 1), durationDays);
  const percent = Math.round((day / durationDays) * 100);
  return { day, totalDays: durationDays, percent };
}

const WEEKDAYS_JA = ["日", "月", "火", "水", "木", "金", "土"] as const;

export function formatDateJa(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = WEEKDAYS_JA[date.getDay()];
  return `${y}年${m}月${d}日（${w}）`;
}

export function formatDateShortJa(date: Date): string {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = WEEKDAYS_JA[date.getDay()];
  return `${m}月${d}日（${w}）`;
}

/** Monday of the week containing `date`, as YYYY-MM-DD. */
export function getWeekStart(date: Date = new Date()): string {
  const stripped = stripTime(date);
  const day = stripped.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(stripped);
  monday.setDate(stripped.getDate() + diffToMonday);
  return toDateString(monday);
}

export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
