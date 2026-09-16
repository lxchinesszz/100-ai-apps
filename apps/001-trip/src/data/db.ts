import Dexie, { type Table } from "dexie";
import type { Trip, Expense } from "../domain/model";
export class TripDatabase extends Dexie {
  trips!: Table<Trip, string>;
  expenses!: Table<Expense, string>;
  settings!: Table<{ key: string; value: string }, string>;
  constructor(name = "trip-journal") {
    super(name);
    this.version(1).stores({
      trips: "id, startDate, endDate, updatedAt",
      expenses: "id, tripId, [tripId+spentDate], [tripId+category]",
      settings: "key",
    });
    this.on("blocked", () => {
      if (typeof window !== "undefined")
        window.dispatchEvent(new Event("trip-db-blocked"));
    });
  }
}
export const db = new TripDatabase();
