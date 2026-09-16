import { db, type TripDatabase } from "./db";
import { validateTrip, validateExpense, validateBackup } from "./validation";
import { sumCents } from "../domain/budget";
import type { Trip, Expense, Backup } from "../domain/model";
export function repository(database: TripDatabase = db) {
  return {
    async saveTrip(input: Trip, editing = false) {
      const trip = validateTrip(input);
      await database.transaction("rw", database.trips, async () => {
        if (editing && !(await database.trips.get(trip.id)))
          throw new Error("这段旅行已被删除，请返回列表");
        await database.trips.put(trip);
      });
    },
    async deleteTrip(id: string) {
      await database.transaction(
        "rw",
        database.trips,
        database.expenses,
        async () => {
          await database.expenses.where("tripId").equals(id).delete();
          await database.trips.delete(id);
        },
      );
    },
    async saveExpense(input: Expense, editing = false) {
      const expense = validateExpense(input);
      await database.transaction(
        "rw",
        database.trips,
        database.expenses,
        async () => {
          if (!(await database.trips.get(expense.tripId)))
            throw new Error("这段旅行已被删除");
          const existing = await database.expenses.get(expense.id);
          if (editing && !existing) throw new Error("这笔支出已被删除");
          if (existing && existing.tripId !== expense.tripId)
            throw new Error("支出所属旅行不一致");
          const entries = await database.expenses
            .where("tripId")
            .equals(expense.tripId)
            .toArray();
          sumCents([
            ...entries
              .filter((e) => e.id !== expense.id)
              .map((e) => e.amountCents),
            expense.amountCents,
          ]);
          await database.expenses.put(expense);
        },
      );
    },
    async deleteExpense(id: string) {
      await database.expenses.delete(id);
    },
    async exportBackup(): Promise<Backup> {
      return database.transaction(
        "r",
        database.trips,
        database.expenses,
        async () => ({
          format: "trip-backup",
          version: 1,
          exportedAt: new Date().toISOString(),
          trips: await database.trips.toArray(),
          expenses: await database.expenses.toArray(),
        }),
      );
    },
    async restoreBackup(input: unknown) {
      const backup = validateBackup(input);
      await database.transaction(
        "rw",
        database.trips,
        database.expenses,
        async () => {
          await database.expenses.clear();
          await database.trips.clear();
          await database.trips.bulkAdd(backup.trips);
          await database.expenses.bulkAdd(backup.expenses);
        },
      );
    },
  };
}
export const repo = repository();
export function errorMessage(error: unknown) {
  if (error instanceof Error && error.name === "QuotaExceededError")
    return "设备空间不足，请释放空间后重试。输入已保留。";
  return error instanceof Error ? error.message : "暂时无法保存，请重试";
}
