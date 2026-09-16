import { categories, type Trip, type Expense, type TripStatus } from "./model";
export const MAX_CENTS = 999_999_999;
export function parseMoney(value: string): number {
  if (!/^\d{1,7}(\.\d{1,2})?$/.test(value.trim()))
    throw new Error("请输入有效金额，最多两位小数");
  const [whole, decimal = ""] = value.trim().split(".");
  const amount = Number(whole) * 100 + Number(decimal.padEnd(2, "0"));
  if (!Number.isSafeInteger(amount) || amount <= 0 || amount > MAX_CENTS)
    throw new Error("金额需在 0.01–9,999,999.99 元之间");
  return amount;
}
export function money(cents: number): string {
  return (cents / 100).toLocaleString("zh-CN", {
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}
export function inputMoney(cents: number): string {
  return (cents / 100).toFixed(2).replace(/\.00$/, "");
}
export function todayDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function localTime(date = new Date()): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
export function validDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const date = new Date(`${value}T12:00:00Z`);
  return (
    Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === value &&
    value >= "1900-01-01" &&
    value <= "2199-12-31"
  );
}
export const dayNumber = (value: string) =>
  Math.floor(Date.parse(`${value}T12:00:00Z`) / 86_400_000);
export const daysBetween = (a: string, b: string) =>
  dayNumber(b) - dayNumber(a);
export const toLocalDate = (s: string) => new Date(`${s}T12:00:00`);
export function dateLabel(s: string, year = false) {
  const [y, m, d] = s.split("-").map(Number);
  return `${year ? `${y}年` : ""}${m}月${d}日`;
}
export function dateRange(trip: Trip) {
  const crossYear = trip.startDate.slice(0, 4) !== trip.endDate.slice(0, 4);
  return `${dateLabel(trip.startDate, crossYear)} — ${dateLabel(trip.endDate, crossYear)}`;
}
export function statusOf(trip: Trip, today: string): TripStatus {
  return today < trip.startDate
    ? "upcoming"
    : today > trip.endDate
      ? "past"
      : "active";
}
export function sumCents(values: number[]) {
  return values.reduce((sum, value) => {
    const next = sum + value;
    if (!Number.isSafeInteger(next)) throw new Error("金额合计超过安全范围");
    return next;
  }, 0);
}
export function computeTripSummary(
  trip: Trip,
  expenses: Expense[],
  today: string,
) {
  const entries = expenses.filter((e) => e.tripId === trip.id);
  const spent = sumCents(entries.map((e) => e.amountCents));
  const remaining = trip.budgetCents - spent;
  const todaySpent = sumCents(
    entries.filter((e) => e.spentDate === today).map((e) => e.amountCents),
  );
  const status = statusOf(trip, today);
  const totalDays = daysBetween(trip.startDate, trip.endDate) + 1;
  const currentDay = daysBetween(trip.startDate, today) + 1;
  const remainingDays = daysBetween(today, trip.endDate) + 1;
  const suggested =
    status === "active"
      ? Math.max(
          0,
          Math.floor(Math.max(0, remaining + todaySpent) / remainingDays) -
            todaySpent,
        )
      : null;
  let forecast: number | null = null;
  let forecastReason = "记录不足，暂不预测";
  if (
    entries.some(
      (e) => e.spentDate < trip.startDate || e.spentDate > trip.endDate,
    )
  )
    forecastReason = "包含行程外支出，暂不预测";
  else if (entries.some((e) => e.spentDate > today))
    forecastReason = "包含未来支出，暂不预测";
  else if (status === "active" && currentDay >= 2) {
    const previous = sumCents(
      entries.filter((e) => e.spentDate < today).map((e) => e.amountCents),
    );
    forecast =
      previous + Math.round((previous / (currentDay - 1)) * remainingDays);
  }
  const budgetStatus =
    remaining < 0
      ? "已超支"
      : remaining === 0
        ? "预算已用完"
        : forecast === null
          ? "持续记录中"
          : forecast > trip.budgetCents
            ? "注意预算"
            : "预算充足";
  const byCategory = categories.map((category) => {
    const amount = sumCents(
      entries.filter((e) => e.category === category).map((e) => e.amountCents),
    );
    return {
      category,
      amount,
      percent: spent ? Math.round((amount / spent) * 100) : 0,
    };
  });
  return {
    spent,
    remaining,
    todaySpent,
    status,
    totalDays,
    currentDay,
    remainingDays,
    suggested,
    forecast,
    forecastReason,
    budgetStatus,
    byCategory,
    percent: Math.round((spent / trip.budgetCents) * 100),
  };
}
