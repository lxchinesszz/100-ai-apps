import { useLiveQuery } from "dexie-react-hooks";
import { Button, ProgressBar } from "antd-mobile";
import { Plus, ChevronRight, Settings, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InstallHint from "../../pwa/InstallHint";
import { db } from "../../data/db";
import {
  computeTripSummary,
  dateRange,
  money,
  statusOf,
} from "../../domain/budget";
import type { Trip, Expense, TripStatus } from "../../domain/model";
import { EmptyState, Loading, useToday } from "../../components/shared";

function TripCard({
  trip,
  entries,
  today,
}: {
  trip: Trip;
  entries: Expense[];
  today: string;
}) {
  const navigate = useNavigate();
  const summary = computeTripSummary(trip, entries, today);
  return (
    <button
      className={`trip-card ${summary.status}`}
      onClick={() => navigate(`/trips/${trip.id}`)}
      aria-label={`查看${trip.destination}旅行`}
    >
      <img
        className="trip-cover"
        src={`${import.meta.env.BASE_URL}covers/${trip.coverKey}.svg`}
        alt=""
      />
      <div className="trip-card-content">
        <div className="card-heading">
          <h2>{trip.destination}</h2>
          <ChevronRight size={18} className="muted" />
        </div>
        <p className="card-date">
          {dateRange(trip)}
          {summary.status !== "past" && ` · ${trip.people}人`}
        </p>
        {summary.status === "active" ? (
          <>
            <div
              className={`card-money ${summary.remaining < 0 ? "danger" : ""} ${money(Math.abs(summary.remaining)).length > 8 ? "compact-money" : ""}`}
            >
              <small>¥</small> {money(Math.abs(summary.remaining))}
            </div>
            <span className="muted small">
              {summary.remaining < 0 ? "已超支" : "剩余预算"}
            </span>
            <ProgressBar
              percent={Math.min(100, summary.percent)}
              style={{
                "--fill-color": summary.remaining < 0 ? "#e65555" : "#007aff",
              }}
            />
            <div className="card-budget">
              <span>已花 ¥ {money(summary.spent)}</span>
              <span>¥ {money(trip.budgetCents)}</span>
            </div>
          </>
        ) : (
          <p className="compact-budget">
            {summary.status === "upcoming" ? (
              <>
                <span className="muted">预算 </span>¥ {money(trip.budgetCents)}
              </>
            ) : (
              <>
                ¥ {money(summary.spent)}{" "}
                <span className="muted">/ ¥ {money(trip.budgetCents)}</span>
              </>
            )}
          </p>
        )}
      </div>
    </button>
  );
}
export default function TripList() {
  const navigate = useNavigate(),
    today = useToday();
  const data = useLiveQuery(async () => ({
    trips: await db.trips.toArray(),
    expenses: await db.expenses.toArray(),
  }));
  if (!data) return <Loading />;
  const labels: Record<TripStatus, string> = {
    active: "进行中",
    upcoming: "即将开始",
    past: "历史旅行",
  };
  return (
    <main className="page list-page">
      <div className="list-toolbar">
        <span className="wordmark">
          旅记
          <span className="wordmark-dot" />
          <span className="app-version">
            v{import.meta.env.VITE_APP_VERSION} · {import.meta.env.VITE_BUILD_ID}
          </span>
        </span>
        <button
          className="icon-button"
          aria-label="设置与备份"
          onClick={() => navigate("/backup")}
        >
          <Settings size={23} />
        </button>
      </div>
      <div className="page-heading">
        <div>
          <h1>我的旅行</h1>
          <p className="heading-subtitle">每一段旅程，都心里有数。</p>
        </div>
        <button
          className="add-button"
          aria-label="创建旅行"
          onClick={() => navigate("/trips/new")}
        >
          <Plus size={25} />
        </button>
      </div>
      {!data.trips.length ? (
        <>
          <div className="welcome-image">
            <img
              src={`${import.meta.env.BASE_URL}covers/coast.svg`}
              alt="海岸与远山插画"
            />
            <span className="welcome-caption">
              下一站，去哪里？
              <ArrowUpRight size={18} />
            </span>
          </div>
          <EmptyState
            title="美好的旅行，从这里开始"
            text="定一个预算，轻松记下沿途的每一笔。"
            action={
              <Button
                block
                color="primary"
                size="large"
                onClick={() => navigate("/trips/new")}
              >
                创建第一段旅行
              </Button>
            }
          />
        </>
      ) : (
        (["active", "upcoming", "past"] as TripStatus[]).map((status) => {
          const trips = data.trips
            .filter((t) => statusOf(t, today) === status)
            .sort(
              (a, b) =>
                (status === "upcoming"
                  ? a.startDate.localeCompare(b.startDate)
                  : status === "past"
                    ? b.endDate.localeCompare(a.endDate)
                    : b.startDate.localeCompare(a.startDate)) ||
                b.createdAt.localeCompare(a.createdAt),
            );
          return trips.length ? (
            <section className="trip-section" key={status}>
              <div className="section-heading">
                <h2>{labels[status]}</h2>
                <span className="section-count">{trips.length}</span>
              </div>
              <div className="trip-cards">
                {trips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    entries={data.expenses}
                    today={today}
                  />
                ))}
              </div>
            </section>
          ) : null;
        })
      )}
      <InstallHint />
      <footer className="list-footer">
        <span className="tiny-dot" />
        只在你的设备，留住旅途的点滴。
      </footer>
    </main>
  );
}
