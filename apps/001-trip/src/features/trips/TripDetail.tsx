import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { ActionSheet, Button, Dialog, ProgressBar, Toast } from "antd-mobile";
import {
  ChevronRight,
  MoreHorizontal,
  Plus,
  CircleCheck,
  Info,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../data/db";
import { repo, errorMessage } from "../../data/repository";
import { categoryNames, type Category, type Expense } from "../../domain/model";
import {
  computeTripSummary,
  dateLabel,
  dateRange,
  daysBetween,
  money,
  sumCents,
} from "../../domain/budget";
import {
  CategoryIcon,
  EmptyState,
  Header,
  Loading,
  MissingTrip,
  useToday,
} from "../../components/shared";
import ExpenseSheet from "../expenses/ExpenseSheet";

export default function TripDetail() {
  const { id = "" } = useParams(),
    navigate = useNavigate(),
    today = useToday();
  const [menu, setMenu] = useState(false),
    [sheet, setSheet] = useState<Expense | "new" | null>(null);
  const [filter, setFilter] = useState<Category | null>(null),
    [limit, setLimit] = useState(50);
  const data = useLiveQuery(
    async () => ({
      trip: await db.trips.get(id),
      expenses: await db.expenses.where("tripId").equals(id).toArray(),
    }),
    [id],
  );
  if (!data) return <Loading />;
  if (!data.trip) return <MissingTrip />;
  const { trip, expenses } = data,
    s = computeTripSummary(trip, expenses, today);
  const sorted = expenses
    .filter((e) => !filter || e.category === filter)
    .sort(
      (a, b) =>
        b.spentDate.localeCompare(a.spentDate) ||
        b.spentTime.localeCompare(a.spentTime) ||
        b.createdAt.localeCompare(a.createdAt) ||
        b.id.localeCompare(a.id),
    );
  const groups = [...new Set(sorted.slice(0, limit).map((e) => e.spentDate))];
  const statusText =
    s.status === "active"
      ? `第 ${s.currentDay} / ${s.totalDays} 天`
      : s.status === "upcoming"
        ? `距出发 ${daysBetween(today, trip.startDate)} 天`
        : "旅行已结束";
  async function deleteTrip() {
    setMenu(false);
    if (
      !(await Dialog.confirm({
        title: `删除“${trip!.destination}”？`,
        content: `这段旅行和其中的 ${expenses.length} 笔支出将一并删除，无法撤销。`,
        confirmText: "删除旅行",
        cancelText: "保留旅行",
      }))
    )
      return;
    try {
      await repo.deleteTrip(id);
      navigate("/", { replace: true });
      Toast.show("旅行已删除");
    } catch (e) {
      Toast.show(errorMessage(e));
    }
  }
  return (
    <main className="page detail-page">
      <Header
        right={
          <button
            className="icon-button"
            aria-label="旅行菜单"
            onClick={() => setMenu(true)}
          >
            <MoreHorizontal size={24} />
          </button>
        }
      />
      <h1>{trip.destination}</h1>
      <p className="detail-subtitle">
        {dateRange(trip)} · {statusText} · {trip.people}人
      </p>
      <section className="budget-hero">
        <p>{s.remaining < 0 ? "已超支" : "剩余预算"}</p>
        <div
          className={`hero-money ${s.remaining < 0 ? "danger" : ""} ${money(Math.abs(s.remaining)).length > 9 ? "compact-money" : ""}`}
          data-testid="remaining-budget"
        >
          <span>¥</span>
          {money(Math.abs(s.remaining))}
        </div>
      </section>
      <div className="budget-progress">
        <p>
          已使用 ¥ {money(s.spent)} <span>/ ¥ {money(trip.budgetCents)}</span>
        </p>
        <div>
          <ProgressBar
            percent={Math.min(s.percent, 100)}
            style={{ "--fill-color": s.remaining < 0 ? "#e65555" : "#007aff" }}
          />
          <span>{s.percent}%</span>
        </div>
      </div>
      {s.status === "active" && (
        <section
          className={`daily-budget ${s.remaining <= 0 || s.budgetStatus === "注意预算" ? "caution" : ""}`}
        >
          <div className="daily-label">
            <span>今天建议可用</span>
            <span className="budget-status">
              <CircleCheck size={13} />
              {s.budgetStatus}
            </span>
          </div>
          <div className="daily-bottom">
            <strong>¥ {money(s.suggested ?? 0)}</strong>
            <button
              aria-label="预算建议计算说明"
              onClick={() =>
                Dialog.alert({
                  title: "让预算均匀陪伴旅途",
                  content:
                    "先将未分配预算平均分给今天和剩余旅行日，再扣除今天已花的金额。预测参考已完成旅行日的日均支出，仅供规划。",
                  confirmText: "知道了",
                })
              }
            >
              <span>
                {s.forecast === null
                  ? s.forecastReason
                  : `${s.forecast > trip.budgetCents ? "预计超支" : "预计剩余"} ¥ ${money(Math.abs(trip.budgetCents - s.forecast))}`}
              </span>
              <Info size={12} />
            </button>
          </div>
        </section>
      )}
      <section className="category-summary">
        <div className="section-heading">
          <h2>支出分类</h2>
          <button
            className="quiet-button"
            onClick={() => {
              document
                .getElementById("expense-history")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {filter ? "已筛选" : "查看详情"}
            <ChevronRight size={14} />
          </button>
        </div>
        {s.byCategory.map((c) => (
          <button
            key={c.category}
            className={`summary-row ${filter === c.category ? "filtered" : ""}`}
            aria-label={`查看${categoryNames[c.category]}类支出`}
            aria-pressed={filter === c.category}
            onClick={() => {
              setFilter(filter === c.category ? null : c.category);
              setLimit(50);
            }}
          >
            <CategoryIcon category={c.category} />
            <span>{categoryNames[c.category]}</span>
            <strong>¥ {money(c.amount)}</strong>
            <span className="muted">{c.percent}%</span>
          </button>
        ))}
      </section>
      <section id="expense-history" className="expense-history">
        {filter && (
          <div className="filter-label">
            {categoryNames[filter]}类支出
            <button onClick={() => setFilter(null)}>查看全部</button>
          </div>
        )}
        {!sorted.length ? (
          <EmptyState
            title={filter ? "这个分类还没有支出" : "记下旅途的第一笔"}
            text={
              filter
                ? "选择其他分类，或者添加一笔新的记录。"
                : "一顿早餐，一张车票，都是旅行的片段。"
            }
          />
        ) : (
          groups.map((date) => (
            <div className="expense-day" key={date}>
              <div className="day-heading">
                <h2>
                  {date === today ? "今天 · " : ""}
                  {dateLabel(date, date.slice(0, 4) !== today.slice(0, 4))}
                </h2>
                <strong>
                  ¥{" "}
                  {money(
                    sumCents(
                      sorted
                        .filter((e) => e.spentDate === date)
                        .map((e) => e.amountCents),
                    ),
                  )}
                </strong>
              </div>
              {sorted
                .slice(0, limit)
                .filter((e) => e.spentDate === date)
                .map((e) => (
                  <button
                    key={e.id}
                    className="expense-row"
                    onClick={() => setSheet(e)}
                    aria-label={`编辑${e.note || categoryNames[e.category]}，${money(e.amountCents)}元`}
                  >
                    <span className="expense-icon">
                      <CategoryIcon category={e.category} size={17} />
                    </span>
                    <span className="expense-description">
                      <strong>{e.note || categoryNames[e.category]}</strong>
                      <small>
                        {e.spentTime}
                        {(e.spentDate < trip.startDate ||
                          e.spentDate > trip.endDate) &&
                          " · 行程外"}
                      </small>
                    </span>
                    <span className="expense-type">
                      {categoryNames[e.category]}
                    </span>
                    <span>¥ {money(e.amountCents)}</span>
                  </button>
                ))}
            </div>
          ))
        )}
        {sorted.length > limit && (
          <Button block fill="none" onClick={() => setLimit(limit + 50)}>
            加载更多记录
          </Button>
        )}
      </section>
      <div className="bottom-action">
        <Button
          block
          shape="rounded"
          color="primary"
          size="large"
          onClick={() => setSheet("new")}
        >
          <Plus size={23} />
          记一笔
        </Button>
      </div>
      <ActionSheet
        visible={menu}
        onClose={() => setMenu(false)}
        cancelText="取消"
        actions={[
          { key: "edit", text: "编辑旅行" },
          { key: "backup", text: "备份与恢复" },
          { key: "delete", text: "删除旅行", danger: true },
        ]}
        onAction={(action) => {
          setMenu(false);
          if (action.key === "edit") navigate(`/trips/${id}/edit`);
          else if (action.key === "backup") navigate("/backup");
          else void deleteTrip();
        }}
      />
      {sheet && (
        <ExpenseSheet
          trip={trip}
          expense={sheet === "new" ? undefined : sheet}
          onClose={() => setSheet(null)}
        />
      )}
    </main>
  );
}
