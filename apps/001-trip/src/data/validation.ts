import {
  categories,
  coverKeys,
  type Trip,
  type Expense,
  type Backup,
} from "../domain/model";
import { MAX_CENTS, validDate, sumCents } from "../domain/budget";
const object = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("备份数据格式不正确");
  return value as Record<string, unknown>;
};
function text(value: unknown, name: string, max: number, min = 1): string {
  if (typeof value !== "string" || value.length < min || value.length > max)
    throw new Error(`${name}格式不正确`);
  return value;
}
const id = (v: unknown) => text(v, "记录编号", 100);
function timestamp(v: unknown) {
  const s = text(v, "时间", 40);
  if (!Number.isFinite(Date.parse(s))) throw new Error("时间格式不正确");
  return s;
}
function cents(v: unknown) {
  if (
    typeof v !== "number" ||
    !Number.isSafeInteger(v) ||
    v < 1 ||
    v > MAX_CENTS
  )
    throw new Error("金额超出有效范围");
  return v;
}
function date(v: unknown) {
  if (!validDate(v)) throw new Error("日期格式不正确（支持 1900–2199 年）");
  return v;
}
export function validateTrip(value: unknown): Trip {
  const v = object(value);
  const destination = text(v.destination, "目的地", 40).trim();
  if (!destination) throw new Error("请输入目的地");
  const startDate = date(v.startDate),
    endDate = date(v.endDate);
  if (endDate < startDate) throw new Error("返回日期不能早于出发日期");
  if (
    !Number.isInteger(v.people) ||
    (v.people as number) < 1 ||
    (v.people as number) > 99
  )
    throw new Error("人数需在 1–99 之间");
  if (v.currency !== "CNY" || !coverKeys.includes(v.coverKey as never))
    throw new Error("币种或封面不受支持");
  return {
    id: id(v.id),
    destination,
    startDate,
    endDate,
    people: v.people as number,
    budgetCents: cents(v.budgetCents),
    currency: "CNY",
    coverKey: v.coverKey as Trip["coverKey"],
    createdAt: timestamp(v.createdAt),
    updatedAt: timestamp(v.updatedAt),
  };
}
export function validateExpense(value: unknown): Expense {
  const v = object(value);
  if (!categories.includes(v.category as never))
    throw new Error("支出分类不正确");
  if (
    typeof v.spentTime !== "string" ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(v.spentTime)
  )
    throw new Error("消费时间不正确");
  return {
    id: id(v.id),
    tripId: id(v.tripId),
    amountCents: cents(v.amountCents),
    category: v.category as Expense["category"],
    note: text(v.note, "备注", 100, 0),
    spentDate: date(v.spentDate),
    spentTime: v.spentTime,
    createdAt: timestamp(v.createdAt),
    updatedAt: timestamp(v.updatedAt),
  };
}
export function validateBackup(value: unknown): Backup {
  const v = object(value);
  if (v.format !== "trip-backup" || v.version !== 1)
    throw new Error("不支持的备份格式或版本");
  if (!Array.isArray(v.trips) || !Array.isArray(v.expenses))
    throw new Error("备份缺少旅行或支出数据");
  const trips = v.trips.map(validateTrip),
    expenses = v.expenses.map(validateExpense);
  const ids = new Set(trips.map((t) => t.id));
  if (
    ids.size !== trips.length ||
    new Set(expenses.map((e) => e.id)).size !== expenses.length
  )
    throw new Error("备份包含重复编号");
  if (expenses.some((e) => !ids.has(e.tripId)))
    throw new Error("备份包含不属于任何旅行的支出");
  sumCents(expenses.map((e) => e.amountCents));
  return {
    format: "trip-backup",
    version: 1,
    exportedAt: timestamp(v.exportedAt),
    trips,
    expenses,
  };
}
