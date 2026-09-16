export const categories = ["food", "stay", "transport", "fun"] as const;
export type Category = (typeof categories)[number];
export const categoryNames: Record<Category, string> = {
  food: "食",
  stay: "住",
  transport: "行",
  fun: "玩",
};
export const categoryDescriptions: Record<Category, string> = {
  food: "餐饮美食",
  stay: "酒店住宿",
  transport: "交通出行",
  fun: "游玩体验",
};
export const coverKeys = ["coast", "city", "mountain", "lake"] as const;
export type CoverKey = (typeof coverKeys)[number];
export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  people: number;
  budgetCents: number;
  currency: "CNY";
  coverKey: CoverKey;
  createdAt: string;
  updatedAt: string;
}
export interface Expense {
  id: string;
  tripId: string;
  amountCents: number;
  category: Category;
  note: string;
  spentDate: string;
  spentTime: string;
  createdAt: string;
  updatedAt: string;
}
export interface Backup {
  format: "trip-backup";
  version: 1;
  exportedAt: string;
  trips: Trip[];
  expenses: Expense[];
}
export type TripStatus = "upcoming" | "active" | "past";
